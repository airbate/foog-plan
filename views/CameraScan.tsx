
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { analyzeFoodImage } from '../services/gemini';
import { UserProfile, AnalysisResult, RiskLevel, ScanRecord } from '../types';
import { saveScan } from '../services/storage';
import { AlertTriangleIcon, CheckIcon, SparklesIcon, SunIcon, TargetIcon, InfoIcon } from '../components/Icons';
import { t } from '../services/i18n';

interface CameraScanProps {
  userProfile: UserProfile;
  onAnalysisComplete: () => void;
}

export const CameraScan: React.FC<CameraScanProps> = ({ userProfile, onAnalysisComplete }) => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nutrientMode, setNutrientMode] = useState<'amount' | 'percent'>('amount');
  const [focusing, setFocusing] = useState(false);

  const lang = userProfile.language;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      handleAnalysis(imageSrc);
    }
  }, [webcamRef]);

  const triggerFocus = useCallback(async () => {
    if (focusing || image) return;
    setFocusing(true);
    
    // Visual feedback delay
    setTimeout(() => setFocusing(false), 800);

    // Try hardware focus if available
    try {
        const stream = webcamRef.current?.video?.srcObject as MediaStream;
        const track = stream?.getVideoTracks()[0];
        
        if (track && track.applyConstraints) {
             await track.applyConstraints({ 
                advanced: [{ focusMode: 'continuous' } as any] 
             });
        }
    } catch(e) {
        console.warn("Focus constraint not supported", e);
    }
  }, [webcamRef, focusing, image]);

  const handleAnalysis = async (imgSrc: string) => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const data = await analyzeFoodImage(imgSrc, userProfile.conditions, lang);
      setResult(data);
      
      // Save to history
      const record: ScanRecord = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        imageUrl: imgSrc,
        result: data
      };
      saveScan(record);
      
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  const getRiskLabel = (level: RiskLevel) => {
      switch(level) {
          case RiskLevel.SAFE: return t('RISK_SAFE', lang);
          case RiskLevel.MODERATE: return t('RISK_MODERATE', lang);
          case RiskLevel.RISKY: return t('RISK_RISKY', lang);
          default: return t('RISK_UNKNOWN', lang);
      }
  }

  if (result) {
    return (
      <div className="p-4 pb-24 animate-fade-in">
        <div className="relative mb-6">
          <img src={image!} alt="Captured food" className="w-full h-48 object-cover rounded-xl shadow-md" />
          <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl`}>
             <h2 className="text-white font-bold text-xl">{result.foodName}</h2>
          </div>
        </div>

        {/* Risk Badge */}
        <div className={`flex flex-col p-4 rounded-xl mb-6 shadow-sm border ${
            result.riskLevel === RiskLevel.SAFE ? 'bg-green-50 border-green-200 text-green-800' :
            result.riskLevel === RiskLevel.MODERATE ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
            result.riskLevel === RiskLevel.RISKY ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-gray-100 border-gray-200 text-gray-800'
        }`}>
            <div className="flex items-center">
                <div className={`p-2 rounded-full mr-4 ${
                    result.riskLevel === RiskLevel.SAFE ? 'bg-green-200' :
                    result.riskLevel === RiskLevel.MODERATE ? 'bg-yellow-200' :
                    result.riskLevel === RiskLevel.RISKY ? 'bg-red-200' : 'bg-gray-200'
                }`}>
                    {result.riskLevel === RiskLevel.SAFE ? <CheckIcon className="w-6 h-6" /> : <AlertTriangleIcon className="w-6 h-6" />}
                </div>
                <div>
                    <p className="text-sm font-bold opacity-70">{t('risk_level', lang)}</p>
                    <p className="text-xl font-bold tracking-wide">{getRiskLabel(result.riskLevel)}</p>
                </div>
            </div>

            {/* Triggered Conditions - Visually Distinct Highlight */}
            {result.riskLevel !== RiskLevel.SAFE && result.triggeredConditions && result.triggeredConditions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-black/10">
                    <p className="text-xs font-bold uppercase mb-2 opacity-90 flex items-center tracking-wider">
                        <AlertTriangleIcon className="w-4 h-4 mr-1.5" />
                        {t('triggered_by', lang)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {result.triggeredConditions.map((cond, idx) => (
                            <div key={idx} className={`px-3 py-2 rounded-lg shadow-sm border flex items-center ${
                                result.riskLevel === RiskLevel.RISKY 
                                ? 'bg-white text-red-700 border-red-200 ring-1 ring-red-200' 
                                : 'bg-white text-yellow-800 border-yellow-200 ring-1 ring-yellow-200'
                            }`}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${
                                    result.riskLevel === RiskLevel.RISKY ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></span>
                                <span className="text-sm font-extrabold">
                                    {cond}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4 mb-6">
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-1">{t('section_why', lang)}</h3>
                <p className="font-medium text-gray-800">{result.riskReason}</p>
            </div>
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-1">{t('section_detailed', lang)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{result.detailedAnalysis}</p>
            </div>
             <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-1">{t('section_recommendation', lang)}</h3>
                <p className="text-emerald-700 font-medium bg-emerald-50 p-2 rounded-lg inline-block">
                    {result.portionRecommendation}
                </p>
            </div>
        </div>

        {/* Smart Alternatives Card */}
        {result.alternatives && result.alternatives.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-5 mb-6">
                <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                        <SparklesIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-blue-800 uppercase">{t('smart_swaps', lang)}</h3>
                </div>
                <div className="space-y-3">
                    {result.alternatives.map((alt, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                            <p className="font-bold text-gray-800 text-sm">{alt.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{alt.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Nutrition Grid - Interactive */}
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="text-sm font-bold text-gray-800">Nutritional Estimate</h3>
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                     <button
                        onClick={() => setNutrientMode('amount')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${nutrientMode === 'amount' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                     >
                        Unit
                     </button>
                     <button
                        onClick={() => setNutrientMode('percent')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${nutrientMode === 'percent' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                     >
                        % DV
                     </button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <NutrientCard 
                    label={t('nut_calories', lang)} 
                    description={t('nut_calories_desc', lang)}
                    value={result.nutrients.calories} 
                    unit="kcal" 
                    max={2000} 
                    viewMode={nutrientMode}
                />
                <NutrientCard 
                    label={t('nut_carbs', lang)} 
                    description={t('nut_carbs_desc', lang)}
                    value={result.nutrients.carbs} 
                    unit="g" 
                    max={275} 
                    viewMode={nutrientMode}
                />
                <NutrientCard 
                    label={t('nut_protein', lang)} 
                    description={t('nut_protein_desc', lang)}
                    value={result.nutrients.protein} 
                    unit="g" 
                    max={50} 
                    viewMode={nutrientMode}
                />
                <NutrientCard 
                    label={t('nut_fat', lang)} 
                    description={t('nut_fat_desc', lang)}
                    value={result.nutrients.fat} 
                    unit="g" 
                    max={78} 
                    viewMode={nutrientMode}
                />
                <NutrientCard 
                    label={t('nut_sugar', lang)} 
                    description={t('nut_sugar_desc', lang)}
                    value={result.nutrients.sugar} 
                    unit="g" 
                    max={50} 
                    highlight={result.riskLevel !== RiskLevel.SAFE && result.nutrients.sugar > 10} 
                    viewMode={nutrientMode}
                />
                <NutrientCard 
                    label={t('nut_sodium', lang)} 
                    description={t('nut_sodium_desc', lang)}
                    value={result.nutrients.sodium} 
                    unit="mg" 
                    max={2300} 
                    highlight={result.riskLevel !== RiskLevel.SAFE && result.nutrients.sodium > 400} 
                    viewMode={nutrientMode}
                />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-right">{t('dv_note', lang)}</p>
        </div>

        <button 
            onClick={reset}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
        >
            {t('btn_scan_again', lang)}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      {!image ? (
        <>
            <div className="flex-1 relative overflow-hidden" onClick={triggerFocus}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                    style={{ filter: focusing ? 'blur(2px)' : 'none' }}
                />
                
                {/* Darker Gradient Overlay for better text visibility */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

                {/* Lighting Tip */}
                <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                         <SunIcon className="w-4 h-4 text-yellow-400" />
                         <span className="text-white/90 text-xs font-medium">{t('cam_tip_light', lang)}</span>
                    </div>
                </div>

                {/* Viewfinder Overlay */}
                <div className="absolute inset-0 m-8 pointer-events-none flex flex-col items-center justify-center">
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/60 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/60 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white/60 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white/60 rounded-br-xl"></div>
                    
                    {/* Center Crosshair */}
                    <div className="opacity-50">
                        <div className="w-8 h-0.5 bg-white/50 mb-3 mx-auto"></div>
                        <div className="h-8 w-0.5 bg-white/50 -mt-7 mx-auto"></div>
                    </div>

                    <div className="absolute -bottom-8 text-white/70 text-sm font-medium tracking-wide">
                        {focusing ? t('cam_focusing', lang) : t('align_food', lang)}
                    </div>
                </div>
            </div>
            
            <div className="h-40 bg-black/90 backdrop-blur-sm flex items-center justify-center relative z-10 px-8">
                {/* Focus Button */}
                <button 
                    onClick={(e) => { e.stopPropagation(); triggerFocus(); }}
                    className="absolute left-10 p-4 bg-gray-800 rounded-full text-white hover:bg-gray-700 active:scale-95 transition-all"
                >
                    <TargetIcon className="w-6 h-6" />
                </button>

                {/* Capture Button */}
                <button
                    onClick={capture}
                    className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                    <div className="w-16 h-16 bg-white border-2 border-black rounded-full ring-2 ring-gray-100"></div>
                </button>

                 {/* Spacer to balance Focus Button */}
                 <div className="absolute right-10 w-14"></div>
            </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-8 text-center">
            {analyzing && (
                <div className="space-y-6 animate-pulse">
                    <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('analyzing', lang)}</h3>
                        <p className="text-gray-400 text-sm">{t('checking_profile', lang)}</p>
                        <p className="text-emerald-400 text-xs mt-1">{userProfile.conditions.join(", ")}</p>
                    </div>
                </div>
            )}
            {error && (
                 <div className="text-white space-y-4">
                    <AlertTriangleIcon className="w-12 h-12 text-red-500 mx-auto" />
                    <p>{error}</p>
                    <button onClick={reset} className="px-6 py-2 bg-white text-black rounded-full font-bold">Try Again</button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

interface NutrientCardProps {
    label: string;
    description: string;
    value: number;
    unit: string;
    max: number; // Daily Value max
    highlight?: boolean;
    viewMode: 'amount' | 'percent';
}

const NutrientCard = ({ label, description, value, unit, max, highlight = false, viewMode }: NutrientCardProps) => {
    const [showInfo, setShowInfo] = useState(false);
    const percentage = Math.min(100, Math.round((value / max) * 100));
    const barColor = highlight ? 'bg-red-500' : (percentage > 50 ? 'bg-blue-500' : 'bg-emerald-500');

    // Display Logic
    const mainValue = viewMode === 'amount' ? `${value}` : `${percentage}%`;
    const mainUnit = viewMode === 'amount' ? unit : '';
    const subText = viewMode === 'amount' 
        ? `${percentage}% DV` 
        : `${value}${unit} / ${max}${unit}`;

    return (
        <div className={`p-3 rounded-lg w-full transition-all relative ${highlight ? 'bg-red-50 border border-red-100' : 'bg-gray-50 border border-gray-100 hover:border-emerald-200'}`}>
            {showInfo && (
                <div 
                    className="absolute inset-0 z-10 bg-slate-800/95 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center text-center cursor-pointer animate-fade-in"
                    onClick={() => setShowInfo(false)}
                >
                    <p className="text-[10px] text-white font-medium leading-relaxed">{description}</p>
                </div>
            )}
            
            <div className="flex justify-between items-end mb-1">
                 <button 
                    onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
                    className="flex items-center space-x-1.5 focus:outline-none group"
                >
                    <p className={`text-xs font-bold uppercase ${highlight ? 'text-red-600' : 'text-gray-400 group-hover:text-blue-600 transition-colors'}`}>{label}</p>
                    <InfoIcon className={`w-3 h-3 transition-colors ${highlight ? 'text-red-300' : 'text-gray-300 group-hover:text-blue-500'}`} />
                </button>
                <p className="text-sm font-bold text-gray-800">
                    {mainValue}
                    <span className="text-[10px] font-normal text-gray-500 ml-0.5">{mainUnit}</span>
                </p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                    className={`h-1.5 rounded-full ${barColor}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            
            <p className="text-[9px] text-right text-gray-400 mt-1 h-3 font-medium">
                {subText}
            </p>
        </div>
    );
};
