import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Onboarding } from './views/Onboarding';
import { CameraScan } from './views/CameraScan';
import { History } from './views/History';
import { Profile } from './views/Profile';
import { IngredientGuide } from './views/IngredientGuide';
import { RecipeGenerator } from './views/RecipeGenerator';
import { UserProfile } from './types';
import { getProfile, createInitialProfile, saveProfile } from './services/storage';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<'scan' | 'history' | 'profile' | 'guide' | 'chef'>('scan');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile on mount
    const saved = getProfile();
    if (saved) {
      setProfile(saved);
    } else {
      setProfile(createInitialProfile());
    }
    setLoading(false);
  }, []);

  if (loading || !profile) {
    return <div className="min-h-screen flex items-center justify-center bg-emerald-50 text-emerald-600">Loading NutriGuard...</div>;
  }

  // If not onboarded (no name or no flag), show onboarding
  if (!profile.onboarded) {
    return <Onboarding initialProfile={profile} onComplete={setProfile} />;
  }

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab} language={profile.language}>
      {currentTab === 'scan' && (
        <CameraScan 
          userProfile={profile} 
          onAnalysisComplete={() => setCurrentTab('history')} 
        />
      )}
      {currentTab === 'history' && <History />}
      {currentTab === 'guide' && <IngredientGuide userProfile={profile} />}
      {currentTab === 'chef' && <RecipeGenerator userProfile={profile} />}
      {currentTab === 'profile' && (
        <Profile 
          profile={profile} 
          onUpdate={setProfile} 
        />
      )}
    </Layout>
  );
};

export default App;