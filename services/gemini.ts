import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskLevel, ConditionId, Language, AiDietPlan } from '../types';
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
    You are an expert Clinical Dietitian.
    Create a personalized "Care Plan" for a user with the following conditions: ${conditionNames}.
    
    The plan must be holistic, safe, and address all the conditions simultaneously.

    CRITICAL INSTRUCTION FOR INGREDIENTS:
    - Use only COMMON, EASILY ACCESSIBLE ingredients found in standard local grocery stores.
    - Avoid rare, exotic, or expensive ingredients.
    - Focus on affordable, everyday foods that are easy to prepare.
    - If suggesting specific dishes, ensure the main components are widely available.
    
    Output structured data with:
    1. A summary strategy (2 sentences).
    2. A sample 1-day meal plan (Breakfast, Lunch, Dinner, 1 Snack).
    3. 4-5 Key Dietary Guidelines (Do's and Don'ts mixed).
    4. 3 Lifestyle tips (exercise, sleep, hydration, etc).

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
                  guidelines: { 
                      type: Type.ARRAY, 
                      items: { type: Type.STRING }
                  },
                  lifestyle: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                  }
              },
              required: ["summary", "meals", "guidelines", "lifestyle"]
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