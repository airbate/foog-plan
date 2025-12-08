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

export interface AnalysisResult {
  foodName: string;
  riskLevel: RiskLevel;
  riskReason: string; // Brief one-line reason
  triggeredConditions: string[]; // Specific conditions that caused the risk
  detailedAnalysis: string; // Paragraph explanation
  portionRecommendation: string; // e.g. "Limit to 100g"
  alternativeSuggestion?: string; // e.g. "Try grilled chicken instead"
  nutrients: NutrientInfo;
}

export interface ScanRecord {
  id: string;
  timestamp: number;
  imageUrl: string; // Base64 data URI
  result: AnalysisResult;
}

export interface UserProfile {
  id: string;
  name: string;
  conditions: ConditionId[]; // Array of strings (e.g., 'diabetes_t2', 'gout')
  onboarded: boolean;
  language: Language;
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