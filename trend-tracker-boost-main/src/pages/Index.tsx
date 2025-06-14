import React, { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DigestCards } from '@/components/DigestCards';
import { GameStats } from '@/components/GameStats';
import { InsightLibrary } from '@/components/InsightLibrary';
import { WatchlistPanel } from '@/components/WatchlistPanel';
import { AchievementToast } from '@/components/AchievementToast';
import { FounderPersona } from '@/components/FounderPersona';
import { AICommandCenter } from '@/components/AICommandCenter';
import { GamificationProvider } from '@/contexts/GamificationContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('digest');
  const [showAchievement, setShowAchievement] = useState(false);
  const [searchTopic, setSearchTopic] = useState('AI'); // default topic

  const handleInsightRead = () => {
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 3000);
  };

  const handleSearch = (topic: string) => {
    setSearchTopic(topic);
  };

  return (
    <GamificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <DashboardHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSearch={handleSearch}
          />

          {activeTab === 'digest' && (
            <>
              <div className="mt-6">
                <FounderPersona
                  onPersonaComplete={(goals) => {
                    if (goals.length > 0) setSearchTopic(goals[0]);
                  }}
                />
              </div>

              {/* Main content layout */}
              <div className="flex gap-6 mt-8">
                {/* Left Column */}
                <div className="w-full lg:w-1/4 flex-shrink-0">
                  <GameStats />
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-3/4">
                  <div
                    className="max-h-[80vh] overflow-y-auto pr-2 pb-32 space-y-4"
                    style={{ minHeight: '100%' }}
                  >
                    <DigestCards
                      onInsightRead={handleInsightRead}
                      topic={searchTopic}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'library' && (
            <div className="mt-12">
              <InsightLibrary />
            </div>
          )}

          {activeTab === 'watchlist' && (
            <div className="mt-12">
              <WatchlistPanel />
            </div>
          )}
        </div>

        <AICommandCenter />

        {activeTab === 'digest' && (
          <AchievementToast
            show={showAchievement}
            achievement="Insight Explorer"
            description="You've read your first insight of the day!"
          />
        )}
      </div>
    </GamificationProvider>
  );
};

export default Index;
