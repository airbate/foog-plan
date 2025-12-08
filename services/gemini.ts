import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskLevel, ConditionId, Language } from '../types';
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
    6. Suggest a healthier alternative if risky.

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
            alternativeSuggestion: { type: Type.STRING, description: "A similar but healthier food choice." },
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
          required: ["foodName", "riskLevel", "riskReason", "triggeredConditions", "detailedAnalysis", "portionRecommendation", "nutrients"]
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