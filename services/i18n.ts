
import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    app_name: "NutriGuard AI",
    tab_scan: "Scan",
    tab_history: "History",
    tab_profile: "Profile",
    tab_guide: "Guide",
    tab_chef: "Chef",
    
    // Navigation
    btn_back: "Back",
    
    // Onboarding
    welcome_title: "Welcome to NutriGuard",
    welcome_desc: "Let's build your personalized health profile to get the most accurate AI analysis.",
    section_basic: "Basic Information",
    section_vitals: "Vitals & Health",
    section_medical: "Medical Profile",
    
    label_name: "Your Name",
    label_name_placeholder: "Enter your name",
    label_age: "Age",
    label_gender: "Gender",
    gender_male: "Male",
    gender_female: "Female",
    gender_other: "Other",
    label_height: "Height (cm)",
    label_weight: "Weight (kg)",
    label_bp: "Blood Pressure (mmHg)",
    label_bp_sys: "Systolic",
    label_bp_dia: "Diastolic",
    label_symptoms: "Current Symptoms",
    label_symptoms_placeholder: "e.g. Dizziness, fatigue, nausea...",
    label_medications: "Current Medications",
    label_medications_placeholder: "e.g. Metformin, Lisinopril...",
    
    label_conditions: "Current Illnesses / Conditions",
    privacy_note: "Data stored locally. Not medical advice.",
    btn_start: "Save & Start",
    
    // Camera
    align_food: "Align food within frame",
    cam_tip_light: "Ensure well-lit environment",
    cam_tip_focus: "Tap to focus",
    cam_focusing: "Focusing...",
    analyzing: "Analyzing Food...",
    checking_profile: "Checking against your profile:",
    btn_scan_again: "Scan Another Food",
    risk_level: "RISK LEVEL",
    triggered_by: "Risk Factors:",
    dv_note: "* % Daily Value based on 2,000 calorie diet",
    
    // Analysis
    section_why: "Why?",
    section_detailed: "Detailed Analysis",
    section_recommendation: "Recommendation",
    section_alternative: "Better Alternative",
    smart_swaps: "Smart Swaps",
    
    // History
    history_title: "Scan History",
    history_empty: "No food scans yet.",
    history_empty_desc: "Go to the Scan tab to start analyzing your meals.",
    confirm_clear: "Are you sure you want to clear all history?",
    
    // Profile
    my_conditions: "My Health Conditions",
    active_guidelines: "Active Guidelines",
    edit_conditions: "Edit Conditions",
    done_editing: "Done Editing",
    add_conditions: "Add Conditions",
    no_conditions: "No health conditions selected.",
    guideline_avoid: "Avoid",
    guideline_limit: "Limit",
    guideline_good: "Good",
    disclaimer_title: "Medical Disclaimer",
    disclaimer_text: "NutriGuard AI is an experimental tool. This information is for educational purposes only and not a substitute for professional medical advice, diagnosis, or treatment.",
    
    // Plan
    plan_title: "Personalized Care Plan",
    btn_generate_plan: "Generate Diet & Workout Plan",
    btn_regenerate_plan: "Regenerate Plan",
    plan_generating: "Designing your plan...",
    plan_summary: "Strategy",
    plan_meals: "1-Day Sample Menu",
    plan_tips: "Lifestyle & Guidelines",
    meal_breakfast: "Breakfast",
    meal_lunch: "Lunch",
    meal_dinner: "Dinner",
    meal_snack: "Snacks",
    
    // Workout Plan
    plan_workout: "You Can Exercise",
    workout_freq: "Frequency",
    workout_duration: "Duration",
    workout_focus: "Focus Area",
    workout_exercises: "Recommended Exercises",
    workout_safety: "Safety Precautions",

    // Nutrients
    nut_calories: "Calories",
    nut_carbs: "Carbs",
    nut_sugar: "Sugar",
    nut_protein: "Protein",
    nut_fat: "Fat",
    nut_sodium: "Sodium",

    // Nutrient Descriptions
    nut_calories_desc: "Energy provided by food. Essential for daily functions but excess leads to weight gain.",
    nut_carbs_desc: "Main energy source. Diabetic patients should monitor intake to control blood sugar levels.",
    nut_sugar_desc: "Simple carbohydrates that cause rapid blood sugar spikes. High intake is linked to diabetes and obesity.",
    nut_protein_desc: "Building blocks for muscle and tissue repair. Important for immune function and satiety.",
    nut_fat_desc: "Energy dense nutrient. Focus on healthy unsaturated fats over saturated/trans fats for heart health.",
    nut_sodium_desc: "Essential mineral for fluid balance. Excess intake causes high blood pressure and strain on kidneys.",

    // Risk Labels
    RISK_SAFE: "SAFE",
    RISK_MODERATE: "MODERATE",
    RISK_RISKY: "RISKY",
    RISK_UNKNOWN: "UNKNOWN",

    // Custom Conditions
    custom_condition_title: "Other Conditions",
    custom_input_placeholder: "e.g. Migraine, Asthma...",
    btn_add: "Add",

    // Ingredient Guide & Disease Info
    guide_title: "Knowledge Base",
    guide_tab_ingredients: "Food Encyclopedia",
    guide_tab_conditions: "Health Conditions",
    guide_search_placeholder: "Search ingredients...",
    cat_all: "All",
    cat_grain: "Grains",
    cat_protein: "Protein",
    cat_vegetable: "Veg",
    cat_fruit: "Fruit",
    cat_dairy: "Dairy",
    guide_good_for: "Good For",
    guide_caution: "Caution For",
    guide_per_100g: "Per 100g",
    guide_match_profile: "Matches your profile",
    guide_filter_all: "All Ingredients",
    guide_filter_beneficial: "Good for Me",
    guide_filter_avoid: "Caution for Me",
    
    // Disease Detail Labels
    disease_overview: "Development & Nature",
    disease_severity: "Severity Analysis",
    disease_diet: "Dietary Principles",
    disease_advice: "Management Advice",

    // Recipe Generator
    chef_title: "AI Personal Chef",
    chef_desc: "Snap photos of your ingredients (the more the better!), and I'll cook up a recipe safe for your health.",
    snap_ingredients: "Snap",
    generating_recipe: "Creating Recipes...",
    recipe_result: "Your Personalized Menu",
    ingredients_list: "Ingredients",
    instructions: "Instructions",
    health_benefits: "Why It's Good For You",
    macros_est: "Estimated Macros",
    btn_new_recipe: "Create Another Recipe",
    chef_ingredients_found: "Ingredients Found",
    meal_option_breakfast: "Breakfast",
    meal_option_lunch: "Lunch",
    meal_option_dinner: "Dinner",
    chef_btn_cook: "Cook",
    chef_photos_count: "Photos",
    chef_missing_ingredients: "You'll also need:"
  },
  zh: {
    app_name: "饮食卫士 AI",
    tab_scan: "扫描",
    tab_history: "历史",
    tab_profile: "我的",
    tab_guide: "指南",
    tab_chef: "私厨",
    
    // Navigation
    btn_back: "返回",
    
    // Onboarding
    welcome_title: "欢迎使用 饮食卫士",
    welcome_desc: "请完善您的个人健康档案，以便 AI 为您提供更精准的风险分析。",
    section_basic: "基本信息",
    section_vitals: "体征数据",
    section_medical: "医疗档案",
    
    label_name: "您的称呼",
    label_name_placeholder: "请输入姓名",
    label_age: "年龄",
    label_gender: "性别",
    gender_male: "男",
    gender_female: "女",
    gender_other: "其他",
    label_height: "身高 (cm)",
    label_weight: "体重 (kg)",
    label_bp: "血压 (mmHg)",
    label_bp_sys: "收缩压(高压)",
    label_bp_dia: "舒张压(低压)",
    label_symptoms: "当前症状",
    label_symptoms_placeholder: "例如：头晕、乏力、恶心...",
    label_medications: "正在服用的药物",
    label_medications_placeholder: "例如：二甲双胍、阿司匹林...",
    
    label_conditions: "当前疾病 / 健康状况",
    privacy_note: "数据仅存储在本地。本应用不提供医疗建议。",
    btn_start: "保存并开始",
    
    // Camera
    align_food: "将食物对准框内",
    cam_tip_light: "确保光线充足",
    cam_tip_focus: "点击屏幕对焦",
    cam_focusing: "正在对焦...",
    analyzing: "正在分析食物...",
    checking_profile: "正在比对您的健康档案:",
    btn_scan_again: "扫描下一个",
    risk_level: "风险等级",
    triggered_by: "风险来源:",
    dv_note: "* 每日参考值(DV)基于2000卡路里饮食",
    
    // Analysis
    section_why: "主要原因",
    section_detailed: "详细分析",
    section_recommendation: "饮食建议",
    section_alternative: "更佳替代方案",
    smart_swaps: "智能替代推荐",
    
    // History
    history_title: "扫描历史",
    history_empty: "暂无扫描记录",
    history_empty_desc: "请前往扫描页面开始分析您的饮食。",
    confirm_clear: "确定要清空所有历史记录吗？",
    
    // Profile
    my_conditions: "我的健康状况",
    active_guidelines: "当前饮食指南",
    edit_conditions: "编辑状况",
    done_editing: "完成编辑",
    add_conditions: "添加健康状况",
    no_conditions: "未选择任何健康状况。",
    guideline_avoid: "严格避免",
    guideline_limit: "适量控制",
    guideline_good: "推荐食用",
    disclaimer_title: "免责声明",
    disclaimer_text: "本应用是基于人工智能的实验性工具。所有信息仅供参考，不能替代专业医生的诊断和治疗建议。饮食调整请遵医嘱。",
    
    // Plan
    plan_title: "个性化健康方案",
    btn_generate_plan: "生成饮食与运动方案",
    btn_regenerate_plan: "重新生成",
    plan_generating: "正在为您规划方案...",
    plan_summary: "核心策略",
    plan_meals: "一日参考食谱",
    plan_tips: "生活指南",
    meal_breakfast: "早餐",
    meal_lunch: "午餐",
    meal_dinner: "晚餐",
    meal_snack: "加餐",

    // Workout Plan
    plan_workout: "您可以运动",
    workout_freq: "频率",
    workout_duration: "时长",
    workout_focus: "重点",
    workout_exercises: "推荐动作",
    workout_safety: "安全注意事项",
    
    // Nutrients
    nut_calories: "热量",
    nut_carbs: "碳水",
    nut_sugar: "糖分",
    nut_protein: "蛋白质",
    nut_fat: "脂肪",
    nut_sodium: "钠",

    // Nutrient Descriptions
    nut_calories_desc: "食物提供的能量。维持生命必需，但过量会导致体重增加。",
    nut_carbs_desc: "主要的能量来源。糖尿病患者应监控摄入量以控制血糖水平。",
    nut_sugar_desc: "简单碳水化合物，会导致血糖迅速升高。高摄入量与糖尿病和肥胖有关。",
    nut_protein_desc: "肌肉和组织修复的基石。对免疫功能和饱腹感很重要。",
    nut_fat_desc: "高能量营养素。为了心脏健康，应选择健康的不饱和脂肪，少吃饱和/反式脂肪。",
    nut_sodium_desc: "维持体液平衡的必需矿物质。摄入过量会导致高血压并加重肾脏负担。",

    // Risk Labels
    RISK_SAFE: "安全",
    RISK_MODERATE: "适量/中风险",
    RISK_RISKY: "危险",
    RISK_UNKNOWN: "未知",

    // Custom Conditions
    custom_condition_title: "其他健康状况 (AI分析)",
    custom_input_placeholder: "例如：偏头痛、哮喘...",
    btn_add: "添加",

    // Ingredient Guide & Disease Info
    guide_title: "健康知识库",
    guide_tab_ingredients: "食物百科",
    guide_tab_conditions: "疾病科普",
    guide_search_placeholder: "搜索食材...",
    cat_all: "全部",
    cat_grain: "主食",
    cat_protein: "蛋白",
    cat_vegetable: "蔬菜",
    cat_fruit: "水果",
    cat_dairy: "乳品",
    guide_good_for: "有益于",
    guide_caution: "慎用于",
    guide_per_100g: "每100克",
    guide_match_profile: "符合您的健康档案",
    guide_filter_all: "所有食材",
    guide_filter_beneficial: "对我有益",
    guide_filter_avoid: "需注意",
    
    // Disease Detail Labels
    disease_overview: "病理概览",
    disease_severity: "严重程度分析",
    disease_diet: "饮食习惯原则",
    disease_advice: "日常管理建议",

    // Recipe Generator
    chef_title: "AI 专属私厨",
    chef_desc: "拍摄您的现有食材（越多越好！），我将为您烹制一份符合您健康状况的专属食谱。",
    snap_ingredients: "拍摄",
    generating_recipe: "正在生成食谱...",
    recipe_result: "为您定制的食谱",
    ingredients_list: "所需食材",
    instructions: "烹饪步骤",
    health_benefits: "健康益处",
    macros_est: "营养估算",
    btn_new_recipe: "生成新食谱",
    chef_ingredients_found: "识别到的食材",
    meal_option_breakfast: "早餐推荐",
    meal_option_lunch: "午餐推荐",
    meal_option_dinner: "晚餐推荐",
    chef_btn_cook: "开始烹饪",
    chef_photos_count: "张照片",
    chef_missing_ingredients: "建议补充食材:"
  }
};

export const t = (key: keyof typeof TRANSLATIONS['en'], lang: Language) => {
  return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
};
