import { Ingredient } from '../types';

export const INGREDIENTS_DB: Ingredient[] = [
  // ==================== GRAINS & STARCHES ====================
  {
    id: 'oats',
    name: { en: 'Oats', zh: '燕麦' },
    category: 'grain',
    calories: 389,
    nutrients: { protein: 16.9, carbs: 66.3, fat: 6.9 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'hypertension', 'fatty_liver_nafld'],
    harmfulFor: ['gout'], // Moderate purines
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
    beneficialFor: ['ckd_3_5', 'ibs'], // Low residue, low mineral
    harmfulFor: ['diabetes_t2', 'prediabetes', 'fatty_liver_nafld'],
    description: {
      en: 'High glycemic index. Can spike blood sugar quickly. Preferred for advanced kidney disease due to low potassium/phosphorus.',
      zh: '高升糖指数食物，会导致血糖迅速升高。因钾磷含量低，适合晚期肾病患者食用。'
    }
  },
  {
    id: 'brown_rice',
    name: { en: 'Brown Rice', zh: '糙米' },
    category: 'grain',
    calories: 111,
    nutrients: { protein: 2.6, carbs: 23, fat: 0.9 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'hypertension'],
    harmfulFor: ['ckd_3_5'], // High phosphorus
    description: {
      en: 'Whole grain rich in fiber and magnesium. Good for metabolic health but high in phosphorus for kidney patients.',
      zh: '富含纤维和镁的全谷物。对代谢健康有益，但磷含量较高，肾病患者需慎用。'
    }
  },
  {
    id: 'quinoa',
    name: { en: 'Quinoa', zh: '藜麦' },
    category: 'grain',
    calories: 120,
    nutrients: { protein: 4.4, carbs: 21, fat: 1.9 },
    beneficialFor: ['diabetes_t2', 'celiac'],
    harmfulFor: ['ckd_3_5'], // High potassium
    description: {
      en: 'A complete protein and gluten-free grain. High in fiber and low glycemic index.',
      zh: '富含完全蛋白的无麸质谷物。高纤维，低升糖指数。'
    }
  },
  {
    id: 'bread_whole',
    name: { en: 'Whole Wheat Bread', zh: '全麦面包' },
    category: 'grain',
    calories: 247,
    nutrients: { protein: 13, carbs: 41, fat: 3.4 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['celiac'], // Gluten
    description: {
      en: 'Rich in fiber and B vitamins. Better for blood sugar control than white bread.',
      zh: '富含纤维和B族维生素。比白面包更有利于血糖控制。'
    }
  },
  {
    id: 'corn',
    name: { en: 'Corn', zh: '玉米' },
    category: 'grain',
    calories: 86,
    nutrients: { protein: 3.2, carbs: 19, fat: 1.2 },
    beneficialFor: ['celiac'], // Gluten free
    harmfulFor: ['diabetes_t2'], // Starchy, can spike sugar if overeaten
    description: {
      en: 'A starchy vegetable/grain. Gluten-free. Moderate GI, portion control needed for diabetes.',
      zh: '淀粉类蔬菜/谷物。无麸质。升糖指数适中，糖尿病患者需控制分量。'
    }
  },
  {
    id: 'barley',
    name: { en: 'Barley', zh: '大麦' },
    category: 'grain',
    calories: 354,
    nutrients: { protein: 12, carbs: 73, fat: 2.3 },
    beneficialFor: ['high_ldl', 'diabetes_t2'], // Beta-glucan
    harmfulFor: ['celiac'], // Contains Gluten
    description: {
      en: 'Very high in fiber, particularly beta-glucan which lowers cholesterol. Contains gluten.',
      zh: '富含纤维，特别是能降低胆固醇的β-葡聚糖。含有麸质。'
    }
  },
  {
    id: 'millet',
    name: { en: 'Millet', zh: '小米' },
    category: 'grain',
    calories: 378,
    nutrients: { protein: 11, carbs: 73, fat: 4.2 },
    beneficialFor: ['gerd', 'celiac'], // Alkaline, GF
    harmfulFor: ['diabetes_t2'], // High GI especially as porridge
    description: {
      en: 'Alkaline grain, easy to digest, good for stomach issues. High GI when cooked as soft porridge.',
      zh: '碱性谷物，易消化，对胃部不适有益。煮成软粥时升糖指数较高。'
    }
  },
  {
    id: 'buckwheat',
    name: { en: 'Buckwheat', zh: '荞麦' },
    category: 'grain',
    calories: 343,
    nutrients: { protein: 13, carbs: 71, fat: 3.4 },
    beneficialFor: ['diabetes_t2', 'hypertension', 'celiac'],
    harmfulFor: [],
    description: {
      en: 'Not wheat, gluten-free. Contains rutin which improves circulation and blood sugar.',
      zh: '不是小麦，无麸质。含有芦丁，有助于改善血液循环和血糖。'
    }
  },

  // ==================== PROTEINS ====================
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
    beneficialFor: ['high_triglycerides', 'cad', 'hypertension', 'fatty_liver_nafld'],
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
    beneficialFor: ['high_ldl', 'diabetes_t2', 'hypertension'],
    harmfulFor: ['gout'], // Moderate purines, usually okay in moderation
    description: {
      en: 'Plant-based protein, low in saturated fat. Contains isoflavones beneficial for heart health.',
      zh: '植物蛋白，低饱和脂肪。含有对心脏健康有益的异黄酮。'
    }
  },
  {
    id: 'egg',
    name: { en: 'Egg', zh: '鸡蛋' },
    category: 'protein',
    calories: 155,
    nutrients: { protein: 13, carbs: 1.1, fat: 11 },
    beneficialFor: ['diabetes_t2'],
    harmfulFor: ['high_ldl', 'cad'], // Yolk cholesterol debate
    description: {
      en: 'High quality protein and choline. Whites are safe for heart/kidney; yolks strictly limited for high cholesterol.',
      zh: '优质蛋白和胆碱。蛋白对心脏/肾脏安全；高胆固醇患者需限制蛋黄。'
    }
  },
  {
    id: 'beef_lean',
    name: { en: 'Lean Beef', zh: '瘦牛肉' },
    category: 'protein',
    calories: 250,
    nutrients: { protein: 26, carbs: 0, fat: 15 },
    beneficialFor: ['pregnancy'], // Iron
    harmfulFor: ['gout', 'high_ldl', 'cad', 'fatty_liver_nafld'],
    description: {
      en: 'Rich in Iron and B12. High in saturated fat and purines, limit intake for heart and gout.',
      zh: '富含铁和B12。但饱和脂肪和嘌呤含量高，心脏病和痛风患者需限制摄入。'
    }
  },
  {
    id: 'pork_tenderloin',
    name: { en: 'Pork Tenderloin', zh: '猪里脊' },
    category: 'protein',
    calories: 143,
    nutrients: { protein: 26, carbs: 0, fat: 3.5 },
    beneficialFor: ['diabetes_t2'],
    harmfulFor: ['gout', 'high_ldl'], // Still red meat category mostly
    description: {
      en: 'The leanest cut of pork, comparable to chicken breast. Good B-vitamins.',
      zh: '猪肉中最瘦的部位，脂肪含量与鸡胸肉相当。富含B族维生素。'
    }
  },
  {
    id: 'shrimp',
    name: { en: 'Shrimp', zh: '虾' },
    category: 'protein',
    calories: 99,
    nutrients: { protein: 24, carbs: 0.2, fat: 0.3 },
    beneficialFor: ['diabetes_t2'],
    harmfulFor: ['gout', 'high_ldl', 'allergy_seafood'],
    description: {
      en: 'Very lean protein but high in dietary cholesterol and purines.',
      zh: '极低脂蛋白，但膳食胆固醇和嘌呤含量较高。'
    }
  },
  {
    id: 'tuna_canned',
    name: { en: 'Tuna (Canned)', zh: '金枪鱼(罐头)' },
    category: 'protein',
    calories: 116,
    nutrients: { protein: 26, carbs: 0, fat: 1 },
    beneficialFor: ['diabetes_t2', 'high_triglycerides'],
    harmfulFor: ['pregnancy', 'hypertension'], // Mercury, Sodium if salted
    description: {
      en: 'Convenient lean protein. Pregnant women should limit intake due to mercury. Watch sodium.',
      zh: '方便的瘦蛋白。孕妇因汞含量应限制摄入。注意钠含量。'
    }
  },
  {
    id: 'lentils',
    name: { en: 'Lentils', zh: '扁豆' },
    category: 'protein',
    calories: 116,
    nutrients: { protein: 9, carbs: 20, fat: 0.4 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'fatty_liver_nafld'],
    harmfulFor: ['gout', 'ibs'], // Purines, FODMAPs
    description: {
      en: 'Excellent plant protein and high fiber. Lowers cholesterol and stabilizes blood sugar.',
      zh: '极佳的植物蛋白和高纤维。降低胆固醇并稳定血糖。'
    }
  },
  {
    id: 'chickpeas',
    name: { en: 'Chickpeas', zh: '鹰嘴豆' },
    category: 'protein',
    calories: 164,
    nutrients: { protein: 8.9, carbs: 27, fat: 2.6 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['ibs'], // Galactans (FODMAP)
    description: {
      en: 'High fiber and protein. Low GI. Can cause gas/bloating in IBS.',
      zh: '高纤维和蛋白质。低升糖指数。IBS患者食用可能引起胀气。'
    }
  },
  {
    id: 'edamame',
    name: { en: 'Edamame', zh: '毛豆' },
    category: 'protein',
    calories: 121,
    nutrients: { protein: 11, carbs: 10, fat: 5 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'hypertension'],
    harmfulFor: [],
    description: {
      en: 'Young soybeans. Complete plant protein, rich in fiber and antioxidants.',
      zh: '年轻的黄豆。完全植物蛋白，富含纤维和抗氧化剂。'
    }
  },

  // ==================== VEGETABLES ====================
  {
    id: 'spinach',
    name: { en: 'Spinach', zh: '菠菜' },
    category: 'vegetable',
    calories: 23,
    nutrients: { protein: 2.9, carbs: 3.6, fat: 0.4 },
    beneficialFor: ['hypertension', 'diabetes_t2', 'pregnancy'],
    harmfulFor: ['gout', 'ckd_3_5', 'hyperkalemia'], // Oxalates + Potassium
    description: {
      en: 'Nutrient dense with iron and potassium. High in oxalates (bad for stones/gout) and potassium.',
      zh: '营养丰富，含铁和钾。草酸含量高（对结石/痛风不利），钾含量高。'
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
    id: 'cauliflower',
    name: { en: 'Cauliflower', zh: '花椰菜' },
    category: 'vegetable',
    calories: 25,
    nutrients: { protein: 1.9, carbs: 5, fat: 0.3 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['ibs', 'gout'], // High FODMAP, Moderate Purines
    description: {
      en: 'Low carb substitute for rice/potato. High in Vitamin C. Can cause gas (IBS).',
      zh: '米饭/土豆的低碳水替代品。富含维生素C。可能引起胀气（IBS）。'
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
  {
    id: 'sweet_potato',
    name: { en: 'Sweet Potato', zh: '红薯' },
    category: 'vegetable',
    calories: 86,
    nutrients: { protein: 1.6, carbs: 20, fat: 0.1 },
    beneficialFor: ['diabetes_t2', 'high_ldl'], // High fiber, Vitamin A
    harmfulFor: ['ckd_3_5', 'hyperkalemia'], // High potassium
    description: {
      en: 'Rich in beta-carotene and fiber. Lower GI than regular potatoes, but still requires portion control for diabetics.',
      zh: '富含β-胡萝卜素和纤维。升糖指数低于普通土豆，但糖尿病患者仍需控制分量。'
    }
  },
  {
    id: 'kale',
    name: { en: 'Kale', zh: '羽衣甘蓝' },
    category: 'vegetable',
    calories: 49,
    nutrients: { protein: 4.3, carbs: 8.8, fat: 0.9 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'cad'],
    harmfulFor: ['ckd_3_5', 'hyperkalemia'], // High potassium
    description: {
      en: 'Superfood rich in Vitamin K, C, and antioxidants. High potassium is dangerous for advanced kidney disease.',
      zh: '富含维生素K、C和抗氧化剂的超级食物。高钾对晚期肾病危险。'
    }
  },
  {
    id: 'carrot',
    name: { en: 'Carrot', zh: '胡萝卜' },
    category: 'vegetable',
    calories: 41,
    nutrients: { protein: 0.9, carbs: 9.6, fat: 0.2 },
    beneficialFor: ['high_ldl', 'diabetes_t2'],
    harmfulFor: [],
    description: {
      en: 'Rich in beta-carotene (Vitamin A). Good for eyes and heart. Cooked carrots have higher GI than raw.',
      zh: '富含β-胡萝卜素（维生素A）。对眼睛和心脏有益。熟胡萝卜的升糖指数高于生胡萝卜。'
    }
  },
  {
    id: 'tomato',
    name: { en: 'Tomato', zh: '番茄' },
    category: 'vegetable',
    calories: 18,
    nutrients: { protein: 0.9, carbs: 3.9, fat: 0.2 },
    beneficialFor: ['cad', 'high_ldl', 'fatty_liver_nafld'], // Lycopene
    harmfulFor: ['gerd', 'gout', 'hyperkalemia'], // Acidic + Potassium
    description: {
      en: 'High in Lycopene (heart health). Acidic nature triggers GERD. High potassium.',
      zh: '富含番茄红素（心脏健康）。酸性会诱发胃食管反流。钾含量高。'
    }
  },
  {
    id: 'cucumber',
    name: { en: 'Cucumber', zh: '黄瓜' },
    category: 'vegetable',
    calories: 15,
    nutrients: { protein: 0.7, carbs: 3.6, fat: 0.1 },
    beneficialFor: ['diabetes_t2', 'hypertension', 'gout'],
    harmfulFor: [],
    description: {
      en: 'Very low calorie and hydrating. Good for weight loss and blood pressure.',
      zh: '极低热量且补水。对减肥和血压控制有益。'
    }
  },
  {
    id: 'eggplant',
    name: { en: 'Eggplant', zh: '茄子' },
    category: 'vegetable',
    calories: 25,
    nutrients: { protein: 1, carbs: 6, fat: 0.2 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['gout'], // Nightshade, some gout patients sensitive
    description: {
      en: 'High in anthocyanins (skin). Spongy texture absorbs oil easily, so steam or bake instead of frying.',
      zh: '富含花青素（皮）。海绵状质地容易吸油，建议蒸或烤，避免油炸。'
    }
  },
  {
    id: 'bell_pepper',
    name: { en: 'Bell Pepper', zh: '彩椒' },
    category: 'vegetable',
    calories: 31,
    nutrients: { protein: 1, carbs: 6, fat: 0.3 },
    beneficialFor: ['diabetes_t2', 'cad', 'high_ldl'],
    harmfulFor: [],
    description: {
      en: 'Extremely high in Vitamin C and antioxidants. Low calorie.',
      zh: '维生素C和抗氧化剂含量极高。低热量。'
    }
  },
  {
    id: 'onion',
    name: { en: 'Onion', zh: '洋葱' },
    category: 'vegetable',
    calories: 40,
    nutrients: { protein: 1.1, carbs: 9, fat: 0.1 },
    beneficialFor: ['high_ldl', 'hypertension', 'diabetes_t2'],
    harmfulFor: ['ibs', 'gerd'], // Fructans, Acid reflux
    description: {
      en: 'Contains quercetin (heart health). Major trigger for IBS (FODMAPs) and GERD.',
      zh: '含有槲皮素（心脏健康）。IBS（FODMAPs）和胃食管反流的主要诱因。'
    }
  },
  {
    id: 'garlic',
    name: { en: 'Garlic', zh: '大蒜' },
    category: 'vegetable',
    calories: 149,
    nutrients: { protein: 6.4, carbs: 33, fat: 0.5 },
    beneficialFor: ['hypertension', 'high_ldl', 'cad'],
    harmfulFor: ['ibs', 'gerd'], // Fructans, Acid reflux
    description: {
      en: 'Potent medicinal properties for heart and immunity. High FODMAP trigger for IBS.',
      zh: '对心脏和免疫力有强效药用价值。IBS的高FODMAP诱因。'
    }
  },
  {
    id: 'asparagus',
    name: { en: 'Asparagus', zh: '芦笋' },
    category: 'vegetable',
    calories: 20,
    nutrients: { protein: 2.2, carbs: 3.9, fat: 0.1 },
    beneficialFor: ['diabetes_t2', 'hypertension', 'pregnancy'], // Folate
    harmfulFor: ['gout'], // Moderate purines
    description: {
      en: 'Natural diuretic, high in folate. Moderate purine content requires caution for severe gout.',
      zh: '天然利尿剂，富含叶酸。嘌呤含量中等，严重痛风患者需谨慎。'
    }
  },
  {
    id: 'mushroom',
    name: { en: 'Mushroom', zh: '蘑菇' },
    category: 'vegetable',
    calories: 22,
    nutrients: { protein: 3.1, carbs: 3.3, fat: 0.3 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: ['gout', 'ibs'], // Moderate purines, Mannitol
    description: {
      en: 'Savory (umami) flavor, low calorie. Contains mannitol (polyol) which can affect IBS.',
      zh: '鲜味（Umami），低热量。含有甘露醇（多元醇），可能影响IBS。'
    }
  },

  // ==================== FRUITS ====================
  {
    id: 'apple',
    name: { en: 'Apple', zh: '苹果' },
    category: 'fruit',
    calories: 52,
    nutrients: { protein: 0.3, carbs: 14, fat: 0.2 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'gout'],
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
  {
    id: 'blueberries',
    name: { en: 'Blueberries', zh: '蓝莓' },
    category: 'fruit',
    calories: 57,
    nutrients: { protein: 0.7, carbs: 14, fat: 0.3 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'hypertension', 'fatty_liver_nafld'],
    harmfulFor: [],
    description: {
      en: 'Powerhouse of antioxidants (anthocyanins). Improves insulin sensitivity and lowers blood pressure.',
      zh: '抗氧化剂（花青素）的宝库。改善胰岛素敏感性并降低血压。'
    }
  },
  {
    id: 'strawberries',
    name: { en: 'Strawberries', zh: '草莓' },
    category: 'fruit',
    calories: 32,
    nutrients: { protein: 0.7, carbs: 7.7, fat: 0.3 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'gout'],
    harmfulFor: [],
    description: {
      en: 'Low glycemic index fruit packed with Vitamin C. Excellent for diabetics.',
      zh: '富含维生素C的低升糖指数水果。非常适合糖尿病患者。'
    }
  },
  {
    id: 'orange',
    name: { en: 'Orange', zh: '橙子' },
    category: 'fruit',
    calories: 47,
    nutrients: { protein: 0.9, carbs: 12, fat: 0.1 },
    beneficialFor: ['hypertension', 'gout'], // Vit C lowers uric acid
    harmfulFor: ['gerd', 'hyperkalemia'], // Acidic + Potassium
    description: {
      en: 'High Vitamin C helps lower uric acid (Gout). Acidic nature triggers GERD.',
      zh: '高维生素C有助于降低尿酸（痛风）。酸性会诱发胃食管反流。'
    }
  },
  {
    id: 'avocado',
    name: { en: 'Avocado', zh: '牛油果' },
    category: 'fruit',
    calories: 160,
    nutrients: { protein: 2, carbs: 8.5, fat: 15 },
    beneficialFor: ['high_ldl', 'metabolic_syndrome'],
    harmfulFor: ['hyperkalemia', 'fatty_liver_nafld'], // Calorie dense
    description: {
      en: 'Full of healthy monounsaturated fats. Very high in potassium.',
      zh: '富含健康的单不饱和脂肪。钾含量非常高。'
    }
  },
  {
    id: 'watermelon',
    name: { en: 'Watermelon', zh: '西瓜' },
    category: 'fruit',
    calories: 30,
    nutrients: { protein: 0.6, carbs: 8, fat: 0.2 },
    beneficialFor: ['hypertension'], // Citrulline
    harmfulFor: ['diabetes_t2', 'hyperkalemia'], // High GI
    description: {
      en: 'Very high glycemic index, spikes sugar fast. High water content, refreshing.',
      zh: '升糖指数很高，血糖上升快。含水量高，清爽。'
    }
  },
  {
    id: 'grapes',
    name: { en: 'Grapes', zh: '葡萄' },
    category: 'fruit',
    calories: 69,
    nutrients: { protein: 0.7, carbs: 18, fat: 0.2 },
    beneficialFor: ['hypertension'],
    harmfulFor: ['diabetes_t2', 'ckd_3_5'], // High sugar, potassium
    description: {
      en: 'High in sugar. Contains resveratrol (skin). Portion control essential for diabetes.',
      zh: '糖分高。含有白藜芦醇（皮）。糖尿病患者必须控制分量。'
    }
  },
  {
    id: 'cherries',
    name: { en: 'Cherries', zh: '樱桃' },
    category: 'fruit',
    calories: 50,
    nutrients: { protein: 1, carbs: 12, fat: 0.3 },
    beneficialFor: ['gout'], // Proven to lower uric acid
    harmfulFor: ['ibs'], // Fructose/Sorbitol
    description: {
      en: 'Famous for lowering uric acid levels and preventing gout attacks.',
      zh: '以降低尿酸水平和预防痛风发作而闻名。'
    }
  },
  {
    id: 'pineapple',
    name: { en: 'Pineapple', zh: '菠萝' },
    category: 'fruit',
    calories: 50,
    nutrients: { protein: 0.5, carbs: 13, fat: 0.1 },
    beneficialFor: ['cad'], // Bromelain (anti-inflammatory)
    harmfulFor: ['diabetes_t2', 'gerd'], // High Sugar, Acidic
    description: {
      en: 'Contains bromelain enzyme which aids digestion. Very sweet and acidic.',
      zh: '含有有助于消化的菠萝蛋白酶。非常甜且酸。'
    }
  },

  // ==================== DAIRY & ALTS ====================
  {
    id: 'yogurt',
    name: { en: 'Greek Yogurt', zh: '希腊酸奶' },
    category: 'dairy',
    calories: 59,
    nutrients: { protein: 10, carbs: 3.6, fat: 0.4 },
    beneficialFor: ['diabetes_t2', 'hypertension', 'gout'],
    harmfulFor: ['lactose_intolerance'],
    description: {
      en: 'High protein, probiotics for gut health. Choose plain unsweetened varieties.',
      zh: '高蛋白，含益生菌，有益肠道健康。请选择无糖原味。'
    }
  },
  {
    id: 'milk',
    name: { en: 'Milk', zh: '牛奶' },
    category: 'dairy',
    calories: 42,
    nutrients: { protein: 3.4, carbs: 5, fat: 1 },
    beneficialFor: ['gout', 'hypertension'], // Low fat dairy lowers uric acid
    harmfulFor: ['lactose_intolerance', 'ckd_3_5'], // Phosphorus
    description: {
      en: 'Good source of calcium and protein. Low-fat dairy helps excrete uric acid.',
      zh: '钙和蛋白质的良好来源。低脂乳制品有助于排出尿酸。'
    }
  },
  {
    id: 'cheese_cheddar',
    name: { en: 'Cheddar Cheese', zh: '切达干酪' },
    category: 'dairy',
    calories: 402,
    nutrients: { protein: 25, carbs: 1.3, fat: 33 },
    beneficialFor: [],
    harmfulFor: ['hypertension', 'high_ldl', 'ckd_3_5'], // Sodium, Sat Fat, Phos
    description: {
      en: 'High in calcium but also very high in saturated fat and sodium.',
      zh: '富含钙，但饱和脂肪和钠含量也很高。'
    }
  },
  {
    id: 'soy_milk',
    name: { en: 'Soy Milk', zh: '豆浆' },
    category: 'dairy',
    calories: 33,
    nutrients: { protein: 2.8, carbs: 1.8, fat: 1.6 },
    beneficialFor: ['high_ldl', 'lactose_intolerance'],
    harmfulFor: ['gout'], // Moderate purines, check individual tolerance
    description: {
      en: 'Heart-healthy plant milk. Good protein. Choose unsweetened.',
      zh: '有益心脏的植物奶。优质蛋白。请选择无糖。'
    }
  },
  {
    id: 'almond_milk',
    name: { en: 'Almond Milk', zh: '杏仁奶' },
    category: 'dairy',
    calories: 15,
    nutrients: { protein: 0.5, carbs: 0.3, fat: 1.1 },
    beneficialFor: ['diabetes_t2', 'lactose_intolerance'],
    harmfulFor: [],
    description: {
      en: 'Very low calorie and carb (if unsweetened). Low in protein compared to soy/dairy.',
      zh: '极低热量和碳水（如果无糖）。蛋白质含量低于豆奶/牛奶。'
    }
  },

  // ==================== NUTS, OILS & OTHERS ====================
  {
    id: 'walnuts',
    name: { en: 'Walnuts', zh: '核桃' },
    category: 'other',
    calories: 654,
    nutrients: { protein: 15, carbs: 14, fat: 65 },
    beneficialFor: ['high_ldl', 'cad', 'diabetes_t2'],
    harmfulFor: ['fatty_liver_nafld'], // Calorie dense if overeaten
    description: {
      en: 'Rich in plant-based Omega-3s. Excellent for heart and brain health.',
      zh: '富含植物性Omega-3。对心脏和大脑健康极佳。'
    }
  },
  {
    id: 'almonds',
    name: { en: 'Almonds', zh: '杏仁' },
    category: 'other',
    calories: 579,
    nutrients: { protein: 21, carbs: 22, fat: 50 },
    beneficialFor: ['diabetes_t2', 'high_ldl'],
    harmfulFor: [],
    description: {
      en: 'Packed with Vitamin E, magnesium, and healthy fats. Great for blood sugar.',
      zh: '富含维生素E、镁和健康脂肪。对血糖非常有益。'
    }
  },
  {
    id: 'olive_oil',
    name: { en: 'Olive Oil', zh: '橄榄油' },
    category: 'other',
    calories: 884,
    nutrients: { protein: 0, carbs: 0, fat: 100 },
    beneficialFor: ['cad', 'high_ldl', 'hypertension', 'fatty_liver_nafld'],
    harmfulFor: [],
    description: {
      en: 'Cornerstone of Mediterranean diet. Anti-inflammatory and heart healthy.',
      zh: '地中海饮食的基石。抗炎并有益心脏健康。'
    }
  },
  {
    id: 'chia_seeds',
    name: { en: 'Chia Seeds', zh: '奇亚籽' },
    category: 'other',
    calories: 486,
    nutrients: { protein: 17, carbs: 42, fat: 31 },
    beneficialFor: ['diabetes_t2', 'high_ldl', 'hypertension'],
    harmfulFor: [],
    description: {
      en: 'Highest plant source of Omega-3. Forms a gel that slows digestion/sugar spikes.',
      zh: '植物性Omega-3的最高来源。形成凝胶，减缓消化/血糖峰值。'
    }
  },
  {
    id: 'dark_chocolate',
    name: { en: 'Dark Chocolate', zh: '黑巧克力' },
    category: 'other',
    calories: 546,
    nutrients: { protein: 4.9, carbs: 61, fat: 31 },
    beneficialFor: ['hypertension', 'cad'], // Flavanols
    harmfulFor: ['gerd', 'diabetes_t2'], // Caffeine, Sugar
    description: {
      en: 'Rich in flavanols (lowers BP). Choose >70% cocoa. Watch sugar content.',
      zh: '富含黄烷醇（降低血压）。选择可可含量>70%。注意糖含量。'
    }
  },
  {
    id: 'ginger',
    name: { en: 'Ginger', zh: '生姜' },
    category: 'other',
    calories: 80,
    nutrients: { protein: 1.8, carbs: 18, fat: 0.8 },
    beneficialFor: ['gerd', 'diabetes_t2', 'cad'], // Anti-nausea, anti-inflammatory
    harmfulFor: [],
    description: {
      en: 'Powerful anti-inflammatory. Aids digestion and nausea.',
      zh: '强效抗炎。有助于消化和恶心。'
    }
  },
  {
    id: 'turmeric',
    name: { en: 'Turmeric', zh: '姜黄' },
    category: 'other',
    calories: 312,
    nutrients: { protein: 8, carbs: 65, fat: 3 },
    beneficialFor: ['cad', 'diabetes_t2', 'fatty_liver_nafld'], // Curcumin
    harmfulFor: ['gallstones'], // Can stimulate bile
    description: {
      en: 'Active compound Curcumin is a potent anti-inflammatory. Can prevent fat accumulation.',
      zh: '活性化合物姜黄素是一种强效抗炎剂。可防止脂肪堆积。'
    }
  },
  {
    id: 'coffee',
    name: { en: 'Coffee', zh: '咖啡' },
    category: 'other',
    calories: 1,
    nutrients: { protein: 0.1, carbs: 0, fat: 0 },
    beneficialFor: ['gout', 'fatty_liver_nafld', 'diabetes_t2'],
    harmfulFor: ['hypertension', 'gerd'], // Caffeine spikes BP and acid
    description: {
      en: 'Protective for liver and gout. Caffeine raises BP and triggers reflux.',
      zh: '保护肝脏，对痛风有益。咖啡因会升高血压并诱发反流。'
    }
  },
  {
    id: 'green_tea',
    name: { en: 'Green Tea', zh: '绿茶' },
    category: 'other',
    calories: 1,
    nutrients: { protein: 0, carbs: 0, fat: 0 },
    beneficialFor: ['high_ldl', 'diabetes_t2', 'fatty_liver_nafld'],
    harmfulFor: ['gerd'], // Caffeine
    description: {
      en: 'Rich in EGCG catechin antioxidants. Boosts metabolism and liver health.',
      zh: '富含EGCG儿茶素抗氧化剂。促进新陈代谢和肝脏健康。'
    }
  }
];

export const getIngredients = () => INGREDIENTS_DB;