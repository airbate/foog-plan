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
    };
    saveProfile(updatedProfile);
    onComplete(updatedProfile);
  };

  const customConditions = selected.filter(id => !ALL_CONDITIONS.some(c => c.id === id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto pt-6 px-6">
      {/* Language Toggle */}
      <div className="flex justify-end mb-6 animate-fade-in">
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

      <div className="flex-1 animate-fade-in" style={{animationDelay: '0.1s'}}>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">{t('welcome_title', lang)}</h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          {t('welcome_desc', lang)}
        </p>

        {/* Name Input */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('label_name', lang)}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
            placeholder={t('label_name_placeholder', lang)}
          />
        </div>

        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            {t('label_conditions', lang)}
            <span className="ml-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {selected.length} selected
            </span>
        </h2>
        
        <div className="space-y-3 pb-32">
          {HEALTH_CATEGORIES.map((category) => {
            const isExpanded = expandedCategories[category.id];
            const selectedCount = category.groups.flatMap(g => g.conditions).filter(c => selected.includes(c.id)).length;
            
            return (
                <div key={category.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-emerald-100 bg-white shadow-sm' : 'border-white bg-white shadow-sm'}`}>
                    <button 
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                             {/* Category Icon Placeholder could go here */}
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${selectedCount > 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                {category.name.charAt(0)}
                             </div>
                             <span className="font-bold text-slate-700 text-sm">{category.name.substring(3)}</span>
                        </div>
                        <ChevronRightIcon className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                        <div className="px-4 pb-4 animate-fade-in">
                            {category.groups.map(group => (
                                <div key={group.id} className="mt-4 first:mt-2">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">{group.name}</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {group.conditions.map(condition => {
                                            const isSelected = selected.includes(condition.id);
                                            return (
                                                <button
                                                    key={condition.id}
                                                    onClick={() => toggleCondition(condition.id)}
                                                    className={`w-full text-left p-3 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between group ${
                                                    isSelected
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                                                        : 'border-slate-100 bg-white text-slate-500 hover:border-emerald-200'
                                                    }`}
                                                >
                                                    <span className="font-medium">{condition.name}</span>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200 group-hover:border-emerald-300'}`}>
                                                        {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                                                    </div>
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

          {/* Custom Conditions Section */}
          <div className="border border-blue-100 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white shadow-sm">
             <div className="p-5">
                <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {t('custom_condition_title', lang)}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {customConditions.map((cond, idx) => (
                        <div key={idx} className="bg-white border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center shadow-sm">
                            <span className="mr-2">{cond}</span>
                            <button onClick={() => removeCustomCondition(cond)} className="text-blue-300 hover:text-red-500 transition-colors">
                                <TrashIcon className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 relative">
                    <input 
                        type="text" 
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder={t('custom_input_placeholder', lang)}
                        className="flex-1 border border-blue-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    />
                    <button 
                        onClick={addCustomCondition}
                        disabled={!customInput.trim()}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
                    >
                        {t('btn_add', lang)}
                    </button>
                </div>
             </div>
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