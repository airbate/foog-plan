
import React, { useState } from 'react';
import { UserProfile, ConditionId, Language } from '../types';
import { HEALTH_CATEGORIES, ALL_CONDITIONS } from '../services/dietRules';
import { saveProfile } from '../services/storage';
import { CheckIcon, InfoIcon, ChevronRightIcon, TrashIcon } from '../components/Icons';
import { t } from '../services/i18n';

interface OnboardingProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ initialProfile, onComplete }) => {
  const [selected, setSelected] = useState<ConditionId[]>(initialProfile.conditions);
  const [name, setName] = useState(initialProfile.name);
  const [lang, setLang] = useState<Language>(initialProfile.language);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [customInput, setCustomInput] = useState("");

  // New Bio Data Fields
  const [age, setAge] = useState<string>(initialProfile.age ? String(initialProfile.age) : "");
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(initialProfile.gender || 'male');
  const [height, setHeight] = useState<string>(initialProfile.height ? String(initialProfile.height) : "");
  const [weight, setWeight] = useState<string>(initialProfile.weight ? String(initialProfile.weight) : "");
  const [bpSystolic, setBpSystolic] = useState<string>(initialProfile.bloodPressure ? String(initialProfile.bloodPressure.systolic) : "");
  const [bpDiastolic, setBpDiastolic] = useState<string>(initialProfile.bloodPressure ? String(initialProfile.bloodPressure.diastolic) : "");
  const [symptoms, setSymptoms] = useState<string>(initialProfile.symptoms || "");
  const [medications, setMedications] = useState<string>(initialProfile.medications || "");

