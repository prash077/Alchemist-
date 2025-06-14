
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Bookmark, TrendingUp } from 'lucide-react';
import { WatchlistItem, WatchlistItemType } from './WatchlistItem';
import { AddToWatchlistModal } from './AddToWatchlistModal';
import { useGamification } from '@/contexts/GamificationContext';
import { useFounderPersona } from '@/components/FounderPersona';

const mockWatchlistItems: WatchlistItemType[] = [
  {
    id: '1',
    name: 'Stripe',
    type: 'competitor',
    description: 'Leading payment processing platform',
    category: 'Fintech',
    trend: 'up',
    lastUpdate: '2 hours ago',
    keyMetrics: {
      funding: '$2.2B',
      employees: '8,000+',
      revenue: '$12B ARR',
      growth: '+25% YoY'
    },
    alerts: 2
  },
  {
    id: '2',
    name: 'OpenAI API Usage Trends',
    type: 'trend',
    description: 'Enterprise adoption of AI APIs',
    category: 'AI/ML',
    trend: 'up',
    lastUpdate: '4 hours ago',
    keyMetrics: {
      growth: '+340% QoQ'
    },
    alerts: 1
  },
  {
    id: '3',
    name: 'Notion',
    type: 'company',
    description: 'All-in-one workspace for teams',
    category: 'Productivity',
    trend: 'stable',
    lastUpdate: '1 day ago',
    keyMetrics: {
      funding: '$343M',
      employees: '500+',
      revenue: '$100M ARR'
    },
    alerts: 0
  }
];

export const WatchlistPanel: React.FC = () => {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'company' | 'competitor' | 'trend'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { incrementItemsTracked } = useGamification();
  const { goals } = useFounderPersona();

  useEffect(() => {
    const saved = localStorage.getItem('watchlist-items');
    if (saved) {
      setWatchlistItems(JSON.parse(saved));
    } else {
      // Initialize with mock data and personalized suggestions
      const personalizedItems = mockWatchlistItems.filter(item => 
        goals.some(goal => 
          (goal === 'GTM' && item.category === 'Fintech') ||
          (goal === 'Scaling' && item.type === 'company') ||
          (goal === 'Fundraising' && item.type === 'competitor')
        )
      );
      setWatchlistItems(personalizedItems.length > 0 ? personalizedItems : mockWatchlistItems.slice(0, 2));
    }
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('watchlist-items', JSON.stringify(watchlistItems));
  }, [watchlistItems]);

  const filteredItems = watchlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddItem = (newItem: Omit<WatchlistItemType, 'id'>) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
    };
    setWatchlistItems(prev => [...prev, item]);
    incrementItemsTracked();
    setShowAddModal(false);
  };

  const handleRemoveItem = (id: string) => {
    setWatchlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleViewDetails = (item: WatchlistItemType) => {
    console.log('Viewing details for:', item);
    // This could open a detailed modal or navigate to a details page
  };

  const getTotalAlerts = () => {
    return watchlistItems.reduce((sum, item) => sum + item.alerts, 0);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              Your Watchlist
              {getTotalAlerts() > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {getTotalAlerts()} alerts
                </Badge>
              )}
            </CardTitle>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search watchlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {(['all', 'company', 'competitor', 'trend'] as const).map(type => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{watchlistItems.length}</div>
              <div className="text-xs text-blue-600">Items Tracked</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {watchlistItems.filter(item => item.trend === 'up').length}
              </div>
              <div className="text-xs text-green-600">Trending Up</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{getTotalAlerts()}</div>
              <div className="text-xs text-orange-600">Active Alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watchlist Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No items found</h3>
              <p className="text-slate-500 mb-4">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start tracking companies, competitors, and trends'}
              </p>
              {!searchTerm && filterType === 'all' && (
                <Button
                  onClick={() => setShowAddModal(true)}
                  variant="outline"
                  className="bg-white/50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Item
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredItems.map(item => (
            <WatchlistItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>

      <AddToWatchlistModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
};

export default WatchlistPanel;
