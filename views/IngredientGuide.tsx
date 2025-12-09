import React, { useState } from 'react';
import { getIngredients } from '../services/ingredients';
import { getDiseaseInfo } from '../services/diseaseInfo';
import { HEALTH_CATEGORIES, DIET_RULES_MAP } from '../services/dietRules';
import { Ingredient, UserProfile, ConditionId } from '../types';
import { t } from '../services/i18n';
import { CheckIcon, AlertTriangleIcon, ChevronRightIcon, FileTextIcon, InfoIcon } from '../components/Icons';

interface IngredientGuideProps {
  userProfile: UserProfile;
}

export const IngredientGuide: React.FC<IngredientGuideProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'conditions'>('ingredients');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [personalFilter, setPersonalFilter] = useState<'all' | 'beneficial' | 'avoid'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  const lang = userProfile.language;
  const ingredients = getIngredients();

  const categories = [
    { id: 'all', name: t('cat_all', lang) },
    { id: 'grain', name: t('cat_grain', lang) },
    { id: 'protein', name: t('cat_protein', lang) },
    { id: 'vegetable', name: t('cat_vegetable', lang) },
    { id: 'fruit', name: t('cat_fruit', lang) },
    { id: 'dairy', name: t('cat_dairy', lang) },
  ];

  const filteredIngredients = ingredients.filter(ing => {
    // Improved search: Match against English OR Chinese name
    const matchesSearch = 
        ing.name.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ing.name.zh.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || ing.category === selectedCategory;
    
    // Personalization logic
    const userGoodMatches = ing.beneficialFor.filter(c => userProfile.conditions.includes(c));
    const userBadMatches = ing.harmfulFor.filter(c => userProfile.conditions.includes(c));

    let matchesPersonal = true;
    if (personalFilter === 'beneficial') {
        matchesPersonal = userGoodMatches.length > 0;
    } else if (personalFilter === 'avoid') {
        matchesPersonal = userBadMatches.length > 0;
    }

    return matchesSearch && matchesCategory && matchesPersonal;
  });

  const getConditionName = (id: ConditionId) => {
    const rule = DIET_RULES_MAP[id];
    return rule ? (lang === 'zh' ? rule.name.split('(')[1].replace(')', '') : rule.name.split('(')[0]) : id;
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const toggleConditionCategory = (id: string) => {
      setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="p-5 pb-24 animate-fade-in">
      <h2 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">{t('guide_title', lang)}</h2>
      
      {/* Tab Toggle */}
      <div className="bg-slate-100 p-1 rounded-xl flex mb-6 shadow-inner">
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === 'ingredients' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
              {t('guide_tab_ingredients', lang)}
          </button>
          <button 
            onClick={() => setActiveTab('conditions')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === 'conditions' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
              {t('guide_tab_conditions', lang)}
          </button>
      </div>

      {activeTab === 'ingredients' ? (
        <div className="space-y-4 animate-fade-in">
            {/* Search Bar */}
            <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                    type="text" 
                    placeholder={t('guide_search_placeholder', lang)} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border-0 ring-1 ring-slate-200 rounded-2xl pl-10 pr-10 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all outline-none"
                />
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}
            </div>

            {/* Personal Filter Toggle */}
            {userProfile.conditions.length > 0 && (
                <div className="flex bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-4">
                    <button 
                        onClick={() => setPersonalFilter('all')}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${personalFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {t('guide_filter_all', lang)}
                    </button>
                    <button 
                        onClick={() => setPersonalFilter('beneficial')}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${personalFilter === 'beneficial' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-emerald-600'}`}
                    >
                        {t('guide_filter_beneficial', lang)}
                    </button>
                    <button 
                        onClick={() => setPersonalFilter('avoid')}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${personalFilter === 'avoid' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-rose-600'}`}
                    >
                        {t('guide_filter_avoid', lang)}
                    </button>
                </div>
            )}

            {/* Category Pills */}
            <div className="flex space-x-3 overflow-x-auto pb-6 no-scrollbar -mx-5 px-5">
                {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.id 
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 transform scale-105' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:border-emerald-200 shadow-sm'
                    }`}
                >
                    {cat.name}
                </button>
                ))}
            </div>

            {/* List */}
            {filteredIngredients.map((ing, idx) => {
                const isExpanded = expandedId === ing.id;
                
                const userGoodMatches = ing.beneficialFor.filter(c => userProfile.conditions.includes(c));
                const userBadMatches = ing.harmfulFor.filter(c => userProfile.conditions.includes(c));
                const hasGoodMatch = userGoodMatches.length > 0;
                const hasBadMatch = userBadMatches.length > 0;

                return (
                    <div 
                        key={ing.id} 
                        className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                            isExpanded ? 'border-emerald-100 shadow-lg ring-1 ring-emerald-100' : 'border-slate-100 shadow-sm hover:shadow-md'
                        }`}
                        style={{animationDelay: `${idx * 0.05}s`}}
                    >
                    <button 
                        onClick={() => toggleExpand(ing.id)}
                        className="w-full text-left p-5 flex justify-between items-center bg-white z-10 relative"
                    >
                        <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-slate-800 text-lg">{ing.name[lang]}</h3>
                            
                            {/* Status Badges in List View */}
                            {hasGoodMatch && !isExpanded && (
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center border border-emerald-100">
                                <CheckIcon className="w-3 h-3 mr-1" />
                                {t('guide_filter_beneficial', lang)}
                            </span>
                            )}
                            {hasBadMatch && !isExpanded && (
                            <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center border border-rose-100">
                                <AlertTriangleIcon className="w-3 h-3 mr-1" />
                                {t('guide_filter_avoid', lang)}
                            </span>
                            )}
                        </div>
                        <p className="text-xs font-medium text-slate-400 mt-1.5 flex items-center space-x-2">
                            <span>{ing.calories} kcal</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            <span>{ing.nutrients.carbs}g Carbs</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            <span>{ing.nutrients.protein}g Pro</span>
                        </p>
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-90 bg-emerald-50 text-emerald-600' : 'text-slate-300'}`}>
                            <ChevronRightIcon className="w-5 h-5" />
                        </div>
                    </button>

                    {isExpanded && (
                        <div className="px-5 pb-6 pt-2 bg-gradient-to-b from-white to-slate-50/50">
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                            {ing.description[lang]}
                        </p>

                        <div className="space-y-4">
                            {/* Good For */}
                            {ing.beneficialFor.length > 0 && (
                            <div>
                                <p className="text-[10px] font-extrabold text-emerald-600 uppercase mb-2 tracking-wide">{t('guide_good_for', lang)}</p>
                                <div className="flex flex-wrap gap-2">
                                {ing.beneficialFor.map(cond => {
                                    const isUserMatch = userProfile.conditions.includes(cond);
                                    return (
                                    <span key={cond} className={`text-xs px-3 py-1.5 rounded-lg border flex items-center transition-all ${
                                        isUserMatch 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold shadow-sm' 
                                        : 'bg-white text-slate-500 border-slate-200'
                                    }`}>
                                        {isUserMatch && <CheckIcon className="w-3 h-3 mr-1.5" />}
                                        {getConditionName(cond)}
                                    </span>
                                    )
                                })}
                                </div>
                            </div>
                            )}

                            {/* Caution For */}
                            {ing.harmfulFor.length > 0 && (
                            <div>
                                <p className="text-[10px] font-extrabold text-rose-500 uppercase mb-2 tracking-wide">{t('guide_caution', lang)}</p>
                                <div className="flex flex-wrap gap-2">
                                {ing.harmfulFor.map(cond => {
                                    const isUserMatch = userProfile.conditions.includes(cond);
                                    return (
                                    <span key={cond} className={`text-xs px-3 py-1.5 rounded-lg border flex items-center transition-all ${
                                        isUserMatch 
                                        ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold shadow-sm' 
                                        : 'bg-white text-slate-500 border-slate-200'
                                    }`}>
                                        {isUserMatch && <AlertTriangleIcon className="w-3 h-3 mr-1.5" />}
                                        {getConditionName(cond)}
                                    </span>
                                    )
                                })}
                                </div>
                            </div>
                            )}

                            {/* Macros Table */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">{t('guide_per_100g', lang)}</p>
                                </div>
                                <div className="grid grid-cols-4 gap-3 text-center">
                                    <MacroCard label="Kcal" value={ing.calories} />
                                    <MacroCard label="Pro" value={`${ing.nutrients.protein}g`} />
                                    <MacroCard label="Carb" value={`${ing.nutrients.carbs}g`} />
                                    <MacroCard label="Fat" value={`${ing.nutrients.fat}g`} />
                                </div>
                            </div>
                        </div>
                        </div>
                    )}
                    </div>
                )
            })}
            
            {filteredIngredients.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl opacity-50">🥗</span>
                    </div>
                    <p className="text-slate-400 font-medium">No ingredients found.</p>
                </div>
            )}
        </div>
      ) : (
          /* Conditions Tab Content */
          <div className="space-y-4 animate-fade-in">
              {HEALTH_CATEGORIES.map(category => {
                  const isOpen = expandedCategory === category.id;
                  
                  return (
                      <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                          <button 
                            onClick={() => toggleConditionCategory(category.id)}
                            className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors"
                          >
                             <div className="flex items-center space-x-3">
                                 <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
                                     {category.name.charAt(0)}
                                 </div>
                                 <span className="font-bold text-slate-700 text-sm">{category.name.substring(3)}</span>
                             </div>
                             <ChevronRightIcon className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {isOpen && (
                              <div className="px-5 pb-5">
                                  {category.groups.map(group => (
                                      <div key={group.id} className="mt-4 first:mt-2">
                                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 pl-1">{group.name}</p>
                                          <div className="space-y-2">
                                              {group.conditions.map(cond => {
                                                  const detail = getDiseaseInfo(cond.id);
                                                  const isExpanded = selectedDisease === cond.id;
                                                  
                                                  return (
                                                      <div key={cond.id} className={`rounded-xl border transition-all ${isExpanded ? 'bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-50' : 'bg-slate-50 border-slate-50'}`}>
                                                          <button 
                                                            onClick={() => setSelectedDisease(isExpanded ? null : cond.id)}
                                                            className="w-full text-left p-3 flex justify-between items-center"
                                                          >
                                                              <span className={`text-sm font-bold ${isExpanded ? 'text-indigo-700' : 'text-slate-600'}`}>{cond.name}</span>
                                                              <InfoIcon className={`w-4 h-4 transition-colors ${isExpanded ? 'text-indigo-400' : 'text-slate-300'}`} />
                                                          </button>
                                                          
                                                          {isExpanded && (
                                                              <div className="px-4 pb-4 text-sm animate-fade-in">
                                                                  {detail ? (
                                                                      <div className="space-y-4 pt-2">
                                                                          <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                                                                              <p className="text-[10px] font-extrabold text-indigo-500 uppercase mb-1 tracking-wide">{t('disease_overview', lang)}</p>
                                                                              <p className="text-slate-700 leading-relaxed">{detail.overview[lang]}</p>
                                                                          </div>
                                                                          
                                                                          <div className="grid grid-cols-1 gap-3">
                                                                               <div className="bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                                                                                   <p className="text-[10px] font-extrabold text-rose-500 uppercase mb-1 tracking-wide">{t('disease_severity', lang)}</p>
                                                                                   <p className="text-slate-700 leading-relaxed">{detail.severity[lang]}</p>
                                                                               </div>
                                                                               
                                                                               <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
                                                                                   <p className="text-[10px] font-extrabold text-emerald-600 uppercase mb-1 tracking-wide">{t('disease_diet', lang)}</p>
                                                                                   <p className="text-slate-700 leading-relaxed">{detail.dietaryHabits[lang]}</p>
                                                                               </div>

                                                                               <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                                                                                   <p className="text-[10px] font-extrabold text-blue-500 uppercase mb-1 tracking-wide">{t('disease_advice', lang)}</p>
                                                                                   <p className="text-slate-700 leading-relaxed">{detail.advice[lang]}</p>
                                                                               </div>
                                                                          </div>
                                                                      </div>
                                                                  ) : (
                                                                      <div className="p-3 text-slate-400 italic text-center text-xs">
                                                                          Detailed guide coming soon for this condition.
                                                                      </div>
                                                                  )}
                                                              </div>
                                                          )}
                                                      </div>
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
      )}
    </div>
  );
};

const MacroCard = ({ label, value }: { label: string, value: string | number }) => (
    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</p>
        <p className="font-bold text-slate-800 text-sm">{value}</p>
    </div>
);