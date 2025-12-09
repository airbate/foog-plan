import React from 'react';
import { CameraIcon, HistoryIcon, UserIcon, BookOpenIcon, ChefHatIcon } from './Icons';
import { Language } from '../types';
import { t } from '../services/i18n';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: 'scan' | 'history' | 'profile' | 'guide' | 'chef';
  onTabChange: (tab: 'scan' | 'history' | 'profile' | 'guide' | 'chef') => void;
  language: Language;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange, language }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      {/* Sticky Glass Header */}
      <header className="absolute top-0 left-0 right-0 z-30 px-5 py-4 flex justify-between items-center glass-panel border-b border-white/50">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent tracking-tight">
          {t('app_name', language)}
        </h1>
        <div className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200 uppercase tracking-wide">Beta</div>
      </header>

      {/* Content Area - Add top padding to account for sticky header */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth no-scrollbar pt-16">
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="relative z-30 bg-white border-t border-slate-100 px-2 pb-6 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-end px-2">
          <NavButton 
            active={currentTab === 'history'} 
            onClick={() => onTabChange('history')} 
            icon={<HistoryIcon className="w-5 h-5" />} 
            label={t('tab_history', language)} 
          />

          <NavButton 
            active={currentTab === 'guide'} 
            onClick={() => onTabChange('guide')} 
            icon={<BookOpenIcon className="w-5 h-5" />} 
            label={t('tab_guide', language)} 
          />

          <div className="relative -top-5">
            <button
              onClick={() => onTabChange('scan')}
              className="flex items-center justify-center bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-200/50 shadow-lg rounded-2xl w-14 h-14 text-white hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white"
            >
              <CameraIcon className="w-6 h-6" />
            </button>
          </div>

          <NavButton 
            active={currentTab === 'chef'} 
            onClick={() => onTabChange('chef')} 
            icon={<ChefHatIcon className="w-5 h-5" />} 
            label={t('tab_chef', language)} 
          />

          <NavButton 
            active={currentTab === 'profile'} 
            onClick={() => onTabChange('profile')} 
            icon={<UserIcon className="w-5 h-5" />} 
            label={t('tab_profile', language)} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 w-14 transition-all duration-200 ${
      active 
        ? 'text-emerald-600 transform -translate-y-1' 
        : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    <div className={`${active ? 'bg-emerald-50 rounded-xl p-1' : ''}`}>
        {icon}
    </div>
    <span className={`text-[9px] font-semibold ${active ? 'opacity-100' : 'opacity-80'}`}>{label}</span>
  </button>
);