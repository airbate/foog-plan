import React, { useState } from 'react';
import { UserProfile, ConditionId, Language } from '../types';
import { HEALTH_CATEGORIES } from '../services/dietRules';
import { saveProfile } from '../services/storage';
import { CheckIcon, InfoIcon, ChevronRightIcon } from '../components/Icons';
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

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col max-w-md mx-auto">
      <div className="flex justify-end mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${lang === 'en' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
            >
                English
            </button>
            <button 
                onClick={() => setLang('zh')} 
                className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${lang === 'zh' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
            >
                中文
            </button>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome_title', lang)}</h1>
        <p className="text-gray-500 mb-6">
          {t('welcome_desc', lang)}
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('label_name', lang)}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder={t('label_name_placeholder', lang)}
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('label_conditions', lang)}</h2>
        <div className="space-y-3 pb-24">
          {HEALTH_CATEGORIES.map((category) => {
            const isExpanded = expandedCategories[category.id];
            // Count selected in this category
            const selectedCount = category.groups.flatMap(g => g.conditions).filter(c => selected.includes(c.id)).length;
            
            return (
                <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button 
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                             <span className="font-bold text-gray-800 text-sm">{category.name}</span>
                             {selectedCount > 0 && (
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {selectedCount}
                                </span>
                             )}
                        </div>
                        <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                        <div className="p-4 bg-white space-y-4">
                            {category.groups.map(group => (
                                <div key={group.id}>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{group.name}</h4>
                                    <div className="space-y-2">
                                        {group.conditions.map(condition => {
                                            const isSelected = selected.includes(condition.id);
                                            return (
                                                <button
                                                    key={condition.id}
                                                    onClick={() => toggleCondition(condition.id)}
                                                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all duration-200 flex items-center justify-between ${
                                                    isSelected
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                                        : 'border-gray-100 hover:border-emerald-200 bg-white text-gray-600'
                                                    }`}
                                                >
                                                    <span>{condition.name}</span>
                                                    {isSelected && <CheckIcon className="w-4 h-4 text-emerald-600" />}
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
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent max-w-md mx-auto">
        <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2 mb-4">
          <InfoIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-700 leading-tight">
             {t('privacy_note', lang)}
          </p>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-colors active:scale-95 transform duration-100"
        >
          {t('btn_start', lang)}
        </button>
      </div>
    </div>
  );
};