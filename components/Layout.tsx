import React from 'react';
import { CameraIcon, HistoryIcon, UserIcon } from './Icons';
import { Language } from '../types';
import { t } from '../services/i18n';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: 'scan' | 'history' | 'profile';
  onTabChange: (tab: 'scan' | 'history' | 'profile') => void;
  language: Language;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange, language }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          {t('app_name', language)}
        </h1>
        <div className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-500">Beta</div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-20">
        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center space-y-1 ${
            currentTab === 'history' ? 'text-emerald-600' : 'text-gray-400'
          }`}
        >
          <HistoryIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{t('tab_history', language)}</span>
        </button>

        <button
          onClick={() => onTabChange('scan')}
          className="flex flex-col items-center justify-center -mt-8 bg-emerald-600 shadow-lg rounded-full w-14 h-14 text-white hover:bg-emerald-700 transition-colors border-4 border-gray-50"
        >
          <CameraIcon className="w-7 h-7" />
        </button>

        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center space-y-1 ${
            currentTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'
          }`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{t('tab_profile', language)}</span>
        </button>
      </nav>
    </div>
  );
};