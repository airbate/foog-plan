import React, { useEffect, useState } from 'react';
import { getHistory, clearData, getProfile } from '../services/storage';
import { ScanRecord, RiskLevel, Language } from '../types';
import { InfoIcon, TrashIcon } from '../components/Icons';
import { t } from '../services/i18n';

export const History: React.FC = () => {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [lang, setLang] = useState<Language>('zh');

  useEffect(() => {
    setHistory(getHistory());
    const profile = getProfile();
    if (profile) setLang(profile.language);
  }, []);

  const handleClear = () => {
      if(window.confirm(t('confirm_clear', lang))) {
        clearData();
        setHistory([]);
        window.location.reload(); // Quick reset
      }
  }

  const getRiskLabel = (level: RiskLevel) => {
    switch(level) {
        case RiskLevel.SAFE: return t('RISK_SAFE', lang);
        case RiskLevel.MODERATE: return t('RISK_MODERATE', lang);
        case RiskLevel.RISKY: return t('RISK_RISKY', lang);
        default: return t('RISK_UNKNOWN', lang);
    }
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <InfoIcon className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-lg font-bold text-slate-700">{t('history_empty', lang)}</p>
        <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">{t('history_empty_desc', lang)}</p>
      </div>
    );
  }

  return (
    <div className="p-5 pb-24 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t('history_title', lang)}</h2>
        <button 
            onClick={handleClear} 
            className="text-rose-500 hover:bg-rose-50 p-2.5 rounded-full transition-all active:scale-95"
            aria-label="Clear History"
        >
            <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {history.map((record, index) => (
          <div 
            key={record.id} 
            className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 flex gap-4 transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-inner bg-slate-100 relative">
                <img 
                    src={record.imageUrl} 
                    alt={record.result.foodName} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800 text-lg truncate pr-2">{record.result.foodName}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border ${
                         record.result.riskLevel === RiskLevel.SAFE ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                         record.result.riskLevel === RiskLevel.MODERATE ? 'bg-amber-50 text-amber-700 border-amber-100' :
                         record.result.riskLevel === RiskLevel.RISKY ? 'bg-rose-50 text-rose-700 border-rose-100' :
                         'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                        {getRiskLabel(record.result.riskLevel)}
                    </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400 mb-2 uppercase tracking-wide">
                    {new Date(record.timestamp).toLocaleDateString()} • {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {record.result.riskReason}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};