  const toggleCondition = (id: ConditionId) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
        ...prev,
        [catId]: !prev[catId]
    }));
  };

  const addCustomCondition = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!selected.includes(trimmed)) {
        setSelected([...selected, trimmed]);
    }
    setCustomInput("");
  };

  const removeCustomCondition = (id: string) => {
      setSelected(selected.filter(item => item !== id));
  };

  const handleSave = () => {
    const updatedProfile: UserProfile = {
      ...initialProfile,
      name: name || 'User',
      conditions: selected,
      onboarded: true,
      language: lang,
      // Save new fields
      age: age ? parseInt(age) : undefined,
      gender,
      height: height ? parseFloat(height) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      bloodPressure: (bpSystolic && bpDiastolic) ? {
          systolic: parseInt(bpSystolic),
          diastolic: parseInt(bpDiastolic)
      } : undefined,
      symptoms,
      medications,
    };
    saveProfile(updatedProfile);
    onComplete(updatedProfile);
  };

  const customConditions = selected.filter(id => !ALL_CONDITIONS.some(c => c.id === id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto pt-6 px-4">
      {/* Language Toggle */}
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-100">
            {['en', 'zh'].map((l) => (
                <button 
                    key={l}
                    onClick={() => setLang(l as Language)} 
                    className={`px-4 py-1.5 text-xs rounded-full font-bold transition-all duration-200 ${
                        lang === l 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {l === 'en' ? 'English' : '中文'}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 animate-fade-in space-y-8 pb-32" style={{animationDelay: '0.1s'}}>
        <div>
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">{t('welcome_title', lang)}</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
            {t('welcome_desc', lang)}
            </p>
        </div>

        {/* SECTION 1: BASIC INFORMATION */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                {t('section_basic', lang)}
            </h2>
            
            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_name', lang)}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder={t('label_name_placeholder', lang)}
                    />
                </div>

                {/* Age & Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_age', lang)}</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_gender', lang)}</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="male">{t('gender_male', lang)}</option>
                            <option value="female">{t('gender_female', lang)}</option>
                            <option value="other">{t('gender_other', lang)}</option>
                        </select>
                    </div>
                </div>

                {/* Height & Weight Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_height', lang)}</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="cm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_weight', lang)}</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="kg"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 2: VITALS & HEALTH */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                {t('section_vitals', lang)}
            </h2>
            
            {/* Blood Pressure */}
            <div className="mb-4">
                 <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_bp', lang)}</label>
                 <div className="flex items-center space-x-2">
                     <div className="flex-1">
                        <input
                            type="number"
                            value={bpSystolic}
                            onChange={(e) => setBpSystolic(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-center"
                            placeholder={t('label_bp_sys', lang)}
                        />
                     </div>
                     <span className="text-slate-300 font-light text-xl">/</span>
                     <div className="flex-1">
                        <input
                            type="number"
                            value={bpDiastolic}
                            onChange={(e) => setBpDiastolic(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-center"
                            placeholder={t('label_bp_dia', lang)}
                        />
                     </div>
                 </div>
            </div>
        </div>

        {/* SECTION 3: MEDICAL PROFILE */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                {t('section_medical', lang)}
            </h2>

            {/* Conditions Selection (Existing) */}
             <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    {t('label_conditions', lang)}
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {selected.length} selected
                    </span>
                </h3>
                
                <div className="space-y-3">
                    {HEALTH_CATEGORIES.map((category) => {
                        const isExpanded = expandedCategories[category.id];
                        const selectedCount = category.groups.flatMap(g => g.conditions).filter(c => selected.includes(c.id)).length;
                        
                        return (
                            <div key={category.id} className={`border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-emerald-100 bg-slate-50 shadow-sm' : 'border-slate-100 bg-white'}`}>
                                <button 
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${selectedCount > 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {category.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-slate-700 text-xs">{category.name.substring(3)}</span>
                                    </div>
                                    <ChevronRightIcon className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                                </button>
                                
                                {isExpanded && (
                                    <div className="px-3 pb-3 animate-fade-in">
                                        {category.groups.map(group => (
                                            <div key={group.id} className="mt-3 first:mt-1">
                                                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-1">{group.name}</h4>
                                                <div className="grid grid-cols-1 gap-1.5">
                                                    {group.conditions.map(condition => {
                                                        const isSelected = selected.includes(condition.id);
                                                        return (
                                                            <button
                                                                key={condition.id}
                                                                onClick={() => toggleCondition(condition.id)}
                                                                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all duration-200 flex items-center justify-between group ${
                                                                isSelected
                                                                    ? 'border-emerald-500 bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-500'
                                                                    : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-300'
                                                                }`}
                                                            >
                                                                <span className="font-medium">{condition.name}</span>
                                                                {isSelected && <CheckIcon className="w-3 h-3 text-emerald-600" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                
                 {/* Custom Conditions */}
                 <div className="mt-3 border border-blue-100 rounded-xl overflow-hidden bg-blue-50/50">
                     <div className="p-3">
                        <h3 className="text-xs font-bold text-blue-700 mb-2">{t('custom_condition_title', lang)}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {customConditions.map((cond, idx) => (
                                <div key={idx} className="bg-white border border-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold flex items-center shadow-sm">
                                    <span className="mr-1">{cond}</span>
                                    <button onClick={() => removeCustomCondition(cond)} className="text-blue-300 hover:text-red-500 transition-colors">
                                        <TrashIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                placeholder={t('custom_input_placeholder', lang)}
                                className="flex-1 border border-blue-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button 
                                onClick={addCustomCondition}
                                disabled={!customInput.trim()}
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 disabled:opacity-50 shadow-sm"
                            >
                                {t('btn_add', lang)}
                            </button>
                        </div>
                     </div>
                  </div>
             </div>

             {/* Symptoms */}
             <div className="mb-4">
                 <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_symptoms', lang)}</label>
                 <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-sm"
                    placeholder={t('label_symptoms_placeholder', lang)}
                 />
             </div>

             {/* Medications */}
             <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('label_medications', lang)}</label>
                 <textarea
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-sm"
                    placeholder={t('label_medications_placeholder', lang)}
                 />
             </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent max-w-md mx-auto z-20">
        <div className="bg-blue-50/80 backdrop-blur-sm p-3 rounded-xl flex items-start space-x-3 mb-4 border border-blue-100">
          <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-700 font-medium leading-relaxed opacity-80">
             {t('privacy_note', lang)}
          </p>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95 transform duration-100 flex justify-center items-center"
        >
          {t('btn_start', lang)}
          <ChevronRightIcon className="w-4 h-4 ml-2 opacity-50" />
        </button>
      </div>
    </div>
  );
};
