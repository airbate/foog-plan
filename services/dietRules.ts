import { HealthCategory, DietRule, ConditionId } from '../types';

// Full hierarchy with bilingual names
export const HEALTH_CATEGORIES: HealthCategory[] = [
  {
    id: 'A',
    name: 'A. Metabolic (代谢类)',
    groups: [
      {
        id: 'A1',
        name: 'A1 Diabetes (糖尿病)',
        conditions: [
          { id: 'diabetes_t1', name: 'Type 1 Diabetes (1型糖尿病)' },
          { id: 'diabetes_t2', name: 'Type 2 Diabetes (2型糖尿病)' },
          { id: 'diabetes_gestational', name: 'Gestational Diabetes (妊娠糖尿病)' },
          { id: 'prediabetes', name: 'Pre-diabetes/IGT (糖耐量受损)' },
        ]
      },
      {
        id: 'A2',
        name: 'A2 Metabolic Syndrome (代谢综合症)',
        conditions: [
          { id: 'metabolic_syndrome', name: 'Metabolic Syndrome' },
        ]
      },
      {
        id: 'A3',
        name: 'A3 Fatty Liver (脂肪肝)',
        conditions: [
          { id: 'fatty_liver_nafld', name: 'NAFLD (非酒精性脂肪肝)' },
          { id: 'fatty_liver_afld', name: 'AFLD (酒精性脂肪肝)' },
        ]
      }
    ]
  },
  {
    id: 'B',
    name: 'B. Cardiovascular (心血管类)',
    groups: [
      {
        id: 'B1',
        name: 'B1 Hypertension (高血压)',
        conditions: [
          { id: 'hypertension', name: 'Hypertension (高血压)' }
        ]
      },
      {
        id: 'B2',
        name: 'B2 Hyperlipidemia (高血脂)',
        conditions: [
          { id: 'high_ldl', name: 'High LDL Cholesterol (高胆固醇)' },
          { id: 'high_triglycerides', name: 'High Triglycerides (高甘油三酯)' }
        ]
      },
      {
        id: 'B3',
        name: 'B3 Heart Disease (心脏病)',
        conditions: [
          { id: 'cad', name: 'Coronary Artery Disease (冠心病)' },
          { id: 'heart_failure', name: 'Heart Failure (心力衰竭)' }
        ]
      }
    ]
  },
  {
    id: 'C',
    name: 'C. Kidney (肾脏类)',
    groups: [
      {
        id: 'C1',
        name: 'C1 Chronic Kidney Disease (CKD)',
        conditions: [
          { id: 'ckd_1_2', name: 'CKD Stage 1-2 (早期肾病)' },
          { id: 'ckd_3_5', name: 'CKD Stage 3-5 (中晚期肾病)' }
        ]
      },
      {
        id: 'C3',
        name: 'C3 Electrolyte Imbalance',
        conditions: [
          { id: 'hyperkalemia', name: 'Hyperkalemia (高钾血症)' },
          { id: 'hyperphosphatemia', name: 'Hyperphosphatemia (高磷血症)' }
        ]
      }
    ]
  },
  {
    id: 'D',
    name: 'D. Uric Acid / Gout (尿酸痛风类)',
    groups: [
      {
        id: 'D1',
        name: 'D1 Gout (痛风)',
        conditions: [
          { id: 'gout', name: 'Gout (痛风)' }
        ]
      },
      {
        id: 'D2',
        name: 'D2 Hyperuricemia (高尿酸)',
        conditions: [
          { id: 'hyperuricemia', name: 'Asymptomatic Hyperuricemia (无症状高尿酸)' }
        ]
      }
    ]
  },
  {
    id: 'E',
    name: 'E. Liver/Gallbladder/Pancreas (肝胆胰)',
    groups: [
      {
        id: 'E2',
        name: 'E2 Gallbladder (胆囊疾病)',
        conditions: [
          { id: 'gallstones', name: 'Gallstones/Cholecystitis (胆结石/胆囊炎)' }
        ]
      },
      {
        id: 'E3',
        name: 'E3 Pancreatitis (胰腺炎)',
        conditions: [
          { id: 'pancreatitis_chronic', name: 'Chronic Pancreatitis (慢性胰腺炎)' }
        ]
      }
    ]
  },
  {
    id: 'F',
    name: 'F. Gastrointestinal (胃肠道)',
    groups: [
      {
        id: 'F1',
        name: 'F1 Stomach (胃部)',
        conditions: [
          { id: 'gerd', name: 'GERD (胃食管反流)' },
          { id: 'gastritis', name: 'Gastritis (胃炎)' }
        ]
      },
      {
        id: 'F2',
        name: 'F2 Bowel (肠道)',
        conditions: [
          { id: 'ibs', name: 'IBS (肠易激综合症)' },
          { id: 'celiac', name: 'Celiac Disease (乳糜泻)' }
        ]
      }
    ]
  },
  {
    id: 'G',
    name: 'G. Allergies/Intolerances (过敏不耐受)',
    groups: [
      {
        id: 'G1',
        name: 'G1 Food Allergies',
        conditions: [
          { id: 'allergy_nut', name: 'Nut Allergy (坚果过敏)' },
          { id: 'allergy_seafood', name: 'Seafood Allergy (海鲜过敏)' }
        ]
      },
      {
        id: 'G2',
        name: 'G2 Intolerances',
        conditions: [
          { id: 'lactose_intolerance', name: 'Lactose Intolerance (乳糖不耐受)' }
        ]
      }
    ]
  },
  {
    id: 'H',
    name: 'H. Special Groups (特殊人群)',
    groups: [
      {
        id: 'H1',
        name: 'H1 Pregnancy',
        conditions: [
          { id: 'pregnancy', name: 'Pregnancy (孕妇)' }
        ]
      },
      {
        id: 'H2',
        name: 'H2 Children',
        conditions: [
          { id: 'toddler', name: 'Toddler 1-3y (幼儿)' }
        ]
      }
    ]
  },
  {
    id: 'I',
    name: 'I. Neurological (神经系统)',
    groups: [
      {
        id: 'I1',
        name: 'I1 Cognitive Health',
        conditions: [
          { id: 'alzheimers', name: "Alzheimer's Prevention/Care (阿尔茨海默病)" }
        ]
      }
    ]
  }
];

