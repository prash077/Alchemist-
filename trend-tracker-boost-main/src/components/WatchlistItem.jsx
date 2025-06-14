
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Eye, Bell, X, Building, Users, Target } from 'lucide-react';

export const WatchlistItem = ({ item, onRemove, onViewDetails }) => {
  const [showMetrics, setShowMetrics] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'company': return Building;
      case 'competitor': return Users;
      case 'trend': return Target;
      default: return Building;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'company': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'competitor': return 'bg-red-100 text-red-700 border-red-200';
      case 'trend': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = () => {
    switch (item.trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const TypeIcon = getTypeIcon(item.type);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
              <TypeIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">{item.name}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="text-slate-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
            <Badge variant="outline" className={getTypeColor(item.type)}>
              {item.type}
            </Badge>
          </div>
          
          {item.alerts > 0 && (
            <div className="flex items-center gap-1">
              <Bell className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">{item.alerts} alerts</span>
            </div>
          )}
        </div>

        {showMetrics && (
          <div className="bg-slate-50 rounded-lg p-3 mb-3 space-y-2">
            {Object.entries(item.keyMetrics).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-slate-600 capitalize">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              )
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Updated {item.lastUpdate}</span>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMetrics(!showMetrics)}
              className="text-xs"
            >
              {showMetrics ? 'Hide' : 'Show'} Metrics
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(item)}
              className="text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
