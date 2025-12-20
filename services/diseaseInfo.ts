
import { DiseaseInfo } from '../types';

export const DISEASE_INFO_DB: Record<string, DiseaseInfo> = {
  // A. Metabolic
  'diabetes_t1': {
    id: 'diabetes_t1',
    overview: {
      en: "Type 1 Diabetes is an autoimmune condition where the pancreas produces little or no insulin. It is not caused by diet or lifestyle.",
      zh: "1型糖尿病是一种自身免疫性疾病，胰腺产生很少或不产生胰岛素。它不是由饮食或生活方式引起的。"
    },
    severity: {
      en: "Requires lifelong insulin therapy. Without insulin, life-threatening ketoacidosis (DKA) can occur quickly.",
      zh: "需要终身胰岛素治疗。如果没有胰岛素，可能很快发生危及生命的酮症酸中毒（DKA）。"
    },
    dietaryHabits: {
      en: "Carbohydrate counting is essential to match insulin doses. Consistency in meal timing helps prevent hypoglycemia.",
      zh: "碳水化合物计数对于匹配胰岛素剂量至关重要。规律的进餐时间有助于预防低血糖。"
    },
    advice: {
      en: "Monitor blood sugar frequently. Carry fast-acting glucose for lows. Balance insulin with food and activity.",
      zh: "频繁监测血糖。随身携带速效葡萄糖以防低血糖。平衡胰岛素、食物和运动。"
    }
  },
  'diabetes_t2': {
    id: 'diabetes_t2',
    overview: {
      en: "Type 2 Diabetes develops slowly over years. It begins with insulin resistance where cells fail to respond to insulin effectively. Eventually, the pancreas cannot keep up, leading to high blood sugar. Risk factors include obesity, age, and inactivity.",
      zh: "2型糖尿病通常历经数年缓慢发展。始于胰岛素抵抗，即细胞无法有效响应胰岛素。最终胰腺无法分泌足够胰岛素，导致高血糖。风险因素包括肥胖、年龄和缺乏运动。"
    },
    severity: {
      en: "Uncontrolled levels lead to serious complications: nerve damage (neuropathy), kidney failure (nephropathy), vision loss (retinopathy), and increased risk of heart attack or stroke.",
      zh: "血糖控制不佳会导致严重并发症：神经损伤（神经病变）、肾衰竭（肾病）、视力丧失（视网膜病变）以及心脏病发作或中风风险增加。"
    },
    dietaryHabits: {
      en: "Consistently monitor carbohydrate intake. Focus on low Glycemic Index (GI) foods. Avoid skipping meals to prevent blood sugar fluctuations. Practice strict portion control.",
      zh: "持续监测碳水化合物摄入量。专注于低升糖指数（GI）食物。避免不吃正餐以防血糖波动。实行严格的分量控制。"
    },
    advice: {
      en: "Aim for 150 minutes of moderate activity per week. Monitor blood sugar regularly. Check feet daily for cuts or sores. Maintain a healthy weight.",
      zh: "每周进行至少150分钟的中等强度运动。定期监测血糖。每天检查足部是否有伤口。保持健康体重。"
    }
  },
  'diabetes_gestational': {
    id: 'diabetes_gestational',
    overview: {
      en: "Gestational diabetes occurs during pregnancy when hormonal changes cause insulin resistance. It usually resolves after birth but increases Type 2 risk later.",
      zh: "妊娠糖尿病发生在怀孕期间，激素变化导致胰岛素抵抗。通常在分娩后消失，但会增加日后患2型糖尿病的风险。"
    },
    severity: {
      en: "Can cause high birth weight (macrosomia), preterm birth, and respiratory issues for the baby, plus preeclampsia for the mother.",
      zh: "可能导致巨大儿、早产和婴儿呼吸问题，以及母亲的先兆子痫。"
    },
    dietaryHabits: {
      en: "Distribute carbohydrates evenly across 3 meals and 2-3 snacks to avoid spikes. Pair carbs with protein/fat.",
      zh: "将碳水化合物均匀分配到3顿正餐和2-3顿加餐中，以避免血糖峰值。将碳水与蛋白质/脂肪搭配食用。"
    },
    advice: {
      en: "Monitor blood sugar 4 times daily (fasting and post-meals). Moderate exercise (walking) after meals helps lower blood sugar.",
      zh: "每天监测4次血糖（空腹和饭后）。饭后适度运动（散步）有助于降低血糖。"
    }
  },
  'prediabetes': {
    id: 'prediabetes',
    overview: {
      en: "Blood sugar levels are higher than normal but not yet high enough for a diabetes diagnosis. It is a critical warning sign.",
      zh: "血糖水平高于正常值，但尚未达到糖尿病的诊断标准。这是一个关键的警示信号。"
    },
    severity: {
      en: "Without intervention, many people with prediabetes develop Type 2 diabetes within 5 years. It also increases heart disease risk.",
      zh: "如果不加干预，许多前驱糖尿病患者会在5年内发展为2型糖尿病。它也会增加心脏病风险。"
    },
    dietaryHabits: {
      en: "Focus on weight loss and reducing simple sugars. Swap white rice/bread for whole grains. Fill half your plate with vegetables.",
      zh: "专注于减肥和减少单糖摄入。将白米/白面包换成全谷物。盘子的一半应为蔬菜。"
    },
    advice: {
      en: "Losing just 5-7% of body weight can prevent or delay diabetes. Exercise 30 minutes a day, 5 days a week.",
      zh: "只需减轻5-7%的体重即可预防或延缓糖尿病。每周5天，每天运动30分钟。"
    }
  },
  'metabolic_syndrome': {
    id: 'metabolic_syndrome',
    overview: {
      en: "A cluster of conditions occurring together: high blood pressure, high blood sugar, excess body fat around the waist, and abnormal cholesterol levels.",
      zh: "一组同时发生的病症：高血压、高血糖、腰部脂肪堆积和胆固醇水平异常。"
    },
    severity: {
      en: "Increases risk of heart disease, stroke, and diabetes. It indicates underlying insulin resistance and inflammation.",
      zh: "增加心脏病、中风和糖尿病的风险。它表明潜在的胰岛素抵抗和炎症。"
    },
    dietaryHabits: {
      en: "Adopt a Mediterranean diet. Focus on plant-based foods, healthy fats (olive oil), and high fiber.",
      zh: "采取地中海饮食。专注于植物性食物、健康脂肪（橄榄油）和高纤维。"
    },
    advice: {
      en: "Waist circumference is a key metric (>40in men, >35in women). Prioritize sleep and stress reduction.",
      zh: "腰围是一个关键指标（男性>40英寸，女性>35英寸）。优先考虑睡眠和减压。"
    }
  },

  // B. Cardiovascular
  'hypertension': {
    id: 'hypertension',
    overview: {
      en: "Known as the 'Silent Killer', hypertension often has no symptoms while developing over decades. It causes arteries to stiffen and narrow, forcing the heart to work harder.",
      zh: "高血压被称为“沉默的杀手”，通常在数十年间发展而无明显症状。它导致动脉硬化和狭窄，迫使心脏负荷加重。"
    },
    severity: {
      en: "Untreated high blood pressure significantly increases the risk of heart failure, aneurysm, kidney disease, and stroke. Crisis levels (>180/120) require immediate emergency care.",
      zh: "未治疗的高血压会显著增加心力衰竭、动脉瘤、肾病和中风的风险。高血压危象（>180/120）需要立即急救。"
    },
    dietaryHabits: {
      en: "Adhere to the DASH diet (Dietary Approaches to Stop Hypertension). Drastically reduce sodium intake (<2,300mg/day). Increase potassium, calcium, and magnesium intake via whole foods.",
      zh: "坚持DASH饮食（停止高血压的饮食方法）。大幅减少钠摄入（每天<2300毫克）。通过天然食物增加钾、钙和镁的摄入。"
    },
    advice: {
      en: "Manage stress through breathing or meditation. Limit alcohol consumption. Quit smoking immediately, as it hardens arteries.",
      zh: "通过呼吸或冥想管理压力。限制酒精摄入。立即戒烟，因为吸烟会加速动脉硬化。"
    }
  },
  'high_ldl': {
    id: 'high_ldl',
    overview: {
      en: "LDL (Low-Density Lipoprotein) is 'bad' cholesterol. Excess LDL accumulates in artery walls, forming plaques (atherosclerosis).",
      zh: "LDL（低密度脂蛋白）是“坏”胆固醇。过量的LDL会在动脉壁积聚，形成斑块（动脉粥样硬化）。"
    },
    severity: {
      en: "Plaque buildup narrows arteries, reducing blood flow. If a plaque ruptures, it causes a blood clot that can trigger a heart attack or stroke.",
      zh: "斑块积聚使动脉变窄，减少血流。如果斑块破裂，会导致血栓，从而引发心脏病发作或中风。"
    },
    dietaryHabits: {
      en: "Reduce saturated fats (red meat, full-fat dairy). Eliminate trans fats. Increase soluble fiber (oats, beans) which binds to cholesterol.",
      zh: "减少饱和脂肪（红肉、全脂奶）。消除反式脂肪。增加可溶性纤维（燕麦、豆类），有助于结合胆固醇。"
    },
    advice: {
      en: "Aerobic exercise helps raise HDL (good) cholesterol. Weight loss and quitting smoking are crucial.",
      zh: "有氧运动有助于提高HDL（好）胆固醇。减肥和戒烟至关重要。"
    }
  },
  'high_triglycerides': {
    id: 'high_triglycerides',
    overview: {
      en: "Triglycerides are a type of fat (lipid) found in your blood. High levels often accompany high blood sugar and low HDL.",
      zh: "甘油三酯是血液中的一种脂肪（脂质）。高水平通常伴随着高血糖和低HDL。"
    },
    severity: {
      en: "Very high levels can cause acute pancreatitis. Contributes to hardening of arteries and heart disease.",
      zh: "极高水平会导致急性胰腺炎。促使动脉硬化和心脏病。"
    },
    dietaryHabits: {
      en: "Avoid sugary foods and refined carbohydrates. Limit alcohol strictly as it rapidly spikes triglycerides.",
      zh: "避免含糖食物和精制碳水化合物。严格限制酒精，因为它会迅速升高甘油三酯。"
    },
    advice: {
      en: "Lose weight if needed. Eat fatty fish (omega-3) twice a week.",
      zh: "如果需要，请减肥。每周吃两次富含脂肪的鱼（omega-3）。"
    }
  },
  'cad': {
    id: 'cad',
    overview: {
      en: "Coronary Artery Disease occurs when the major blood vessels supplying the heart become damaged or diseased, usually by plaque buildup.",
      zh: "冠状动脉疾病发生在供应心脏的主要血管受到损伤或病变时，通常由斑块积聚引起。"
    },
    severity: {
      en: "The leading cause of death worldwide. Can lead to angina (chest pain), shortness of breath, and heart attack.",
      zh: "全球主要死因。可导致心绞痛（胸痛）、呼吸急促和心脏病发作。"
    },
    dietaryHabits: {
      en: "Adopt a Mediterranean-style diet rich in healthy fats (olive oil, nuts), fish, and vegetables. Low sodium and low sugar.",
      zh: "采取地中海式饮食，富含健康脂肪（橄榄油、坚果）、鱼类和蔬菜。低钠低糖。"
    },
    advice: {
      en: "Strict adherence to medications. Cardiac rehabilitation programs are highly recommended after events.",
      zh: "严格遵医嘱服药。发生心脏事件后强烈建议参加心脏康复计划。"
    }
  },
  'heart_failure': {
    id: 'heart_failure',
    overview: {
      en: "The heart is too weak or stiff to pump blood effectively to meet the body's needs. It is a chronic, progressive condition.",
      zh: "心脏太弱或太僵硬，无法有效地泵血以满足身体需求。这是一种慢性、进行性疾病。"
    },
    severity: {
      en: "Fluid builds up in lungs (congestion) and legs. Can be life-limiting. Sudden weight gain indicates fluid retention.",
      zh: "液体在肺部（充血）和腿部积聚。可能危及生命。体重突然增加表明体液潴留。"
    },
    dietaryHabits: {
      en: "Sodium restriction is critical (<2,000mg). Often requires fluid restriction (e.g., 1.5-2L/day).",
      zh: "限制钠摄入至关重要（<2000mg）。通常需要限制液体摄入（如每天1.5-2升）。"
    },
    advice: {
      en: "Weigh yourself daily to track fluid retention. Elevate legs if swollen. Pace your activities to manage fatigue.",
      zh: "每天称重以监测体液潴留。如果肿胀，抬高腿部。调整活动节奏以管理疲劳。"
    }
  },

  // C. Kidney
  'ckd_1_2': {
    id: 'ckd_1_2',
    overview: {
      en: "Early stage Chronic Kidney Disease. Mild kidney damage with normal or slightly reduced function (GFR > 60). Often asymptomatic.",
      zh: "早期慢性肾病。轻度肾损伤，功能正常或轻微下降（GFR > 60）。通常无症状。"
    },
    severity: {
      en: "Goal is to prevent progression. With care, kidneys can function well for a lifetime.",
      zh: "目标是预防进展。通过护理，肾脏可以终生良好运作。"
    },
    dietaryHabits: {
      en: "Manage blood pressure and blood sugar strictly. Moderate protein intake (don't overload). Restrict salt.",
      zh: "严格管理血压和血糖。适度摄入蛋白质（不要过量）。限制盐分。"
    },
    advice: {
      en: "Annual testing of urine (albumin) and blood (creatinine). Stay hydrated unless restricted.",
      zh: "每年进行尿液（白蛋白）和血液（肌酐）检测。除非受限，否则保持水分充足。"
    }
  },
  'ckd_3_5': {
    id: 'ckd_3_5',
    overview: {
      en: "Chronic Kidney Disease is the gradual loss of kidney function. Stages 3-5 indicate moderate to severe damage where kidneys struggle to filter waste and fluid.",
      zh: "慢性肾病是肾功能的逐渐丧失。3-5期表明中度至重度损伤，肾脏难以过滤废物和液体。"
    },
    severity: {
      en: "Advanced stages lead to toxin buildup (uremia), dangerous electrolyte imbalances, fluid retention, and need for dialysis or transplant.",
      zh: "晚期导致毒素积聚（尿毒症）、危险的电解质失衡、体液潴留，并需要透析或移植。"
    },
    dietaryHabits: {
      en: "Diet is complex and stage-dependent. Generally restricts protein, sodium, potassium (oranges, potatoes), and phosphorus (dairy, nuts).",
      zh: "饮食复杂且取决于分期。通常限制蛋白质、钠、钾（橙子、土豆）和磷（乳制品、坚果）。"
    },
    advice: {
      en: "Avoid NSAIDs (like ibuprofen). Control blood pressure strictly. Work with a renal dietitian for precise nutrient limits.",
      zh: "避免服用非甾体抗炎药（如布洛芬）。严格控制血压。与肾脏营养师合作制定精确的营养限制。"
    }
  },
  'hyperkalemia': {
    id: 'hyperkalemia',
    overview: {
      en: "High potassium levels in the blood. Common in kidney disease as kidneys fail to excrete excess potassium.",
      zh: "血液中钾含量过高。常见于肾病，因为肾脏无法排出多余的钾。"
    },
    severity: {
      en: "Dangerous because it can cause life-threatening heart arrhythmias or sudden cardiac arrest with few warning signs.",
      zh: "非常危险，因为它可能在几乎没有预警的情况下导致危及生命的心律失常或心脏骤停。"
    },
    dietaryHabits: {
      en: "Avoid high-potassium foods: bananas, potatoes, tomatoes, avocados, citrus. Leach vegetables by boiling them.",
      zh: "避免高钾食物：香蕉、土豆、番茄、牛油果、柑橘。通过煮沸去除蔬菜中的钾。"
    },
    advice: {
      en: "Check food labels for potassium chloride (salt substitute). Stick to prescribed diet strictly.",
      zh: "检查食品标签中是否有氯化钾（代盐）。严格遵守处方饮食。"
    }
  },
  'hyperphosphatemia': {
    id: 'hyperphosphatemia',
    overview: {
      en: "High levels of phosphorus in the blood, common in later stages of CKD.",
      zh: "血液中磷含量过高，常见于慢性肾病晚期。"
    },
    severity: {
      en: "Causes calcium to be pulled from bones, making them weak. Leads to calcification of blood vessels and heart issues.",
      zh: "导致钙从骨骼中流失，使其变弱。导致血管钙化和心脏问题。"
    },
    dietaryHabits: {
      en: "Limit dairy, nuts, seeds, beans, and processed foods with phosphate additives (look for 'phos' on labels).",
      zh: "限制乳制品、坚果、种子、豆类以及含有磷酸盐添加剂的加工食品（查看标签上的“磷”）。"
    },
    advice: {
      en: "Take phosphate binders with meals if prescribed. Avoid dark colas.",
      zh: "如果开了处方，请随餐服用磷结合剂。避免深色可乐。"
    }
  },

  // D. Gout
  'gout': {
    id: 'gout',
    overview: {
      en: "Gout is a form of inflammatory arthritis caused by excess uric acid forming sharp crystals in joints. Attacks often occur suddenly, typically at night, starting with the big toe.",
      zh: "痛风是一种炎症性关节炎，由过量的尿酸在关节中形成尖锐结晶引起。发作通常突然发生，多在夜间，常始于大脚趾。"
    },
    severity: {
      en: "Frequent flares can cause permanent joint damage and deformity (tophi). High uric acid also risks kidney stones and kidney disease.",
      zh: "频繁发作会导致永久性关节损伤和畸形（痛风石）。高尿酸还带来肾结石和肾病的风险。"
    },
    dietaryHabits: {
      en: "Follow a Low-Purine diet. Avoid organ meats, certain seafood, and sugary sodas. Tart cherry juice may help reduce flares. Stay strictly hydrated.",
      zh: "遵循低嘌呤饮食。避免内脏、特定海鲜和含糖苏打水。酸樱桃汁可能有助于减少发作。严格保持水分充足。"
    },
    advice: {
      en: "Drink plenty of water (8-12 cups/day) to flush uric acid. Avoid rapid weight loss as it can trigger attacks. Limit alcohol, especially beer.",
      zh: "每天喝大量水（8-12杯）以排出尿酸。避免快速减肥，因为这可能诱发发作。限制酒精，尤其是啤酒。"
    }
  },
  'hyperuricemia': {
    id: 'hyperuricemia',
    overview: {
      en: "High uric acid in the blood without symptoms (yet). It is the precursor to gout.",
      zh: "血液中尿酸过高但（暂）无症状。它是痛风的前兆。"
    },
    severity: {
      en: "Increases risk of developing gout, kidney stones, and is linked to hypertension and cardiovascular disease.",
      zh: "增加患痛风、肾结石的风险，并与高血压和心血管疾病有关。"
    },
    dietaryHabits: {
      en: "Reduce intake of purine-rich foods (red meat, shellfish). Avoid High Fructose Corn Syrup.",
      zh: "减少富含嘌呤食物（红肉、贝类）的摄入。避免高果葡糖浆。"
    },
    advice: {
      en: "Hydration is the simplest and most effective treatment. Limit alcohol.",
      zh: "补充水分是最简单有效的治疗方法。限制酒精。"
    }
  },

  // E. Liver
  'fatty_liver_nafld': {
    id: 'fatty_liver_nafld',
    overview: {
      en: "Non-Alcoholic Fatty Liver Disease involves fat buildup in the liver not caused by alcohol. It is closely linked to metabolic syndrome, obesity, and diabetes.",
      zh: "非酒精性脂肪肝病是指肝脏内脂肪堆积，非酒精引起。它与代谢综合征、肥胖和糖尿病密切相关。"
    },
    severity: {
      en: "Can progress to NASH (inflammation), fibrosis, cirrhosis (permanent scarring), and eventually liver failure or cancer.",
      zh: "可能发展为NASH（炎症）、纤维化、肝硬化（永久性疤痕），最终导致肝衰竭或癌症。"
    },
    dietaryHabits: {
      en: "Eliminate high-fructose corn syrup and added sugars. The liver turns fructose directly into fat. Intermittent fasting can be beneficial.",
      zh: "消除高果葡糖浆和添加糖。肝脏会将果糖直接转化为脂肪。间歇性禁食可能有益。"
    },
    advice: {
      en: "Gradual weight loss (7-10% of body weight) helps reverse fat buildup. Prioritize strength training to improve insulin sensitivity.",
      zh: "逐渐减轻体重（体重的7-10%）有助于逆转脂肪堆积。优先进行力量训练以提高胰岛素敏感性。"
    }
  },
  'fatty_liver_afld': {
    id: 'fatty_liver_afld',
    overview: {
      en: "Alcoholic Fatty Liver Disease is the earliest stage of alcohol-related liver disease. It occurs when the liver breaks down alcohol, generating toxic substances.",
      zh: "酒精性脂肪肝是酒精相关肝病的早期阶段。它发生在肝脏分解酒精产生有毒物质时。"
    },
    severity: {
      en: "Reversible if alcohol is stopped. If drinking continues, it leads to alcoholic hepatitis and cirrhosis.",
      zh: "如果停止饮酒，是可逆的。如果继续饮酒，会导致酒精性肝炎和肝硬化。"
    },
    dietaryHabits: {
      en: "Strict abstinence from alcohol. High protein diet to aid liver regeneration.",
      zh: "严格戒酒。高蛋白饮食有助于肝脏再生。"
    },
    advice: {
      en: "Supplements like Vitamin B1 (Thiamine) are often needed. Seek support for cessation.",
      zh: "通常需要补充维生素B1（硫胺素）。寻求戒酒支持。"
    }
  },
  'gallstones': {
    id: 'gallstones',
    overview: {
      en: "Hardened deposits of digestive fluid (bile) that can form in your gallbladder.",
      zh: "消化液（胆汁）硬化形成的沉积物，可能在胆囊中形成。"
    },
    severity: {
      en: "Can block bile ducts causing intense pain (biliary colic), infection, or pancreatitis.",
      zh: "可能阻塞胆管，引起剧烈疼痛（胆绞痛）、感染或胰腺炎。"
    },
    dietaryHabits: {
      en: "Eat a low-fat, high-fiber diet. Avoid rapid weight loss. Avoid fatty/fried meals which trigger contractions.",
      zh: "采取低脂、高纤维饮食。避免快速减肥。避免高脂/油炸餐，这会诱发收缩。"
    },
    advice: {
      en: "Eat smaller, more frequent meals. Healthy fats like olive oil in moderation are okay.",
      zh: "少食多餐。适量食用橄榄油等健康脂肪是可以的。"
    }
  },
  'pancreatitis_chronic': {
    id: 'pancreatitis_chronic',
    overview: {
      en: "Long-standing inflammation of the pancreas that alters the organ's normal structure and functions.",
      zh: "胰腺的长期炎症，改变了器官的正常结构和功能。"
    },
    severity: {
      en: "Leads to permanent damage, loss of digestive enzymes (malabsorption), and diabetes.",
      zh: "导致永久性损伤、消化酶缺失（吸收不良）和糖尿病。"
    },
    dietaryHabits: {
      en: "Very low-fat diet (<50g/day). Small, frequent meals. Avoid alcohol and smoking entirely.",
      zh: "极低脂饮食（<50克/天）。少食多餐。完全避免酒精和吸烟。"
    },
    advice: {
      en: "May require pancreatic enzyme replacement therapy (PERT) with meals. Stay hydrated.",
      zh: "可能需要随餐进行胰酶替代疗法（PERT）。保持水分充足。"
    }
  },

  // F. GI
  'gerd': {
    id: 'gerd',
    overview: {
      en: "Gastroesophageal Reflux Disease is chronic acid reflux where stomach acid flows back into the esophagus, irritating the lining.",
      zh: "胃食管反流病是慢性酸反流，胃酸回流到食管，刺激食管壁。"
    },
    severity: {
      en: "Chronic inflammation can lead to esophageal narrowing, ulcers, or Barrett's esophagus (a precancerous condition).",
      zh: "慢性炎症可能导致食管狭窄、溃疡或巴雷特食管（一种癌前病变）。"
    },
    dietaryHabits: {
      en: "Identify and avoid trigger foods (spicy, fatty, caffeine, chocolate, mint). Eat smaller, more frequent meals.",
      zh: "识别并避免诱发食物（辛辣、高脂、咖啡因、巧克力、薄荷）。少食多餐。"
    },
    advice: {
      en: "Do not eat within 3 hours of bedtime. Elevate the head of your bed. Losing weight can significantly reduce pressure on the stomach.",
      zh: "睡前3小时内不要进食。抬高床头。减肥可以显著减少对胃的压力。"
    }
  },
  'gastritis': {
    id: 'gastritis',
    overview: {
      en: "Inflammation of the protective lining of the stomach.",
      zh: "胃部保护性内膜的炎症。"
    },
    severity: {
      en: "Can lead to ulcers and increased risk of stomach cancer if untreated (especially if H. pylori related).",
      zh: "如果不治疗（特别是与幽门螺杆菌相关时），可能导致溃疡并增加胃癌风险。"
    },
    dietaryHabits: {
      en: "Avoid irritants: alcohol, caffeine, spicy foods, acidic foods (citrus/tomato). Eat bland, cooked foods.",
      zh: "避免刺激物：酒精、咖啡因、辛辣食物、酸性食物（柑橘/番茄）。吃清淡、煮熟的食物。"
    },
    advice: {
      en: "Manage stress. Avoid NSAID pain relievers. Probiotics may help.",
      zh: "管理压力。避免服用非甾体抗炎止痛药。益生菌可能有帮助。"
    }
  },
  'ibs': {
    id: 'ibs',
    overview: {
      en: "Irritable Bowel Syndrome is a functional disorder affecting the large intestine. It involves cramping, abdominal pain, bloating, gas, and diarrhea or constipation.",
      zh: "肠易激综合征是一种影响大肠的功能性障碍。症状包括痉挛、腹痛、腹胀、胀气以及腹泻或便秘。"
    },
    severity: {
      en: "While painful and disruptive to quality of life, IBS does not cause changes in bowel tissue or increase colorectal cancer risk.",
      zh: "虽然痛苦并影响生活质量，但IBS不会导致肠道组织改变或增加结直肠癌风险。"
    },
    dietaryHabits: {
      en: "The Low FODMAP diet is the gold standard for management. Avoid high-fermentation foods like onions, garlic, wheat, and certain fruits temporarily.",
      zh: "低FODMAP饮食是管理的金标准。暂时避免高发酵食物，如洋葱、大蒜、小麦和某些水果。"
    },
    advice: {
      en: "Keep a symptom diary. Stress management is key as the gut-brain axis plays a major role.",
      zh: "记症状日记。压力管理至关重要，因为肠-脑轴起着主要作用。"
    }
  },
  'celiac': {
    id: 'celiac',
    overview: {
      en: "An autoimmune disorder where ingesting gluten leads to damage in the small intestine. It is not an allergy, but a genetic condition.",
      zh: "一种自身免疫性疾病，摄入麸质会导致小肠损伤。这不是过敏，而是一种遗传性疾病。"
    },
    severity: {
      en: "Damage to intestinal villi prevents nutrient absorption, leading to malnutrition, anemia, osteoporosis, and neurological issues.",
      zh: "肠绒毛损伤阻碍营养吸收，导致营养不良、贫血、骨质疏松和神经系统问题。"
    },
    dietaryHabits: {
      en: "Strict, lifelong avoidance of all gluten (wheat, barley, rye). Even microscopic amounts (crumbs) can cause damage.",
      zh: "终身严格避免所有麸质（小麦、大麦、黑麦）。即使是微量（面包屑）也会造成损伤。"
    },
    advice: {
      en: "Watch for hidden gluten in sauces, medications, and lip balms. Use separate cookware to avoid cross-contamination.",
      zh: "注意酱汁、药物和润唇膏中的隐形麸质。使用单独的炊具以避免交叉污染。"
    }
  },

  // G. Allergies
  'allergy_nut': {
    id: 'allergy_nut',
    overview: {
      en: "Immune system reaction to tree nuts (almonds, walnuts, cashews, etc.) or peanuts.",
      zh: "免疫系统对树坚果（杏仁、核桃、腰果等）或花生的反应。"
    },
    severity: {
      en: "Can range from mild itching to anaphylaxis, a potentially life-threatening reaction causing breathing difficulties and shock.",
      zh: "范围从轻微瘙痒到过敏性休克，这是一种可能危及生命的反应，会导致呼吸困难和休克。"
    },
    dietaryHabits: {
      en: "Strict avoidance. Read labels for 'May contain traces'. Be wary of cross-contamination in bakeries and Asian cuisine.",
      zh: "严格避免。阅读标签上的“可能含有微量”。警惕面包店和亚洲菜肴中的交叉污染。"
    },
    advice: {
      en: "Carry an EpiPen at all times. Teach friends/family how to use it.",
      zh: "随身携带EpiPen。教朋友/家人如何使用。"
    }
  },
  'allergy_seafood': {
    id: 'allergy_seafood',
    overview: {
      en: "Allergy to fish (tuna, salmon) or shellfish (shrimp, lobster, crab). These are distinct allergies but often grouped.",
      zh: "对鱼类（金枪鱼、三文鱼）或贝类（虾、龙虾、蟹）过敏。这些是不同的过敏，但通常被归为一类。"
    },
    severity: {
      en: "A common cause of anaphylaxis in adults. Unlike childhood allergies, it is rarely outgrown.",
      zh: "成人过敏性休克的常见原因。与儿童过敏不同，它很少会随年龄增长而消失。"
    },
    dietaryHabits: {
      en: "Avoid all seafood types you react to. Watch for fish sauce in Asian dishes and Caesar salad dressing.",
      zh: "避免所有引起反应的海鲜。注意亚洲菜肴中的鱼露和凯撒沙拉酱。"
    },
    advice: {
      en: "Be careful with frying oil in restaurants (cross-contamination). Carry emergency medication.",
      zh: "小心餐馆的油炸用油（交叉污染）。携带急救药物。"
    }
  },
  'lactose_intolerance': {
    id: 'lactose_intolerance',
    overview: {
      en: "Inability to digest lactose, the sugar found in milk, due to a deficiency of the enzyme lactase.",
      zh: "由于缺乏乳糖酶，无法消化牛奶中的糖分——乳糖。"
    },
    severity: {
      en: "Causes uncomfortable digestive symptoms (bloating, gas, diarrhea) but is not dangerous or damaging to the gut.",
      zh: "引起不适的消化症状（腹胀、胀气、腹泻），但不危险，也不会损伤肠道。"
    },
    dietaryHabits: {
      en: "Use lactose-free dairy milk or plant milks. Aged cheeses and yogurt are often tolerated due to lower lactose.",
      zh: "使用无乳糖牛奶或植物奶。陈年奶酪和酸奶因乳糖含量较低，通常可以耐受。"
    },
    advice: {
      en: "Lactase enzyme supplements can be taken before eating dairy.",
      zh: "在食用乳制品前可以服用乳糖酶补充剂。"
    }
  },

  // H. Special
  'pregnancy': {
    id: 'pregnancy',
    overview: {
      en: "Nutritional needs increase significantly to support fetal growth and maternal health. Immune system changes make food safety critical.",
      zh: "为了支持胎儿生长和母体健康，营养需求显著增加。免疫系统变化使得食品安全至关重要。"
    },
    severity: {
      en: "Deficiencies can lead to birth defects or developmental delays. Foodborne illnesses (Listeria, Salmonella) can cause miscarriage.",
      zh: "营养缺乏可能导致出生缺陷或发育迟缓。食源性疾病（李斯特菌、沙门氏菌）可能导致流产。"
    },
    dietaryHabits: {
      en: "Increase Folate, Iron, Calcium, and DHA. Avoid raw meat/fish, unpasteurized dairy, and high-mercury fish.",
      zh: "增加叶酸、铁、钙和DHA的摄入。避免生肉/鱼、未杀菌的乳制品和高汞鱼类。"
    },
    advice: {
      en: "Take prenatal vitamins. Stay hydrated. Eat small, frequent meals to manage nausea and heartburn.",
      zh: "服用产前维生素。保持水分充足。少食多餐以控制恶心和胃灼热。"
    }
  },
  'toddler': {
    id: 'toddler',
    overview: {
      en: "Rapid growth phase (ages 1-3) requiring high nutrient density. Picky eating is common.",
      zh: "快速生长阶段（1-3岁），需要高营养密度。挑食很常见。"
    },
    severity: {
      en: "Choking hazards are a major risk. Iron deficiency anemia is common if milk intake displaces solid food.",
      zh: "窒息是一个主要风险。如果牛奶摄入取代了固体食物，缺铁性贫血很常见。"
    },
    dietaryHabits: {
      en: "Offer a variety of textures and colors. Avoid added sugars and excess salt. Cut round foods (grapes, hot dogs) to prevent choking.",
      zh: "提供多种质地和颜色。避免添加糖和过量的盐。切开圆形食物（葡萄、热狗）以防窒息。"
    },
    advice: {
      en: "Limit milk to 2-3 cups/day. Do not force feed; keep mealtimes positive.",
      zh: "限制牛奶每天2-3杯。不要强迫喂食；保持进餐时间愉快。"
    }
  },

  // I. Neurological
  'alzheimers': {
    id: 'alzheimers',
    overview: {
      en: "Alzheimer's is a progressive neurodegenerative disorder that destroys memory and other important mental functions. It is the most common cause of dementia. Beta-amyloid plaques and tau tangles build up in the brain, killing nerve cells.",
      zh: "阿尔茨海默病是一种进行性神经退行性疾病，会破坏记忆和其他重要的心理功能。它是痴呆症最常见的原因。β-淀粉样斑块和tau蛋白缠结在脑中积聚，杀死神经细胞。"
    },
    severity: {
      en: "Starts with mild memory loss and progresses to loss of ability to carry on a conversation and respond to the environment. Eventually requires full-time care.",
      zh: "始于轻微的记忆丧失，发展到无法进行对话和对环境做出反应。最终需要全天候护理。"
    },
    dietaryHabits: {
      en: "The MIND Diet (Mediterranean-DASH Intervention for Neurodegenerative Delay) can lower risk by up to 53%. It emphasizes green leafy vegetables, berries, nuts, whole grains, and olive oil while limiting red meat, butter, cheese, and sweets.",
      zh: "MIND饮食（地中海-DASH干预神经退行性延缓饮食）可将风险降低高达53%。它强调绿叶蔬菜、浆果、坚果、全谷物和橄榄油，同时限制红肉、黄油、奶酪和甜食。"
    },
    advice: {
      en: "Regular physical exercise, social engagement, and mental stimulation (puzzles, learning new skills) are just as important as diet. Quality sleep helps clear brain toxins.",
      zh: "定期的体育锻炼、社交参与和精神刺激（拼图、学习新技能）与饮食同样重要。优质睡眠有助于清除大脑毒素。"
    }
  }
};

export const getDiseaseInfo = (id: string): DiseaseInfo | null => {
  return DISEASE_INFO_DB[id] || null;
};
