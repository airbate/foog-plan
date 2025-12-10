
import React, { useState } from 'react';
import { UserProfile, ConditionId, Language } from '../types';
import { saveProfile } from '../services/storage';
import { UserIcon, ChevronRightIcon, CheckIcon, FileTextIcon, SparklesIcon, TrashIcon, TargetIcon, AlertTriangleIcon } from '../components/Icons';
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
  const [customInput, setCustomInput] = useState("");

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

  const addCustomCondition = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!profile.conditions.includes(trimmed)) {
        const updated = { ...profile, conditions: [...profile.conditions, trimmed] };
        saveProfile(updated);
        onUpdate(updated);
    }
    setCustomInput("");
  };

  const removeCustomCondition = (id: string) => {
    const updated = { ...profile, conditions: profile.conditions.filter(c => c !== id) };
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

  const customConditions = profile.conditions.filter(id => !ALL_CONDITIONS.some(c => c.id === id));

  return (
    <div className="p-5 pb-24 animate-fade-in">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden mb-8 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-xl text-white">
         <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         
         <div className="flex items-center space-x-5 relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-inner">
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
              <button 
                onClick={() => setEditing(!editing)}
                className="text-sm text-emerald-300 font-medium hover:text-emerald-200 transition-colors mt-1 flex items-center"
              >
                {editing ? t('done_editing', lang) : t('edit_conditions', lang)}
                <ChevronRightIcon className="w-3 h-3 ml-1" />
              </button>
            </div>
         </div>

         {/* Language Toggle Inside Header */}
         <div className="mt-6 flex bg-black/20 rounded-xl p-1 w-fit border border-white/10 backdrop-blur-sm">
            <button 
                onClick={() => changeLanguage('en')} 
                className={`px-4 py-1.5 text-[10px] rounded-lg font-bold uppercase tracking-wider transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
                English
            </button>
            <button 
                onClick={() => changeLanguage('zh')} 
                className={`px-4 py-1.5 text-[10px] rounded-lg font-bold uppercase tracking-wider transition-all ${lang === 'zh' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
                中文
            </button>
        </div>
      </div>

      {editing ? (
          <div className="space-y-4 animate-fade-in">
              <h3 className="font-extrabold text-slate-800 text-lg mb-4">{t('my_conditions', lang)}</h3>
              {HEALTH_CATEGORIES.map((category) => {
                const isExpanded = expandedCats[category.id];
                const selectedCount = category.groups.flatMap(g => g.conditions).filter(c => profile.conditions.includes(c.id)).length;
                return (
                    <div key={category.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
                        <button 
                            onClick={() => toggleCat(category.id)}
                            className="w-full flex items-center justify-between p-4 bg-white"
                        >
                            <span className="font-bold text-sm text-slate-700">{category.name}</span>
                            <div className="flex items-center space-x-3">
                                {selectedCount > 0 && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">{selectedCount}</span>}
                                <ChevronRightIcon className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>
                        </button>
                        {isExpanded && (
                            <div className="px-4 pb-4 bg-slate-50/50 border-t border-slate-100 pt-3">
                                {category.groups.map(group => (
                                    <div key={group.id} className="mb-4 last:mb-0">
                                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 pl-1 tracking-wider">{group.name}</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {group.conditions.map(cond => {
                                                const isSelected = profile.conditions.includes(cond.id);
                                                return (
                                                    <button 
                                                        key={cond.id}
                                                        onClick={() => toggleCondition(cond.id)}
                                                        className={`flex items-center justify-between p-3 rounded-xl text-sm border font-medium transition-all ${isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm' : 'border-white bg-white text-slate-500 shadow-sm hover:border-emerald-200'}`}
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

               <div className="border border-blue-100 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white shadow-sm mt-6">
                    <div className="p-5">
                        <h3 className="text-sm font-bold text-blue-800 mb-3">{t('custom_condition_title', lang)}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {customConditions.map((cond, idx) => (
                                <div key={idx} className="bg-white border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center shadow-sm">
                                    <span className="mr-2">{cond}</span>
                                    <button onClick={() => removeCustomCondition(cond)} className="text-blue-300 hover:text-red-500">
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
                                className="flex-1 border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            />
                            <button 
                                onClick={addCustomCondition}
                                disabled={!customInput.trim()}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-50 shadow-md"
                            >
                                {t('btn_add', lang)}
                            </button>
                        </div>
                    </div>
                </div>
          </div>
      ) : (
        <>
            {/* AI Care Plan Section */}
            <div className="mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center justify-between mb-4 px-1">
                     <h3 className="text-lg font-extrabold text-slate-800 flex items-center">
                        <div className="p-1.5 bg-emerald-100 rounded-lg mr-2 text-emerald-600">
                            <FileTextIcon className="w-4 h-4" />
                        </div>
                        {t('plan_title', lang)}
                     </h3>
                     {profile.dietPlan && !generatingPlan && (
                         <button onClick={handleGeneratePlan} className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center transition-colors bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                            <SparklesIcon className="w-3 h-3 mr-1" />
                            {t('btn_regenerate_plan', lang)}
                         </button>
                     )}
                </div>

                {!profile.dietPlan ? (
                    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 text-center border border-emerald-100 shadow-lg shadow-emerald-50">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md text-emerald-500 transform rotate-3">
                            <SparklesIcon className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-6 leading-relaxed">Generate a comprehensive, AI-powered diet and lifestyle plan tailored specifically to your unique health profile.</p>
                        <button 
                            onClick={handleGeneratePlan}
                            disabled={generatingPlan || profile.conditions.length === 0}
                            className="bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 disabled:shadow-none transition-all w-full active:scale-95"
                        >
                            {generatingPlan ? t('plan_generating', lang) : t('btn_generate_plan', lang)}
                        </button>
                        {profile.conditions.length === 0 && (
                            <p className="text-xs text-rose-500 mt-3 font-medium bg-rose-50 inline-block px-3 py-1 rounded-lg">Please select conditions first.</p>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-50">
                             <h4 className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mb-3">{t('plan_summary', lang)}</h4>
                             <p className="text-sm text-slate-700 leading-relaxed font-medium">{profile.dietPlan.summary}</p>
                        </div>
                        
                        {/* Meal Plan */}
                        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">{t('plan_meals', lang)}</h4>
                            <div className="space-y-4">
                                <MealItem label={t('meal_breakfast', lang)} text={profile.dietPlan.meals.breakfast} />
                                <MealItem label={t('meal_lunch', lang)} text={profile.dietPlan.meals.lunch} />
                                <MealItem label={t('meal_dinner', lang)} text={profile.dietPlan.meals.dinner} />
                                <MealItem label={t('meal_snack', lang)} text={profile.dietPlan.meals.snacks} />
                            </div>
                        </div>

                        {/* Workout Plan - NEW SECTION */}
                        {profile.dietPlan.workout && (
                             <div className="p-6 border-b border-slate-50 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                                <div className="flex items-center mb-4">
                                    <TargetIcon className="w-4 h-4 text-indigo-500 mr-2" />
                                    <h4 className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">{t('plan_workout', lang)}</h4>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{t('workout_freq', lang)}</p>
                                        <p className="text-sm font-bold text-slate-700">{profile.dietPlan.workout.frequency}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{t('workout_duration', lang)}</p>
                                        <p className="text-sm font-bold text-slate-700">{profile.dietPlan.workout.avgDuration}</p>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                     <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">{t('workout_focus', lang)}</p>
                                     <p className="text-sm font-medium text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-100">{profile.dietPlan.workout.focus}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">{t('workout_exercises', lang)}</p>
                                    <div className="space-y-2">
                                        {profile.dietPlan.workout.exercises.map((ex, i) => (
                                            <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-sm font-bold text-slate-700">{ex.name}</span>
                                                    <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">{ex.durationOrReps}</span>
                                                </div>
                                                <p className="text-xs text-slate-500">{ex.benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                     <p className="text-[9px] font-bold text-slate-400 uppercase mb-2 flex items-center">
                                         <AlertTriangleIcon className="w-3 h-3 mr-1 text-amber-500" />
                                         {t('workout_safety', lang)}
                                     </p>
                                     <ul className="space-y-1">
                                        {profile.dietPlan.workout.precautions.map((item, i) => (
                                            <li key={i} className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 flex items-start">
                                                <span className="mr-2 opacity-50">•</span>
                                                {item}
                                            </li>
                                        ))}
                                     </ul>
                                </div>
                             </div>
                        )}

                        {/* Tips */}
                        <div className="p-6 bg-white">
                            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">{t('plan_tips', lang)}</h4>
                            <ul className="space-y-3">
                                {profile.dietPlan.guidelines.map((tip, i) => (
                                    <li key={`guide-${i}`} className="flex items-start text-sm text-slate-600 font-medium">
                                        <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0 shadow-sm shadow-emerald-200"></span>
                                        {tip}
                                    </li>
                                ))}
                                {profile.dietPlan.lifestyle.map((tip, i) => (
                                    <li key={`life-${i}`} className="flex items-start text-sm text-slate-600 font-medium">
                                        <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 shadow-sm shadow-blue-200"></span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="text-lg font-extrabold text-slate-800 mb-4 px-1">{t('active_guidelines', lang)}</h3>
            
            {customConditions.length > 0 && (
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-white p-5 rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="text-xs font-bold text-blue-700 uppercase mb-3 tracking-wider flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {t('custom_condition_title', lang)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {customConditions.map((cond, idx) => (
                            <span key={idx} className="bg-white text-blue-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border border-blue-100">
                                {cond}
                            </span>
                        ))}
                    </div>
                     <p className="text-[10px] text-blue-400 mt-3 font-medium opacity-80">
                        * Custom conditions are analyzed by AI dynamically.
                    </p>
                </div>
            )}

            {profile.conditions.filter(id => ALL_CONDITIONS.some(c => c.id === id)).length === 0 && customConditions.length === 0 ? (
                <div className="p-10 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium mb-3">{t('no_conditions', lang)}</p>
                    <button onClick={() => setEditing(true)} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">{t('add_conditions', lang)}</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {profile.conditions.map((id) => {
                    const rule = DIET_RULES_MAP[id];
                    if (!rule) return null;

                    return (
                        <div key={id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-slate-50/50 p-4 border-b border-slate-50 flex justify-between items-center">
                                <h4 className="font-bold text-slate-700 text-sm">{rule.name}</h4>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-rose-500 uppercase mb-2 tracking-widest">{t('guideline_avoid', lang)}</p>
                                        <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                                            {rule.avoid.slice(0, 3).map(item => <li key={item} className="flex items-center"><span className="w-1 h-1 bg-rose-300 rounded-full mr-2"></span>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-extrabold text-emerald-600 uppercase mb-2 tracking-widest">{t('guideline_good', lang)}</p>
                                         <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                                            {rule.recommend.slice(0, 3).map(item => <li key={item} className="flex items-center"><span className="w-1 h-1 bg-emerald-300 rounded-full mr-2"></span>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-slate-50">
                                    <p className="text-xs text-slate-400 italic leading-relaxed">"{rule.generalAdvice}"</p>
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
            )}
        </>
      )}

      <div className="mt-10 p-5 bg-slate-100 rounded-2xl text-[10px] text-slate-400 leading-relaxed text-center">
        <p className="font-bold mb-1 uppercase tracking-widest">{t('disclaimer_title', lang)}</p>
        <p>{t('disclaimer_text', lang)}</p>
      </div>
    </div>
  );
};

const MealItem = ({label, text}: {label: string, text: string}) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 last:border-0 pb-3 last:pb-0">
        <span className="text-xs font-bold text-slate-400 w-24 flex-shrink-0 uppercase tracking-wide">{label}</span>
        <span className="text-sm text-slate-800 font-medium">{text}</span>
    </div>
);
