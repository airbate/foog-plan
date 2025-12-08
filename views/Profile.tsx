import React, { useState } from 'react';
import { UserProfile, ConditionId, Language } from '../types';
import { saveProfile } from '../services/storage';
import { UserIcon, ChevronRightIcon, CheckIcon, FileTextIcon, SparklesIcon } from '../components/Icons';
import { DIET_RULES_MAP, HEALTH_CATEGORIES, ALL_CONDITIONS } from '../services/dietRules';
import { generateDietPlan } from '../services/gemini';
import { t } from '../services/i18n';

interface ProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [generatingPlan, setGeneratingPlan] = useState(false);

  const lang = profile.language;

  const toggleCondition = (id: ConditionId) => {
    let newConditions = [...profile.conditions];
    if (newConditions.includes(id)) {
      newConditions = newConditions.filter(c => c !== id);
    } else {
      newConditions.push(id);
    }
    const updated = { ...profile, conditions: newConditions };
    saveProfile(updated);
    onUpdate(updated);
  };

  const toggleCat = (id: string) => {
      setExpandedCats(prev => ({...prev, [id]: !prev[id]}));
  }

  const changeLanguage = (l: Language) => {
      const updated = { ...profile, language: l };
      saveProfile(updated);
      onUpdate(updated);
  }

  const handleGeneratePlan = async () => {
      if (profile.conditions.length === 0) return;
      
      setGeneratingPlan(true);
      try {
          const plan = await generateDietPlan(profile.conditions, lang);
          const updated = { ...profile, dietPlan: plan };
          saveProfile(updated);
          onUpdate(updated);
      } catch (e) {
          alert("Failed to generate plan. Please try again.");
      } finally {
          setGeneratingPlan(false);
      }
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center space-x-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
          <UserIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
          <button 
            onClick={() => setEditing(!editing)}
            className="text-sm text-emerald-600 font-medium hover:underline mt-1"
          >
            {editing ? t('done_editing', lang) : t('edit_conditions', lang)}
          </button>
        </div>
      </div>

        {/* Language Switcher */}
        <div className="flex justify-center mb-8">
            <div className="flex bg-gray-200 rounded-lg p-1">
                <button 
                    onClick={() => changeLanguage('en')} 
                    className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all ${lang === 'en' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
                >
                    English
                </button>
                <button 
                    onClick={() => changeLanguage('zh')} 
                    className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all ${lang === 'zh' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
                >
                    中文
                </button>
            </div>
        </div>

      {editing ? (
          <div className="space-y-4 mb-8">
              <h3 className="font-bold text-gray-800">{t('my_conditions', lang)}</h3>
              {HEALTH_CATEGORIES.map((category) => {
                const isExpanded = expandedCats[category.id];
                const selectedCount = category.groups.flatMap(g => g.conditions).filter(c => profile.conditions.includes(c.id)).length;
                return (
                    <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <button 
                            onClick={() => toggleCat(category.id)}
                            className="w-full flex items-center justify-between p-3 bg-gray-50"
                        >
                            <span className="font-bold text-sm text-gray-700">{category.name}</span>
                            <div className="flex items-center space-x-2">
                                {selectedCount > 0 && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{selectedCount}</span>}
                                <ChevronRightIcon className={`w-4 h-4 text-gray-400 ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>
                        </button>
                        {isExpanded && (
                            <div className="p-3 space-y-3">
                                {category.groups.map(group => (
                                    <div key={group.id}>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">{group.name}</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {group.conditions.map(cond => {
                                                const isSelected = profile.conditions.includes(cond.id);
                                                return (
                                                    <button 
                                                        key={cond.id}
                                                        onClick={() => toggleCondition(cond.id)}
                                                        className={`flex items-center justify-between p-2 rounded-lg text-sm border ${isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-gray-100'}`}
                                                    >
                                                        <span>{cond.name}</span>
                                                        {isSelected && <CheckIcon className="w-4 h-4 text-emerald-600" />}
                                                    </button>
                                                )
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
      ) : (
        <>
            {/* AI Care Plan Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4 px-1">
                     <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <FileTextIcon className="w-5 h-5 mr-2 text-emerald-600" />
                        {t('plan_title', lang)}
                     </h3>
                     {profile.dietPlan && !generatingPlan && (
                         <button onClick={handleGeneratePlan} className="text-xs font-medium text-gray-400 hover:text-emerald-600 flex items-center">
                            <SparklesIcon className="w-3 h-3 mr-1" />
                            {t('btn_regenerate_plan', lang)}
                         </button>
                     )}
                </div>

                {!profile.dietPlan ? (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center border border-emerald-100 shadow-sm">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <SparklesIcon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4 px-4">Generate a comprehensive diet and lifestyle plan tailored to your conditions.</p>
                        <button 
                            onClick={handleGeneratePlan}
                            disabled={generatingPlan || profile.conditions.length === 0}
                            className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full"
                        >
                            {generatingPlan ? t('plan_generating', lang) : t('btn_generate_plan', lang)}
                        </button>
                        {profile.conditions.length === 0 && (
                            <p className="text-xs text-red-400 mt-2">Please select conditions first.</p>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50">
                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('plan_summary', lang)}</h4>
                             <p className="text-sm text-gray-700 leading-relaxed font-medium">{profile.dietPlan.summary}</p>
                        </div>
                        
                        {/* Meal Plan */}
                        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('plan_meals', lang)}</h4>
                            <div className="space-y-3">
                                <MealItem label={t('meal_breakfast', lang)} text={profile.dietPlan.meals.breakfast} />
                                <MealItem label={t('meal_lunch', lang)} text={profile.dietPlan.meals.lunch} />
                                <MealItem label={t('meal_dinner', lang)} text={profile.dietPlan.meals.dinner} />
                                <MealItem label={t('meal_snack', lang)} text={profile.dietPlan.meals.snacks} />
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="p-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('plan_tips', lang)}</h4>
                            <ul className="space-y-2">
                                {profile.dietPlan.guidelines.map((tip, i) => (
                                    <li key={`guide-${i}`} className="flex items-start text-sm text-gray-600">
                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></span>
                                        {tip}
                                    </li>
                                ))}
                                {profile.dietPlan.lifestyle.map((tip, i) => (
                                    <li key={`life-${i}`} className="flex items-start text-sm text-gray-600">
                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">{t('active_guidelines', lang)}</h3>
            {profile.conditions.length === 0 ? (
                <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p>{t('no_conditions', lang)}</p>
                    <button onClick={() => setEditing(true)} className="text-emerald-600 font-bold mt-2 text-sm">{t('add_conditions', lang)}</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {profile.conditions.map((id) => {
                    const rule = DIET_RULES_MAP[id];
                    // If no rule found, try to find name at least
                    if (!rule) {
                         const cond = ALL_CONDITIONS.find(c => c.id === id);
                         if(!cond) return null;
                         return (
                            <div key={id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-800">{cond.name}</h4>
                            </div>
                         )
                    }
                    return (
                        <div key={id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-50 to-white p-3 border-b border-gray-100 flex justify-between items-center">
                            <h4 className="font-bold text-gray-800 text-sm">{rule.name}</h4>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-red-500 uppercase mb-1 tracking-wider">{t('guideline_avoid', lang)}</p>
                                    <ul className="text-xs text-gray-600 list-disc list-inside space-y-0.5">
                                        {rule.avoid.slice(0, 3).map(item => <li key={item} className="truncate">{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1 tracking-wider">{t('guideline_good', lang)}</p>
                                     <ul className="text-xs text-gray-600 list-disc list-inside space-y-0.5">
                                        {rule.recommend.slice(0, 3).map(item => <li key={item} className="truncate">{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500 italic leading-relaxed">"{rule.generalAdvice}"</p>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>
            )}
        </>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-xl text-xs text-gray-500">
        <p className="font-bold mb-1">{t('disclaimer_title', lang)}</p>
        <p>{t('disclaimer_text', lang)}</p>
      </div>
    </div>
  );
};

const MealItem = ({label, text}: {label: string, text: string}) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline">
        <span className="text-xs font-bold text-gray-500 w-20 flex-shrink-0">{label}</span>
        <span className="text-sm text-gray-800">{text}</span>
    </div>
);