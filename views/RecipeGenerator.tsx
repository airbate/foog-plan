import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { generateRecipeFromIngredients } from '../services/gemini';
import { UserProfile, ChefResponse } from '../types';
import { ChefHatIcon, SparklesIcon, TargetIcon, AlertTriangleIcon, ChevronRightIcon, TrashIcon } from '../components/Icons';
import { t } from '../services/i18n';

interface RecipeGeneratorProps {
  userProfile: UserProfile;
}

export const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ userProfile }) => {
  const webcamRef = useRef<Webcam>(null);
  const [images, setImages] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [chefResponse, setChefResponse] = useState<ChefResponse | null>(null);
  const [activeMeal, setActiveMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [error, setError] = useState<string | null>(null);
  const [focusing, setFocusing] = useState(false);

  const lang = userProfile.language;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImages(prev => [...prev, imageSrc]);
    }
  }, [webcamRef]);

  const removeImage = (index: number) => {
      setImages(prev => prev.filter((_, i) => i !== index));
  }

  const handleGeneration = async () => {
    if (images.length === 0) return;
    setAnalyzing(true);
    setError(null);
    try {
      const result = await generateRecipeFromIngredients(images, userProfile.conditions, lang);
      setChefResponse(result);
      setActiveMeal('breakfast');
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const triggerFocus = useCallback(async () => {
    if (focusing || chefResponse || analyzing) return;
    setFocusing(true);
    setTimeout(() => setFocusing(false), 800);
    try {
        const stream = webcamRef.current?.video?.srcObject as MediaStream;
        const track = stream?.getVideoTracks()[0];
        if (track && track.applyConstraints) {
             await track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as any] });
        }
    } catch(e) {
        console.warn("Focus not supported");
    }
  }, [webcamRef, focusing, chefResponse, analyzing]);

  const reset = () => {
    setImages([]);
    setChefResponse(null);
    setError(null);
    setActiveMeal('breakfast');
  };

  const currentRecipe = chefResponse ? chefResponse[activeMeal] : null;

  if (chefResponse && currentRecipe) {
    return (
      <div className="p-5 pb-24 animate-fade-in">
        {/* Identified Ingredients Banner */}
        <div className="bg-slate-800 text-white p-4 rounded-2xl mb-5 shadow-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                <ChefHatIcon className="w-4 h-4 mr-2" />
                {t('chef_ingredients_found', lang)}
            </h3>
            <div className="flex flex-wrap gap-2">
                {chefResponse.identifiedIngredients.map((ing, i) => (
                    <span key={i} className="bg-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-600">
                        {ing}
                    </span>
                ))}
            </div>
        </div>

        {/* Meal Tabs */}
        <div className="flex space-x-2 mb-6 bg-slate-100 p-1.5 rounded-xl shadow-inner">
            {(['breakfast', 'lunch', 'dinner'] as const).map(meal => (
                <button
                    key={meal}
                    onClick={() => setActiveMeal(meal)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 uppercase tracking-wide ${
                        activeMeal === meal 
                        ? 'bg-white text-emerald-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {t(`meal_option_${meal}` as any, lang)}
                </button>
            ))}
        </div>

        {/* Recipe Card (Animated Transition) */}
        <div key={activeMeal} className="animate-fade-in">
            <div className="relative mb-6">
                {/* Image Gallery Grid for Input */}
                <div className="h-40 w-full overflow-hidden rounded-xl bg-slate-100 relative shadow-sm">
                    {images.length === 1 ? (
                        <img src={images[0]} alt="Ingredient" className="w-full h-full object-cover opacity-90 grayscale-[20%]" />
                    ) : (
                        <div className="grid grid-cols-2 h-full w-full">
                            {images.slice(0, 4).map((img, i) => (
                                <img key={i} src={img} alt="" className="w-full h-full object-cover border-r border-b border-white/20" />
                            ))}
                        </div>
                    )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                     <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-emerald-300 text-xs font-bold uppercase mb-1 tracking-wider">{t(`meal_option_${activeMeal}` as any, lang)}</p>
                        <h2 className="text-white font-bold text-2xl leading-tight">{currentRecipe.name}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-5">
                <p className="text-slate-600 italic leading-relaxed mb-4">"{currentRecipe.description}"</p>
                
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <h3 className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest mb-2 flex items-center">
                        <SparklesIcon className="w-3 h-3 mr-1" />
                        {t('health_benefits', lang)}
                    </h3>
                    <p className="text-sm text-emerald-800 font-medium leading-relaxed">{currentRecipe.healthBenefits}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide mb-3">{t('ingredients_list', lang)}</h3>
                    
                    {/* List Ingredients */}
                    <ul className="space-y-2 mb-4">
                        {currentRecipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-600">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                                {ing}
                            </li>
                        ))}
                    </ul>
                    
                    {/* Missing Ingredients Section */}
                    {currentRecipe.missingIngredients && currentRecipe.missingIngredients.length > 0 && (
                        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 mt-4">
                            <h4 className="text-[10px] font-bold text-amber-600 uppercase mb-2 flex items-center">
                                <AlertTriangleIcon className="w-3 h-3 mr-1.5" />
                                {t('chef_missing_ingredients', lang)}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {currentRecipe.missingIngredients.map((item, i) => (
                                    <span key={i} className="text-xs font-bold text-amber-800 bg-white/50 px-2 py-1 rounded border border-amber-200">
                                        + {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide mb-3">{t('instructions', lang)}</h3>
                    <div className="space-y-4">
                        {currentRecipe.instructions.map((step, i) => (
                            <div key={i} className="flex">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                                    {i + 1}
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">{t('macros_est', lang)}</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                        <p className="text-lg font-bold text-slate-800">{currentRecipe.macrosEstimate.calories}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Kcal</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-slate-800">{currentRecipe.macrosEstimate.protein}g</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Pro</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-slate-800">{currentRecipe.macrosEstimate.carbs}g</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Carb</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-slate-800">{currentRecipe.macrosEstimate.fat}g</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Fat</p>
                    </div>
                </div>
            </div>
        </div>

        <button 
            onClick={reset}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg active:scale-95"
        >
            {t('btn_new_recipe', lang)}
        </button>
      </div>
    );
  }

  // Camera View
  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      {analyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 p-8 text-center">
            <div className="space-y-6 animate-pulse">
                <div className="w-24 h-24 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('generating_recipe', lang)}</h3>
                    <p className="text-orange-300 text-xs mt-1">{userProfile.conditions.join(", ")}</p>
                </div>
            </div>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 p-8 text-center text-white space-y-4">
            <AlertTriangleIcon className="w-12 h-12 text-red-500 mx-auto" />
            <p>{error}</p>
            <button onClick={reset} className="px-6 py-2 bg-white text-black rounded-full font-bold">Try Again</button>
        </div>
      ) : (
        <>
           <div className="flex-1 relative overflow-hidden bg-black" onClick={triggerFocus}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: focusing ? 'blur(2px)' : 'none' }}
                />
                
                {/* Header Overlay */}
                <div className="absolute top-6 left-0 right-0 flex flex-col items-center pointer-events-none px-6 text-center">
                    <div className="flex items-center space-x-2 bg-orange-500/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-400/50 shadow-lg">
                         <ChefHatIcon className="w-4 h-4 text-white" />
                         <span className="text-white text-xs font-bold uppercase tracking-wide">{t('chef_title', lang)}</span>
                    </div>
                    {images.length === 0 && (
                        <p className="text-white/80 text-[10px] mt-2 font-medium bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                            {t('chef_desc', lang)}
                        </p>
                    )}
                </div>

                {/* Focus visual */}
                {focusing && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className="w-64 h-64 border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center">
                             <p className="text-white/60 text-sm font-medium bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                                {t('cam_focusing', lang)}
                             </p>
                         </div>
                    </div>
                )}
           </div>

           {/* Controls Bar */}
           <div className="h-48 bg-black/90 backdrop-blur-md rounded-t-3xl border-t border-white/10 relative z-10 flex flex-col px-6 pt-4 pb-2">
                
                {/* Thumbnails Strip */}
                {images.length > 0 && (
                    <div className="flex space-x-3 overflow-x-auto mb-4 pb-2 no-scrollbar">
                        {images.map((img, i) => (
                            <div key={i} className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/20 group">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => removeImage(i)}
                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <TrashIcon className="w-4 h-4 text-white" />
                                </button>
                                <div className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-md">
                                    {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between mt-auto mb-4">
                     {/* Counter / Label */}
                    <div className="w-20 text-center">
                        {images.length > 0 ? (
                            <p className="text-white text-xs font-bold">
                                {images.length} <span className="text-white/50">{t('chef_photos_count', lang)}</span>
                            </p>
                        ) : (
                            <button 
                                onClick={(e) => { e.stopPropagation(); triggerFocus(); }}
                                className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 active:scale-95 transition-all"
                            >
                                <TargetIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Capture Button */}
                    <button
                        onClick={capture}
                        className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-full border-4 border-gray-800 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                            <ChefHatIcon className="w-8 h-8 text-white" />
                        </div>
                    </button>

                    {/* Generate Button */}
                    <div className="w-20 flex justify-end">
                        <button
                            onClick={handleGeneration}
                            disabled={images.length === 0}
                            className={`flex items-center justify-center space-x-1 px-4 py-3 rounded-full font-bold text-sm transition-all ${
                                images.length > 0 
                                ? 'bg-white text-black shadow-lg hover:bg-emerald-50' 
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <span>{t('chef_btn_cook', lang)}</span>
                            {images.length > 0 && <ChevronRightIcon className="w-3 h-3" />}
                        </button>
                    </div>
                </div>
           </div>
        </>
      )}
    </div>
  );
};