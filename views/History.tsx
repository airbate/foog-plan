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
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
        <InfoIcon className="w-12 h-12 mb-4 text-gray-300" />
        <p>{t('history_empty', lang)}</p>
        <p className="text-sm mt-2">{t('history_empty_desc', lang)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('history_title', lang)}</h2>
        <button onClick={handleClear} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
            <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {history.map((record) => (
          <div key={record.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <img 
                src={record.imageUrl} 
                alt={record.result.foodName} 
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100"
            />
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate pr-2">{record.result.foodName}</h3>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                         record.result.riskLevel === RiskLevel.SAFE ? 'bg-green-100 text-green-700' :
                         record.result.riskLevel === RiskLevel.MODERATE ? 'bg-yellow-100 text-yellow-700' :
                         record.result.riskLevel === RiskLevel.RISKY ? 'bg-red-100 text-red-700' :
                         'bg-gray-100 text-gray-600'
                    }`}>
                        {getRiskLabel(record.result.riskLevel)}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 mb-2">
                    {new Date(record.timestamp).toLocaleDateString()} • {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
                    {record.result.riskReason}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};