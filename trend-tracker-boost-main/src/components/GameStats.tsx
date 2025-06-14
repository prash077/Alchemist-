
import React from 'react';
import { Trophy, Flame, Target, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const GameStats = () => {
  const stats = {
    streak: 7,
    xp: 1250,
    level: 3,
    insightsRead: 42,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const badges = [
    { name: 'Trend Tracker', icon: Target, earned: true },
    { name: 'Weekly Warrior', icon: Flame, earned: true },
    { name: 'Insight Master', icon: Star, earned: false },
    { name: 'Competition Spy', icon: Trophy, earned: false }
  ];

  return (
    <div className="space-y-4">
      {/* XP & Level Card */}
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="w-5 h-5" />
            Level {stats.level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{stats.xp} XP</span>
              <span>{1500 - stats.xp} to next level</span>
            </div>
            <Progress value={(stats.xp / 1500) * 100} className="h-2 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-600">
            <Flame className="w-5 h-5" />
            Daily Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.streak}</div>
            <div className="text-sm text-slate-600">days in a row</div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-green-600">
            <Target className="w-5 h-5" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{stats.weeklyProgress}/{stats.weeklyGoal} insights</span>
              <span>{Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%</span>
            </div>
            <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  badge.earned 
                    ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200' 
                    : 'bg-slate-100 opacity-50'
                }`}
              >
                <badge.icon className={`w-6 h-6 mx-auto mb-1 ${badge.earned ? 'text-yellow-600' : 'text-slate-400'}`} />
                <div className="text-xs font-medium">{badge.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
