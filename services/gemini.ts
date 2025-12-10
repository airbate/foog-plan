
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskLevel, ConditionId, Language, AiDietPlan, Recipe, ChefResponse } from '../types';
import { getDietRulesForConditions, ALL_CONDITIONS } from './dietRules';

// NOTE: In a production app, the API key should be proxy-ed through a backend.
// For this frontend-only MVP, we access it from env.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const analyzeFoodImage = async (
  base64Image: string,
  conditionIds: ConditionId[],
  language: Language
): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const model = "gemini-2.5-flash"; 
  
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  // Map IDs to readable names for the prompt
  const conditionNames = conditionIds.map(id => {
    const found = ALL_CONDITIONS.find(c => c.id === id);
    return found ? found.name : id;
  }).join(", ");

  const specificDietRules = getDietRulesForConditions(conditionIds);
  const langInstruction = language === 'zh' 
    ? "OUTPUT MUST BE IN SIMPLIFIED CHINESE (中文)." 
    : "OUTPUT MUST BE IN ENGLISH.";

  const prompt = `
    You are an expert Clinical Dietitian and AI Nutritionist. 
    Analyze the provided food image.
    The user has the following medical conditions: ${conditionNames}.

    STRICTLY APPLY THE FOLLOWING CLINICAL GUIDELINES FOR THE USER'S CONDITIONS:
    ${specificDietRules}

    Your task:
    1. Identify the food.
    2. Assess the risk level (SAFE, MODERATE, RISKY) specifically for their conditions.
    3. Identify EXACTLY which of the user's conditions caused the risk (if any).
    4. Estimate nutritional content for a standard serving.
    5. Provide specific eating advice (portion control, what to pair it with).
    6. Suggest 2-3 SPECIFIC healthier food alternatives/swaps.
       - If RISKY/MODERATE: Suggest foods that are safer replacements.
       - If SAFE: Suggest ways to make it even healthier or similar healthy options.
       - IMPORTANT: Suggested alternatives MUST be common, affordable, and easily accessible ingredients found in standard grocery stores. Avoid rare or exotic foods.

    Be conservative with health advice. If the image is unclear or not food, mark as UNKNOWN.
    ${langInstruction}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ["SAFE", "MODERATE", "RISKY", "UNKNOWN"] },
            riskReason: { type: Type.STRING, description: "A short concise sentence explaining the main risk or benefit." },
            triggeredConditions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of the specific condition names from the user's profile that make this food risky. Empty if SAFE." 
            },
            detailedAnalysis: { type: Type.STRING, description: "A helpful paragraph explaining why this is good or bad given the specific diseases." },
            portionRecommendation: { type: Type.STRING, description: "Specific quantity advice e.g. '1/2 cup max'." },
            alternatives: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: "Name of the alternative food." },
                        reason: { type: Type.STRING, description: "Why this is a better choice for the user's conditions." }
                    },
                    required: ["name", "reason"]
                },
                description: "List of 2-3 specific healthier alternative food options."
            },
            nutrients: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                fat: { type: Type.NUMBER },
                sugar: { type: Type.NUMBER },
                sodium: { type: Type.NUMBER }
              },
              required: ["calories", "carbs", "protein", "fat", "sugar", "sodium"]
            }
          },
          required: ["foodName", "riskLevel", "riskReason", "triggeredConditions", "detailedAnalysis", "portionRecommendation", "alternatives", "nutrients"]
        }
      }
    });

    if (!response.text) {
        throw new Error("No response from AI");
    }

    const data = JSON.parse(response.text);
    
    // Map string enum from JSON to Typescript Enum
    let riskEnum = RiskLevel.UNKNOWN;
    switch(data.riskLevel) {
        case 'SAFE': riskEnum = RiskLevel.SAFE; break;
        case 'MODERATE': riskEnum = RiskLevel.MODERATE; break;
        case 'RISKY': riskEnum = RiskLevel.RISKY; break;
        default: riskEnum = RiskLevel.UNKNOWN;
    }

    return {
        ...data,
        riskLevel: riskEnum
    };

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback error result
    return {
      foodName: language === 'zh' ? "分析失败" : "Analysis Failed",
      riskLevel: RiskLevel.UNKNOWN,
      riskReason: language === 'zh' ? "无法处理图片" : "Could not process image.",
      triggeredConditions: [],
      detailedAnalysis: language === 'zh' ? "请重试清晰的照片。确保网络连接正常。" : "Please try again with a clearer photo. Ensure you have internet connection.",
      portionRecommendation: "N/A",
      nutrients: { calories: 0, carbs: 0, protein: 0, fat: 0, sugar: 0, sodium: 0 }
    };
  }
};

export const generateDietPlan = async (
  conditionIds: ConditionId[],
  language: Language
): Promise<AiDietPlan> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const model = "gemini-2.5-flash";

  const conditionNames = conditionIds.map(id => {
    const found = ALL_CONDITIONS.find(c => c.id === id);
    return found ? found.name : id;
  }).join(", ");

  const langInstruction = language === 'zh' 
    ? "OUTPUT MUST BE IN SIMPLIFIED CHINESE (中文)." 
    : "OUTPUT MUST BE IN ENGLISH.";

  const prompt = `
    You are an expert Clinical Dietitian and Personal Trainer.
    Create a personalized "Care Plan" for a user with the following conditions: ${conditionNames}.
    
    The plan must be holistic, safe, and address all the conditions simultaneously.

    CRITICAL INSTRUCTION FOR INGREDIENTS:
    - Use only COMMON, EASILY ACCESSIBLE ingredients found in standard local grocery stores.
    - Avoid rare, exotic, or expensive ingredients.
    
    Your Output must include:
    1. A summary strategy (2 sentences).
    2. A sample 1-day meal plan (Breakfast, Lunch, Dinner, 1 Snack).
    3. A specialized Workout/Exercise Routine that is SAFE for their conditions.
       - Include Frequency, Duration, Focus Area, 3-4 Specific Exercises, and Safety Precautions.
    4. 4-5 Key Dietary Guidelines (Do's and Don'ts mixed).
    5. 3 Lifestyle tips (sleep, hydration, etc).

    ${langInstruction}
  `;

  const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: prompt }] },
      config: {
          responseMimeType: "application/json",
          responseSchema: {
              type: Type.OBJECT,
              properties: {
                  summary: { type: Type.STRING },
                  meals: {
                      type: Type.OBJECT,
                      properties: {
                          breakfast: { type: Type.STRING },
                          lunch: { type: Type.STRING },
                          dinner: { type: Type.STRING },
                          snacks: { type: Type.STRING }
                      },
                      required: ["breakfast", "lunch", "dinner", "snacks"]
                  },
                  workout: {
                    type: Type.OBJECT,
                    properties: {
                      frequency: { type: Type.STRING, description: "e.g. 3-4 times/week" },
                      avgDuration: { type: Type.STRING, description: "e.g. 30 mins" },
                      focus: { type: Type.STRING, description: "e.g. Low Impact Cardio" },
                      exercises: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            name: { type: Type.STRING },
                            durationOrReps: { type: Type.STRING },
                            benefit: { type: Type.STRING }
                          },
                          required: ["name", "durationOrReps", "benefit"]
                        }
                      },
                      precautions: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["frequency", "avgDuration", "focus", "exercises", "precautions"]
                  },
                  guidelines: { 
                      type: Type.ARRAY, 
                      items: { type: Type.STRING }
                  },
                  lifestyle: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                  }
              },
              required: ["summary", "meals", "workout", "guidelines", "lifestyle"]
          }
      }
  });

  if (!response.text) {
      throw new Error("Failed to generate plan");
  }

  const data = JSON.parse(response.text);
  
  return {
      ...data,
      generatedAt: Date.now()
  };
}

export const generateRecipeFromIngredients = async (
  base64Images: string[],
  conditionIds: ConditionId[],
  language: Language
): Promise<ChefResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const model = "gemini-2.5-flash"; 
  
  // Prepare all image parts
  const imageParts = base64Images.map(img => ({
    inlineData: {
      mimeType: "image/jpeg",
      data: img.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "")
    }
  }));

  const conditionNames = conditionIds.map(id => {
    const found = ALL_CONDITIONS.find(c => c.id === id);
    return found ? found.name : id;
  }).join(", ");

  const specificDietRules = getDietRulesForConditions(conditionIds);
  const langInstruction = language === 'zh' 
    ? "OUTPUT MUST BE IN SIMPLIFIED CHINESE (中文)." 
    : "OUTPUT MUST BE IN ENGLISH.";

  const prompt = `
    You are an expert Chef and Clinical Dietitian.
    Analyze the provided image(s) to identify ALL ingredients present across all photos.
    
    Based on these identified ingredients, generate THREE distinct recipe options:
    1. A Breakfast option
    2. A Lunch option
    3. A Dinner option

    CRITICAL INSTRUCTION FOR MISSING INGREDIENTS:
    If the detected ingredients are not enough to make a complete, delicious, and balanced meal (e.g., user only has carrots), YOU MUST Auto-Complete the recipe by suggesting necessary MAIN ingredients (like proteins, grains, or key vegetables) that the user needs to add.
    
    The user has these conditions: ${conditionNames}.
    STRICTLY ADHERE TO THESE MEDICAL GUIDELINES:
    ${specificDietRules}

    If the image contains unsafe ingredients (e.g. high sugar for diabetic), DO NOT USE THEM in the recipes.
    
    Task:
    1. List the ingredients identified from the images.
    2. For EACH meal option (Breakfast, Lunch, Dinner), provide:
       - Recipe Name
       - Appetizing Description
       - Full Ingredients List (detected + missing items)
       - **Missing Ingredients**: Specifically list main ingredients that were NOT in the photo but are required for this recipe. Do not list basic pantry staples like oil/salt/pepper here.
       - Step-by-step Instructions
       - Health Benefits specific to the user's conditions
       - Estimated Macros

    ${langInstruction}
  `;

  // Helper schema for a single recipe to avoid repetition
  const recipeSchema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
      missingIngredients: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of MAIN ingredients required for this recipe that were NOT found in the user's photos."
      },
      instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
      healthBenefits: { type: Type.STRING },
      macrosEstimate: {
        type: Type.OBJECT,
        properties: {
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fat: { type: Type.NUMBER }
        },
        required: ["calories", "protein", "carbs", "fat"]
      }
    },
    required: ["name", "description", "ingredients", "missingIngredients", "instructions", "healthBenefits", "macrosEstimate"]
  };

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        ...imageParts,
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identifiedIngredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of ingredients recognized from the image"
          },
          breakfast: recipeSchema,
          lunch: recipeSchema,
          dinner: recipeSchema
        },
        required: ["identifiedIngredients", "breakfast", "lunch", "dinner"]
      }
    }
  });

  if (!response.text) {
      throw new Error("No response from AI");
  }

  return JSON.parse(response.text);
};
