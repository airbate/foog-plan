export type ConditionId = string;
export type Language = 'en' | 'zh';

export enum RiskLevel {
  SAFE = 'SAFE',
  MODERATE = 'MODERATE',
  RISKY = 'RISKY',
  UNKNOWN = 'UNKNOWN'
}

export interface NutrientInfo {
  calories: number; // kcal
  carbs: number; // g
  protein: number; // g
  fat: number; // g
  sugar: number; // g
  sodium: number; // mg
}

export interface AlternativeFood {
  name: string;
  reason: string;
}

export interface AnalysisResult {
  foodName: string;
  riskLevel: RiskLevel;
  riskReason: string; // Brief one-line reason
  triggeredConditions: string[]; // Specific conditions that caused a 'RISKY' or 'MODERATE' assessment
  detailedAnalysis: string; // Paragraph explanation
  portionRecommendation: string; // e.g. "Limit to 100g"
  alternativeSuggestion?: string; // Legacy string field
  alternatives?: AlternativeFood[]; // New structured alternatives
  nutrients: NutrientInfo;
}

export interface ScanRecord {
  id: string;
  timestamp: number;
  imageUrl: string; // Base64 data URI
  result: AnalysisResult;
}

export interface DailyMealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

export interface AiDietPlan {
  summary: string; // High level strategy
  meals: DailyMealPlan;
  guidelines: string[]; // Key dos and don'ts combined
  lifestyle: string[]; // Exercise, sleep, hydration tips
  generatedAt: number;
}

export interface UserProfile {
  id: string;
  name: string;
  conditions: ConditionId[]; // Array of strings (e.g., 'diabetes_t2', 'gout')
  onboarded: boolean;
  language: Language;
  dietPlan?: AiDietPlan; // New field for the generated plan
}

// Hierarchical Data Structures
export interface HealthCondition {
  id: ConditionId;
  name: string;
  description?: string;
}

export interface HealthGroup {
  id: string;
  name: string; // e.g., "A1 Diabetes"
  conditions: HealthCondition[];
}

export interface HealthCategory {
  id: string;
  name: string; // e.g., "A. Metabolic"
  groups: HealthGroup[];
}

export interface DietRule {
  id: ConditionId;
  name: string;
  avoid: string[];
  limit: string[];
  recommend: string[];
  generalAdvice: string;
}

// New Interface for Ingredient Guide
export interface Ingredient {
  id: string;
  name: { en: string; zh: string };
  category: 'grain' | 'protein' | 'vegetable' | 'fruit' | 'dairy' | 'other';
  calories: number; // per 100g
  nutrients: { protein: number; carbs: number; fat: number };
  beneficialFor: ConditionId[]; // IDs from dietRules
  harmfulFor: ConditionId[];   // IDs from dietRules
  description: { en: string; zh: string };
}