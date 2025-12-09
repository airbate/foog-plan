import { Ingredient } from '../types';

export const INGREDIENTS_DB: Ingredient[] = [
  // GRAINS
  {
    id: 'oats',
    name: { en: 'Oats', zh: '燕麦' },
    category: 'grain',
    calories: 389,
    nutrients: { protein: 16.9, carbs: 66.3, fat: 6.9 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'hypertension'],
    harmfulFor: ['gout'], // Moderate purines, usually okay but caution
    description: {
      en: 'High in soluble fiber (beta-glucan), excellent for lowering cholesterol and stabilizing blood sugar.',
      zh: '富含可溶性膳食纤维（β-葡聚糖），非常适合降低胆固醇和稳定血糖。'
    }
  },
  {
    id: 'white_rice',
    name: { en: 'White Rice', zh: '白米饭' },
    category: 'grain',
    calories: 130,
    nutrients: { protein: 2.7, carbs: 28, fat: 0.3 },
    beneficialFor: ['ckd_3_5'], // Low potassium/phosphorus
    harmfulFor: ['diabetes_t2', 'prediabetes', 'fatty_liver_nafld'],
    description: {
      en: 'A high glycemic index food that can spike blood sugar quickly. Preferred for advanced kidney disease due to low minerals.',
      zh: '高升糖指数食物，会导致血糖迅速升高。因矿物质含量低，适合晚期肾病患者食用。'
    }
  },
  {
    id: 'brown_rice',
    name: { en: 'Brown Rice', zh: '糙米' },
    category: 'grain',
    calories: 111,
    nutrients: { protein: 2.6, carbs: 23, fat: 0.9 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['ckd_3_5'], // High phosphorus
    description: {
      en: 'Whole grain rich in fiber and magnesium. Good for metabolic health but high in phosphorus for kidney patients.',
      zh: '富含纤维和镁的全谷物。对代谢健康有益，但磷含量较高，肾病患者需慎用。'
    }
  },

  // PROTEIN
  {
    id: 'chicken_breast',
    name: { en: 'Chicken Breast', zh: '鸡胸肉' },
    category: 'protein',
    calories: 165,
    nutrients: { protein: 31, carbs: 0, fat: 3.6 },
    beneficialFor: ['diabetes_t2', 'fatty_liver_nafld', 'high_ldl'],
    harmfulFor: ['ckd_3_5'], // High protein load
    description: {
      en: 'Lean protein source, excellent for weight management and blood sugar control.',
      zh: '瘦蛋白来源，非常适合体重管理和血糖控制。'
    }
  },
  {
    id: 'salmon',
    name: { en: 'Salmon', zh: '三文鱼' },
    category: 'protein',
    calories: 208,
    nutrients: { protein: 20, carbs: 0, fat: 13 },
    beneficialFor: ['high_triglycerides', 'cad', 'hypertension'],
    harmfulFor: [],
    description: {
      en: 'Rich in Omega-3 fatty acids, highly beneficial for heart health and reducing inflammation.',
      zh: '富含Omega-3脂肪酸，对心脏健康和减轻炎症非常有益。'
    }
  },
  {
    id: 'tofu',
    name: { en: 'Tofu', zh: '豆腐' },
    category: 'protein',
    calories: 76,
    nutrients: { protein: 8, carbs: 1.9, fat: 4.8 },
    beneficialFor: ['high_ldl', 'diabetes_t2'],
    harmfulFor: ['gout'], // Generally safe but some debate on purines during flare
    description: {
      en: 'Plant-based protein, low in saturated fat. Contains isoflavones beneficial for heart health.',
      zh: '植物蛋白，低饱和脂肪。含有对心脏健康有益的异黄酮。'
    }
  },

  // VEGETABLES
  {
    id: 'spinach',
    name: { en: 'Spinach', zh: '菠菜' },
    category: 'vegetable',
    calories: 23,
    nutrients: { protein: 2.9, carbs: 3.6, fat: 0.4 },
    beneficialFor: ['hypertension', 'diabetes_t2'],
    harmfulFor: ['gout', 'ckd_3_5', 'hyperkalemia'], // Oxalates + Potassium
    description: {
      en: 'Nutrient dense with iron and potassium. High in oxalates (bad for stones/gout) and potassium (bad for CKD).',
      zh: '营养丰富，含铁和钾。草酸含量高（对结石/痛风不利），钾含量高（对肾病不利）。'
    }
  },
  {
    id: 'broccoli',
    name: { en: 'Broccoli', zh: '西兰花' },
    category: 'vegetable',
    calories: 34,
    nutrients: { protein: 2.8, carbs: 7, fat: 0.4 },
    beneficialFor: ['fatty_liver_nafld', 'diabetes_t2', 'cad'],
    harmfulFor: ['ibs'], // High FODMAP/Gas
    description: {
      en: 'Cruciferous vegetable that supports liver detoxification and has anti-inflammatory properties.',
      zh: '十字花科蔬菜，支持肝脏排毒，具有抗炎特性。'
    }
  },
  {
    id: 'potato',
    name: { en: 'Potato', zh: '土豆' },
    category: 'vegetable',
    calories: 77,
    nutrients: { protein: 2, carbs: 17, fat: 0.1 },
    beneficialFor: ['hypertension'], // High potassium
    harmfulFor: ['diabetes_t2', 'hyperkalemia'],
    description: {
      en: 'High potassium source. High glycemic index if mashed or baked hot. Cooling increases resistant starch.',
      zh: '高钾来源。如果热食（如土豆泥），升糖指数较高。冷却后会增加抗性淀粉。'
    }
  },

  // FRUITS
  {
    id: 'apple',
    name: { en: 'Apple', zh: '苹果' },
    category: 'fruit',
    calories: 52,
    nutrients: { protein: 0.3, carbs: 14, fat: 0.2 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['ibs'], // FODMAPs
    description: {
      en: 'Contains pectin (soluble fiber). "An apple a day" holds true for metabolic health.',
      zh: '含有果胶（可溶性纤维）。对代谢健康非常有益。'
    }
  },
  {
    id: 'banana',
    name: { en: 'Banana', zh: '香蕉' },
    category: 'fruit',
    calories: 89,
    nutrients: { protein: 1.1, carbs: 23, fat: 0.3 },
    beneficialFor: ['hypertension'],
    harmfulFor: ['hyperkalemia', 'diabetes_t2'], // High sugar/potassium
    description: {
      en: 'Excellent potassium source for lowering blood pressure, but high in sugar/carbs.',
      zh: '极佳的降血压钾来源，但糖分/碳水含量较高。'
    }
  },
  
  // DAIRY
  {
    id: 'yogurt',
    name: { en: 'Greek Yogurt', zh: '希腊酸奶' },
    category: 'dairy',
    calories: 59,
    nutrients: { protein: 10, carbs: 3.6, fat: 0.4 },
    beneficialFor: ['diabetes_t2', 'hypertension'],
    harmfulFor: ['lactose_intolerance'],
    description: {
      en: 'High protein, probiotics for gut health. Choose plain unsweetened varieties.',
      zh: '高蛋白，含益生菌，有益肠道健康。请选择无糖原味。'
    }
  }
];

export const getIngredients = () => INGREDIENTS_DB;