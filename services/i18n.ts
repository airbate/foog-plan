import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    app_name: "NutriGuard AI",
    tab_scan: "Scan",
    tab_history: "History",
    tab_profile: "Profile",
    
    // Onboarding
    welcome_title: "Welcome to NutriGuard",
    welcome_desc: "Personalized nutrition analysis based on your health profile.",
    label_name: "Your Name",
    label_name_placeholder: "Enter your name",
    label_conditions: "Select Conditions",
    privacy_note: "Data stored locally. Not medical advice.",
    btn_start: "Save & Start",
    
    // Camera
    align_food: "Align food within frame",
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
    
    // History
    history_title: "History",
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
    
    // Nutrients
    nut_calories: "Calories",
    nut_carbs: "Carbs",
    nut_sugar: "Sugar",
    nut_protein: "Protein",
    nut_fat: "Fat",
    nut_sodium: "Sodium",

    // Risk Labels
    RISK_SAFE: "SAFE",
    RISK_MODERATE: "MODERATE",
    RISK_RISKY: "RISKY",
    RISK_UNKNOWN: "UNKNOWN"
  },
  zh: {
    app_name: "饮食卫士 AI",
    tab_scan: "扫描",
    tab_history: "历史",
    tab_profile: "我的",
    
    // Onboarding
    welcome_title: "欢迎使用 饮食卫士",
    welcome_desc: "基于您的健康状况提供个性化饮食风险评估。",
    label_name: "您的称呼",
    label_name_placeholder: "请输入姓名",
    label_conditions: "选择健康状况",
    privacy_note: "数据仅存储在本地。本应用不提供医疗建议。",
    btn_start: "保存并开始",
    
    // Camera
    align_food: "将食物对准框内",
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
    
    // History
    history_title: "历史记录",
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
    
    // Nutrients
    nut_calories: "热量",
    nut_carbs: "碳水",
    nut_sugar: "糖分",
    nut_protein: "蛋白质",
    nut_fat: "脂肪",
    nut_sodium: "钠",

    // Risk Labels
    RISK_SAFE: "安全",
    RISK_MODERATE: "适量/中风险",
    RISK_RISKY: "高风险",
    RISK_UNKNOWN: "未知"
  }
};

export const t = (key: keyof typeof TRANSLATIONS['en'], lang: Language) => {
  return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
};