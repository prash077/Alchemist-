
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Building, Users, Target, Plus } from 'lucide-react';
import { WatchlistItemType } from './WatchlistItem';

interface AddToWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<WatchlistItemType, 'id'>) => void;
}

const suggestedItems = {
  company: [
    { name: 'Figma', description: 'Design collaboration platform', category: 'Design Tools' },
    { name: 'Airtable', description: 'Low-code database platform', category: 'Productivity' },
    { name: 'Canva', description: 'Online design platform', category: 'Design Tools' }
  ],
  competitor: [
    { name: 'Slack', description: 'Team communication platform', category: 'Communication' },
    { name: 'Microsoft Teams', description: 'Collaboration suite', category: 'Communication' },
    { name: 'Discord', description: 'Community chat platform', category: 'Communication' }
  ],
  trend: [
    { name: 'No-Code Movement', description: 'Rise of visual development tools', category: 'Technology' },
    { name: 'Remote Work Tools', description: 'Distributed team collaboration', category: 'Workplace' },
    { name: 'AI Integration', description: 'AI features in SaaS products', category: 'AI/ML' }
  ]
};

export const AddToWatchlistModal: React.FC<AddToWatchlistModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedType, setSelectedType] = useState<'company' | 'competitor' | 'trend'>('company');
  const [customItem, setCustomItem] = useState({
    name: '',
    description: '',
    category: ''
  });
  const [showCustomForm, setShowCustomForm] = useState(false);

  if (!isOpen) return null;

  const handleAddSuggested = (item: typeof suggestedItems.company[0]) => {
    const newItem = {
      name: item.name,
      type: selectedType,
      description: item.description,
      category: item.category,
      trend: 'stable' as const,
      lastUpdate: 'just now',
      keyMetrics: {},
      alerts: 0
    };
    onAdd(newItem);
    resetForm();
  };

  const handleAddCustom = () => {
    if (!customItem.name || !customItem.description || !customItem.category) return;

    const newItem = {
      name: customItem.name,
      type: selectedType,
      description: customItem.description,
      category: customItem.category,
      trend: 'stable' as const,
      lastUpdate: 'just now',
      keyMetrics: {},
      alerts: 0
    };
    onAdd(newItem);
    resetForm();
  };

  const resetForm = () => {
    setCustomItem({ name: '', description: '', category: '' });
    setShowCustomForm(false);
    setSelectedType('company');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company': return Building;
      case 'competitor': return Users;
      case 'trend': return Target;
      default: return Building;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company': return 'from-blue-500 to-blue-600';
      case 'competitor': return 'from-red-500 to-red-600';
      case 'trend': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Add to Watchlist</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Type Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-slate-800">What would you like to track?</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['company', 'competitor', 'trend'] as const).map((type) => {
                const Icon = getTypeIcon(type);
                const isSelected = selectedType === type;
                
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <div className={`text-sm font-medium capitalize ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {type}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suggested Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-800">Suggested {selectedType}s</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomForm(!showCustomForm)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom
              </Button>
            </div>
            
            <div className="grid gap-3">
              {suggestedItems[selectedType].map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">{item.name}</h4>
                      <p className="text-sm text-slate-600">{item.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handleAddSuggested(item)}
                      className={`bg-gradient-to-r ${getTypeColor(selectedType)} hover:opacity-90`}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Item Form */}
          {showCustomForm && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium text-slate-800">Add Custom {selectedType}</h3>
              
              <div className="space-y-3">
                <Input
                  placeholder="Name"
                  value={customItem.name}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Description"
                  value={customItem.description}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  placeholder="Category"
                  value={customItem.category}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, category: e.target.value }))}
                />
                
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleAddCustom}
                    disabled={!customItem.name || !customItem.description || !customItem.category}
                    className={`flex-1 bg-gradient-to-r ${getTypeColor(selectedType)} hover:opacity-90`}
                  >
                    Add {selectedType}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCustomForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
