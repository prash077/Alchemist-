
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, Users, Rocket, Eye, X } from 'lucide-react';

export type FounderGoal = 'Fundraising' | 'Hiring' | 'GTM' | 'Scaling' | 'Stealth';

interface FounderPersonaProps {
  onPersonaComplete?: (goals: FounderGoal[]) => void;
}

const goalIcons = {
  Fundraising: TrendingUp,
  Hiring: Users,
  GTM: Target,
  Scaling: Rocket,
  Stealth: Eye,
};

const goalDescriptions = {
  Fundraising: 'Focus on investor updates, market trends, and funding news',
  Hiring: 'Prioritize talent insights, compensation data, and hiring trends', 
  GTM: 'Emphasize market entry strategies, customer acquisition, and competition',
  Scaling: 'Highlight operational insights, growth metrics, and expansion opportunities',
  Stealth: 'Provide discrete intel without revealing your focus areas',
};

export const FounderPersona: React.FC<FounderPersonaProps> = ({ onPersonaComplete }) => {
  const [selectedGoals, setSelectedGoals] = useState<FounderGoal[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const savedPersona = localStorage.getItem('founder-persona');
    if (savedPersona) {
      const parsed = JSON.parse(savedPersona);
      setSelectedGoals(parsed.goals || []);
      setIsCompleted(true);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleGoalToggle = (goal: FounderGoal) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleComplete = () => {
    const persona = {
      goals: selectedGoals,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('founder-persona', JSON.stringify(persona));
    setShowOnboarding(false);
    setIsCompleted(true);
    onPersonaComplete?.(selectedGoals);
  };

  const handleReset = () => {
    localStorage.removeItem('founder-persona');
    setSelectedGoals([]);
    setIsCompleted(false);
    setShowOnboarding(true);
  };

  if (showOnboarding) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome, Founder! 🚀
            </CardTitle>
            <p className="text-slate-600 mt-2">
              Let's personalize your digest experience. What are your current focus areas?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(goalIcons) as FounderGoal[]).map((goal) => {
                const Icon = goalIcons[goal];
                const isSelected = selectedGoals.includes(goal);
                
                return (
                  <div
                    key={goal}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-6 h-6 mt-1 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <div>
                        <h3 className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                          {goal}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {goalDescriptions[goal]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-slate-500">
                Select 1-3 areas that matter most to you right now
              </p>
              <Button
                onClick={handleComplete}
                disabled={selectedGoals.length === 0}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Complete Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Your Founder DNA</h3>
                <div className="flex gap-2 mt-1">
                  {selectedGoals.map(goal => (
                    <Badge key={goal} variant="secondary" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export const useFounderPersona = () => {
  const [goals, setGoals] = useState<FounderGoal[]>([]);

  useEffect(() => {
    const savedPersona = localStorage.getItem('founder-persona');
    if (savedPersona) {
      const parsed = JSON.parse(savedPersona);
      setGoals(parsed.goals || []);
    }
  }, []);

  return { goals };
};