// Helper to flatten conditions for easier search/lookup
export const ALL_CONDITIONS = HEALTH_CATEGORIES.flatMap(c => c.groups.flatMap(g => g.conditions));

// Bilingual rules for cleaner UI display
export const DIET_RULES_MAP: Record<string, DietRule> = {
  // A. Metabolic
  'diabetes_t1': {
    id: 'diabetes_t1',
    name: 'Type 1 Diabetes (1型糖尿病)',
    avoid: ['Sugary soda (汽水)', 'Candy (糖果)', 'Juice (果汁)'],
    limit: ['Refined carbs (精制碳水)', 'Dried fruit (干果)'],
    recommend: ['Fiber-rich veggies (高纤蔬菜)', 'Lean protein (瘦肉)', 'Whole grains (全谷物)'],
    generalAdvice: 'Count carbohydrates precisely to match insulin dosage. (精确计算碳水，匹配胰岛素用量)'
  },
  'diabetes_t2': {
    id: 'diabetes_t2',
    name: 'Type 2 Diabetes (2型糖尿病)',
    avoid: ['White bread/rice (白米白面)', 'Sugary drinks (含糖饮料)', 'Trans fats (反式脂肪)'],
    limit: ['Tropical fruits (热带水果)', 'Red meat (红肉)', 'Alcohol (酒精)'],
    recommend: ['Leafy greens (叶菜)', 'Legumes (豆类)', 'Nuts (坚果)', 'Fatty fish (深海鱼)'],
    generalAdvice: 'Focus on low Glycemic Index (GI) foods and portion control. (关注低GI食物，控制分量)'
  },
  'diabetes_gestational': {
    id: 'diabetes_gestational',
    name: 'Gestational Diabetes (妊娠糖尿病)',
    avoid: ['Sweets (甜食)', 'Baked goods (烘焙)', 'Soda (苏打水)'],
    limit: ['Fruit-morning (晨间水果)', 'Starchy veg (淀粉类蔬菜)'],
    recommend: ['Protein with every meal (每餐蛋白)', 'Complex carbs (复合碳水)', 'Green veg (绿叶菜)'],
    generalAdvice: 'Distribute carbs evenly throughout the day to avoid spikes. (全天均匀分配碳水，避免血糖峰值)'
  },
  'prediabetes': {
    id: 'prediabetes',
    name: 'Pre-diabetes (糖耐量受损)',
    avoid: ['Sugary beverages (含糖饮料)', 'Processed snacks (加工零食)'],
    limit: ['Simple carbs (简单碳水)', 'Alcohol (酒)'],
    recommend: ['Whole foods (原型食物)', 'Fiber (纤维)', 'Water (水)'],
    generalAdvice: 'Reduce sugar and refined carbs to prevent progression to Type 2. (减少糖和精制碳水，预防发展为2型糖尿病)'
  },
  'metabolic_syndrome': {
    id: 'metabolic_syndrome',
    name: 'Metabolic Syndrome (代谢综合症)',
    avoid: ['HFCS (果葡糖浆)', 'Trans fats (反式脂肪)', 'Deep fried (油炸)'],
    limit: ['Sodium (钠)', 'Saturated fat (饱和脂肪)'],
    recommend: ['Mediterranean diet (地中海饮食)', 'Olive oil (橄榄油)', 'Avocado (牛油果)'],
    generalAdvice: 'Focus on weight management and reducing insulin resistance. (控制体重，改善胰岛素抵抗)'
  },
  'fatty_liver_nafld': {
    id: 'fatty_liver_nafld',
    name: 'NAFLD (非酒精性脂肪肝)',
    avoid: ['Added sugars (添加糖)', 'Fried foods (油炸)', 'Refined grains (精粮)'],
    limit: ['Red meat (红肉)', 'Saturated fats (饱和脂肪)'],
    recommend: ['Black Coffee (黑咖啡)', 'Cruciferous veg (十字花科)', 'Omega-3'],
    generalAdvice: 'Weight loss and avoiding fructose/sugar are critical. (减重和避免果糖/蔗糖至关重要)'
  },
  'fatty_liver_afld': {
    id: 'fatty_liver_afld',
    name: 'AFLD (酒精性脂肪肝)',
    avoid: ['ALCOHOL (Strictly/严格禁酒)', 'Greasy foods (油腻食物)'],
    limit: ['Sugar (糖)', 'Salt (盐)'],
    recommend: ['Leafy greens (叶菜)', 'Complex carbs (复合碳水)'],
    generalAdvice: 'Complete abstinence from alcohol is required for recovery. (必须完全戒酒以促进康复)'
  },

  // B. Cardiovascular
  'hypertension': {
    id: 'hypertension',
    name: 'Hypertension (高血压)',
    avoid: ['Pickles (腌制食品)', 'Canned soup (罐头汤)', 'Deli meats (加工肉)', 'Salty snacks (咸味零食)'],
    limit: ['Caffeine (咖啡因)', 'Alcohol (酒)', 'Cheese (奶酪)'],
    recommend: ['Bananas (香蕉)', 'Spinach (菠菜)', 'Beets (甜菜根)', 'Berries (浆果)'],
    generalAdvice: 'DASH Diet: Low sodium (<2300mg/day), high potassium. (DASH饮食：低钠，高钾)'
  },
  'high_ldl': {
    id: 'high_ldl',
    name: 'High LDL Cholesterol (高胆固醇)',
    avoid: ['Trans fats (反式脂肪)', 'Processed meats (加工肉)', 'Fast food (快餐)'],
    limit: ['Butter (黄油)', 'Red meat (红肉)', 'Full-fat dairy (全脂奶)'],
    recommend: ['Oatmeal (燕麦)', 'Nuts (坚果)', 'Olive oil (橄榄油)'],
    generalAdvice: 'Replace saturated fats with unsaturated fats. Increase soluble fiber. (用不饱和脂肪替代饱和脂肪，增加可溶性纤维)'
  },
  'high_triglycerides': {
    id: 'high_triglycerides',
    name: 'High Triglycerides (高甘油三酯)',
    avoid: ['Sugary drinks (甜饮料)', 'Alcohol (酒)', 'Refined flour (精面)'],
    limit: ['Fruit juice (果汁)', 'Honey/Syrup (蜂蜜/糖浆)'],
    recommend: ['Salmon (三文鱼)', 'Whole grains (全谷物)'],
    generalAdvice: 'Cut sugar and alcohol drastically. (大幅减少糖和酒精摄入)'
  },
  'cad': {
    id: 'cad',
    name: 'Coronary Artery Disease (冠心病)',
    avoid: ['Trans fats (反式脂肪)', 'Deep fried (油炸)', 'Processed meats (加工肉)'],
    limit: ['Red meat (红肉)', 'Egg yolks (蛋黄)', 'Salt (盐)'],
    recommend: ['Fruits/Veg (蔬果)', 'Whole grains (全谷)', 'Plant protein (植物蛋白)'],
    generalAdvice: 'Heart-healthy, low-inflammatory diet. (心脏健康，抗炎饮食)'
  },
  'heart_failure': {
    id: 'heart_failure',
    name: 'Heart Failure (心力衰竭)',
    avoid: ['Salt (盐)', 'MSG (味精)', 'Canned goods (罐头)'],
    limit: ['Fluid intake (液体摄入)', 'Alcohol (酒)'],
    recommend: ['Fresh herbs (香草)', 'Lean meats (瘦肉)'],
    generalAdvice: 'Strict sodium control (<2000mg) and fluid restriction are vital. (严格控制钠<2000mg和液体摄入至关重要)'
  },

  // C. Kidney
  'ckd_1_2': {
    id: 'ckd_1_2',
    name: 'CKD Stage 1-2 (早期肾病)',
    avoid: ['High sodium processed foods (高钠加工食品)'],
    limit: ['Animal protein (动物蛋白)', 'Salt (盐)'],
    recommend: ['Fresh produce (新鲜蔬果)', 'Plant proteins (植物蛋白)'],
    generalAdvice: 'Control BP and blood sugar. Moderate protein. (控制血压血糖，适量蛋白)'
  },
  'ckd_3_5': {
    id: 'ckd_3_5',
    name: 'CKD Stage 3-5 (中晚期肾病)',
    avoid: ['Star fruit (杨桃)', 'Canned foods (罐头)', 'Dark colas (深色可乐)'],
    limit: ['Protein (蛋白)', 'Potassium (钾)', 'Phosphorus (磷)'],
    recommend: ['Low-K veg (低钾蔬菜)', 'Egg whites (蛋白)', 'White rice (白米)'],
    generalAdvice: 'Strict control of electrolytes (K, P) and protein load. (严格控制电解质和蛋白负荷)'
  },
  'hyperkalemia': {
    id: 'hyperkalemia',
    name: 'Hyperkalemia (高钾血症)',
    avoid: ['Bananas (香蕉)', 'Potatoes-skin (带皮土豆)', 'Tomatoes (番茄)', 'Avocado (牛油果)'],
    limit: ['Oranges (橙子)', 'Spinach-raw (生菠菜)', 'Dairy (奶)'],
    recommend: ['Apples (苹果)', 'Berries (浆果)', 'Cabbage (卷心菜)', 'Rice (米饭)'],
    generalAdvice: 'Avoid high-potassium fruits/veg or leach them. (避免高钾蔬果或水煮去钾)'
  },

  // D. Gout
  'gout': {
    id: 'gout',
    name: 'Gout (痛风)',
    avoid: ['Organ meats (内脏)', 'Shellfish (贝类)', 'Beer (啤酒)', 'HFCS soda (果葡糖浆)'],
    limit: ['Red meat (红肉)', 'Oatmeal (燕麦)', 'Spinach (菠菜)', 'Asparagus (芦笋)'],
    recommend: ['Cherries (樱桃)', 'Vitamin C (维C)', 'Low-fat dairy (低脂奶)', 'Coffee (咖啡)'],
    generalAdvice: 'Low-purine diet. Stay hydrated. (低嘌呤饮食，多喝水)'
  },

  // F. GI
  'gerd': {
    id: 'gerd',
    name: 'GERD (胃食管反流)',
    avoid: ['Fried food (油炸)', 'Spicy (辛辣)', 'Citrus (柑橘)', 'Mint (薄荷)'],
    limit: ['Coffee (咖啡)', 'Chocolate (巧克力)', 'Carbonated (碳酸)'],
    recommend: ['Oatmeal (燕麦)', 'Ginger (姜)', 'Melon (瓜类)', 'Lean poultry (禽肉)'],
    generalAdvice: 'Avoid triggers. Small meals. Do not lie down after eating. (避免诱因，少食多餐，饭后勿躺)'
  },
  'ibs': {
    id: 'ibs',
    name: 'IBS (肠易激综合症)',
    avoid: ['High FODMAP (高发酵碳水)', 'Artificial sweeteners (代糖)'],
    limit: ['Beans (豆类)', 'Cruciferous (十字花科)', 'Lactose (乳糖)'],
    recommend: ['Low FODMAP', 'Soluble fiber (可溶纤维)', 'Peppermint (薄荷)'],
    generalAdvice: 'Identify triggers via elimination diet. (通过排除法寻找诱因)'
  },
  'celiac': {
    id: 'celiac',
    name: 'Celiac Disease (乳糜泻)',
    avoid: ['WHEAT (小麦)', 'BARLEY (大麦)', 'RYE (黑麦)', 'Malt (麦芽)'],
    limit: ['Cross-contaminated oats (污染燕麦)', 'Soy sauce (酱油)'],
    recommend: ['Rice (米)', 'Corn (玉米)', 'Quinoa (藜麦)', 'Potatoes (土豆)'],
    generalAdvice: 'Strict Gluten-Free diet is mandatory. (必须严格无麸质饮食)'
  },
  'lactose_intolerance': {
    id: 'lactose_intolerance',
    name: 'Lactose Intolerance (乳糖不耐受)',
    avoid: ['Milk (牛奶)', 'Ice cream (冰淇淋)', 'Soft cheese (软芝士)'],
    limit: ['Yogurt (酸奶)', 'Butter (黄油)', 'Hard cheese (硬芝士)'],
    recommend: ['Lactose-free milk (无乳糖奶)', 'Soy milk (豆奶)'],
    generalAdvice: 'Avoid lactose or use lactase enzyme. (避免乳糖或使用乳糖酶)'
  },
  
  // H. Special
  'pregnancy': {
    id: 'pregnancy',
    name: 'Pregnancy (孕妇)',
    avoid: ['Raw fish (生鱼)', 'Unpasteurized dairy (未杀菌奶)', 'High-mercury fish (高汞鱼)', 'Alcohol (酒)'],
    limit: ['Caffeine (咖啡因)', 'Processed junk (垃圾食品)'],
    recommend: ['Folic acid (叶酸)', 'Iron (铁)', 'Calcium (钙)', 'Protein (蛋白)'],
    generalAdvice: 'Focus on nutrient density. Food safety is paramount. (注重营养密度，食品安全第一)'
  },

  // I. Neurological
  'alzheimers': {
    id: 'alzheimers',
    name: "Alzheimer's Disease (阿尔茨海默病)",
    avoid: ['Processed meats (加工肉)', 'Added sugar (添加糖)', 'Refined carbs (精制碳水)'],
    limit: ['Red meat (红肉)', 'Butter/Margarine (黄油/人造黄油)', 'Cheese (奶酪)', 'Fried food (油炸)'],
    recommend: ['Leafy greens (叶菜)', 'Berries (浆果)', 'Nuts (坚果)', 'Fatty fish (深海鱼)', 'Olive oil (橄榄油)'],
    generalAdvice: 'Follow the MIND Diet: A hybrid of Mediterranean and DASH diets proven to support brain health. (遵循MIND饮食：结合地中海和DASH饮食，证实有助于脑部健康)'
  }
};

export const getDietRulesForConditions = (ids: ConditionId[]): string => {
  if (ids.length === 0) return 'No specific medical conditions provided. Follow general healthy eating guidelines.';
  
  return ids.map(id => {
    const rule = DIET_RULES_MAP[id];
    if (!rule) return '';
    return `
    Condition: ${rule.name}
    - STRICTLY AVOID: ${rule.avoid.join(', ')}
    - LIMIT: ${rule.limit.join(', ')}
    - BENEFICIAL: ${rule.recommend.join(', ')}
    - CLINICAL ADVICE: ${rule.generalAdvice}
    `;
  }).join('\n');
};