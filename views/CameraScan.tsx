import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { analyzeFoodImage } from '../services/gemini';
import { UserProfile, AnalysisResult, RiskLevel, ScanRecord } from '../types';
import { saveScan } from '../services/storage';
import { AlertTriangleIcon, CheckIcon } from '../components/Icons';
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

  const lang = userProfile.language;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      handleAnalysis(imageSrc);
    }
  }, [webcamRef]);

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

            {/* Triggered Conditions */}
            {result.riskLevel !== RiskLevel.SAFE && result.triggeredConditions && result.triggeredConditions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-black/5">
                    <p className="text-xs font-bold uppercase mb-2 opacity-70">{t('triggered_by', lang)}</p>
                    <div className="flex flex-wrap gap-2">
                        {result.triggeredConditions.map((cond, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white/60 rounded-md text-xs font-bold shadow-sm">
                                {cond}
                            </span>
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
            {result.alternativeSuggestion && (
                 <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-1">{t('section_alternative', lang)}</h3>
                    <p className="text-blue-600 font-medium">{result.alternativeSuggestion}</p>
                </div>
            )}
        </div>

        {/* Nutrition Grid */}
        <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3 ml-1">Nutritional Estimate (Approx.)</h3>
            <div className="grid grid-cols-2 gap-3">
                <NutrientCard label={t('nut_calories', lang)} value={result.nutrients.calories} unit="kcal" max={2000} />
                <NutrientCard label={t('nut_carbs', lang)} value={result.nutrients.carbs} unit="g" max={275} />
                <NutrientCard label={t('nut_protein', lang)} value={result.nutrients.protein} unit="g" max={50} />
                <NutrientCard label={t('nut_fat', lang)} value={result.nutrients.fat} unit="g" max={78} />
                <NutrientCard label={t('nut_sugar', lang)} value={result.nutrients.sugar} unit="g" max={50} highlight={result.riskLevel !== RiskLevel.SAFE && result.nutrients.sugar > 10} />
                <NutrientCard label={t('nut_sodium', lang)} value={result.nutrients.sodium} unit="mg" max={2300} highlight={result.riskLevel !== RiskLevel.SAFE && result.nutrients.sodium > 400} />
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
    <div className="flex flex-col h-full bg-black relative">
      {!image ? (
        <>
            <div className="flex-1 relative overflow-hidden">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 border-2 border-white/30 m-8 rounded-3xl pointer-events-none flex items-center justify-center">
                    <div className="text-white/70 text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        {t('align_food', lang)}
                    </div>
                </div>
            </div>
            
            <div className="h-32 bg-black flex items-center justify-center relative z-10">
                <button
                onClick={capture}
                className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                <div className="w-16 h-16 bg-white border-2 border-black rounded-full"></div>
                </button>
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
    value: number;
    unit: string;
    max: number; // Daily Value max
    highlight?: boolean;
}

const NutrientCard = ({ label, value, unit, max, highlight = false }: NutrientCardProps) => {
    const percentage = Math.min(100, Math.round((value / max) * 100));
    
    // Color logic: if highlight is true OR high percentage of a "limit" nutrient, warn user
    // Simple logic: Green if low %, Yellow/Red if high % for nutrients typically limited (Fat, Sodium, Sugar)
    // For Protein/Carbs, usually high is okay, but context matters.
    // Here we use simple blue/green, unless highlighted by parent component logic.
    
    const barColor = highlight ? 'bg-red-500' : (percentage > 50 ? 'bg-blue-500' : 'bg-emerald-500');

    return (
        <div className={`p-3 rounded-lg ${highlight ? 'bg-red-50 border border-red-100' : 'bg-gray-50 border border-gray-100'}`}>
            <div className="flex justify-between items-end mb-1">
                <p className={`text-xs font-bold uppercase ${highlight ? 'text-red-600' : 'text-gray-400'}`}>{label}</p>
                <p className="text-sm font-bold text-gray-800">{value}<span className="text-[10px] font-normal text-gray-500 ml-0.5">{unit}</span></p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                    className={`h-1.5 rounded-full ${barColor}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-[9px] text-right text-gray-400 mt-1">{percentage}% DV</p>
        </div>
    );
};