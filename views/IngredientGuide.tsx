import React, { useState } from 'react';
import { getIngredients } from '../services/ingredients';
import { Ingredient, UserProfile, ConditionId } from '../types';
import { t } from '../services/i18n';
import { DIET_RULES_MAP } from '../services/dietRules';
import { CheckIcon, AlertTriangleIcon, ChevronRightIcon } from '../components/Icons';

interface IngredientGuideProps {
  userProfile: UserProfile;
}

export const IngredientGuide: React.FC<IngredientGuideProps> = ({ userProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    const matchesSearch = ing.name[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getConditionName = (id: ConditionId) => {
    const rule = DIET_RULES_MAP[id];
    return rule ? (lang === 'zh' ? rule.name.split('(')[1].replace(')', '') : rule.name.split('(')[0]) : id;
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('guide_title', lang)}</h2>
      
      {/* Search */}
      <div className="relative mb-4">
        <input 
          type="text" 
          placeholder={t('guide_search_placeholder', lang)} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id 
              ? 'bg-emerald-600 text-white' 
              : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredIngredients.map(ing => {
          const isExpanded = expandedId === ing.id;
          
          // Check for user matches
          const userGoodMatches = ing.beneficialFor.filter(c => userProfile.conditions.includes(c));
          const userBadMatches = ing.harmfulFor.filter(c => userProfile.conditions.includes(c));
          const hasMatch = userGoodMatches.length > 0 || userBadMatches.length > 0;

          return (
            <div key={ing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
              <button 
                onClick={() => toggleExpand(ing.id)}
                className="w-full text-left p-4 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-800 text-lg">{ing.name[lang]}</h3>
                    {hasMatch && !isExpanded && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                        {t('guide_match_profile', lang)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {ing.calories} kcal • {ing.nutrients.carbs}g Carbs • {ing.nutrients.protein}g Protein
                  </p>
                </div>
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    <ChevronRightIcon className="w-5 h-5 text-gray-300" />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-50 bg-gray-50/30 pt-3 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {ing.description[lang]}
                  </p>

                  <div className="space-y-3">
                    {/* Good For */}
                    {ing.beneficialFor.length > 0 && (
                       <div>
                         <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1.5">{t('guide_good_for', lang)}</p>
                         <div className="flex flex-wrap gap-2">
                           {ing.beneficialFor.map(cond => {
                             const isUserMatch = userProfile.conditions.includes(cond);
                             return (
                               <span key={cond} className={`text-xs px-2 py-1 rounded-md border flex items-center ${
                                 isUserMatch 
                                 ? 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold' 
                                 : 'bg-white text-gray-600 border-gray-200'
                               }`}>
                                 {isUserMatch && <CheckIcon className="w-3 h-3 mr-1" />}
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
                         <p className="text-[10px] font-bold text-red-500 uppercase mb-1.5">{t('guide_caution', lang)}</p>
                         <div className="flex flex-wrap gap-2">
                           {ing.harmfulFor.map(cond => {
                             const isUserMatch = userProfile.conditions.includes(cond);
                             return (
                               <span key={cond} className={`text-xs px-2 py-1 rounded-md border flex items-center ${
                                 isUserMatch 
                                 ? 'bg-red-100 text-red-800 border-red-200 font-bold' 
                                 : 'bg-white text-gray-600 border-gray-200'
                               }`}>
                                 {isUserMatch && <AlertTriangleIcon className="w-3 h-3 mr-1" />}
                                 {getConditionName(cond)}
                               </span>
                             )
                           })}
                         </div>
                       </div>
                    )}

                    {/* Macros Table */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{t('guide_per_100g', lang)}</p>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                                <p className="text-[10px] text-gray-400">Kcal</p>
                                <p className="font-bold text-gray-700">{ing.calories}</p>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                                <p className="text-[10px] text-gray-400">Pro</p>
                                <p className="font-bold text-gray-700">{ing.nutrients.protein}g</p>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                                <p className="text-[10px] text-gray-400">Carb</p>
                                <p className="font-bold text-gray-700">{ing.nutrients.carbs}g</p>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                                <p className="text-[10px] text-gray-400">Fat</p>
                                <p className="font-bold text-gray-700">{ing.nutrients.fat}g</p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {filteredIngredients.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
                No ingredients found.
            </div>
        )}
      </div>
    </div>
  );
};