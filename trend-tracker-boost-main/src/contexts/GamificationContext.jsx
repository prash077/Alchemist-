
import React, { createContext, useContext, useState, useEffect } from 'react';

const initialBadges = [
  { id: 'first-insight', name: 'Insight Explorer', description: 'Read your first insight', icon: '🔍', unlocked: false },
  { id: 'streak-3', name: 'Consistent Reader', description: '3-day reading streak', icon: '🔥', unlocked: false },
  { id: 'actions-5', name: 'Action Taker', description: 'Complete 5 actions', icon: '⚡', unlocked: false },
  { id: 'watchlist-pro', name: 'Market Hawk', description: 'Track 5 items in watchlist', icon: '👁️', unlocked: false },
  { id: 'executor', name: 'Strategic Operator', description: 'Execute 10 "Act Now" items', icon: '🚀', unlocked: false },
];

const GamificationContext = createContext(undefined);

export const GamificationProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('gamification-state');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: '',
      actionsPerformed: 0,
      insightsRead: 0,
      itemsTracked: 0,
      executions: 0,
      badges: initialBadges,
    };
  });

  useEffect(() => {
    localStorage.setItem('gamification-state', JSON.stringify(state));
  }, [state]);

  const calculateLevel = (xp) => Math.floor(xp / 100) + 1;

  const addXP = (points) => {
    setState(prev => ({
      ...prev,
      xp: prev.xp + points,
      level: calculateLevel(prev.xp + points),
    }));
  };

  const incrementInsightsRead = () => {
    setState(prev => ({
      ...prev,
      insightsRead: prev.insightsRead + 1,
    }));
    addXP(50);
    
    // Check for first insight badge
    if (state.insightsRead === 0) {
      unlockBadge('first-insight');
    }
  };

  const incrementActionsPerformed = () => {
    setState(prev => ({
      ...prev,
      actionsPerformed: prev.actionsPerformed + 1,
    }));
    addXP(25);
    
    if (state.actionsPerformed + 1 >= 5) {
      unlockBadge('actions-5');
    }
  };

  const incrementItemsTracked = () => {
    setState(prev => ({
      ...prev,
      itemsTracked: prev.itemsTracked + 1,
    }));
    addXP(30);
    
    if (state.itemsTracked + 1 >= 5) {
      unlockBadge('watchlist-pro');
    }
  };

  const incrementExecutions = () => {
    setState(prev => ({
      ...prev,
      executions: prev.executions + 1,
    }));
    addXP(75);
    
    if (state.executions + 1 >= 10) {
      unlockBadge('executor');
    }
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    setState(prev => {
      if (prev.lastActiveDate === yesterday) {
        const newStreak = prev.streak + 1;
        if (newStreak >= 3) {
          unlockBadge('streak-3');
        }
        return {
          ...prev,
          streak: newStreak,
          lastActiveDate: today,
        };
      } else if (prev.lastActiveDate === today) {
        return prev;
      } else {
        return {
          ...prev,
          streak: 1,
          lastActiveDate: today,
        };
      }
    });
  };

  const unlockBadge = (badgeId) => {
    setState(prev => ({
      ...prev,
      badges: prev.badges.map(badge =>
        badge.id === badgeId && !badge.unlocked
          ? { ...badge, unlocked: true, unlockedAt: new Date() }
          : badge
      ),
    }));
  };

  return (
    <GamificationContext.Provider
      value={{
        state,
        addXP,
        incrementInsightsRead,
        incrementActionsPerformed,
        incrementItemsTracked,
        incrementExecutions,
        updateStreak,
        unlockBadge,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
