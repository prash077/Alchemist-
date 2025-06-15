import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const InsightLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [savedInsights, setSavedInsights] = useState([]);

  useEffect(() => {
  const fetchInsights = async () => {
    try {
      const res = await fetch('http://localhost:5173/api/insights');
      if (!res.ok) throw new Error('Failed to fetch insights');
      const data = await res.json();
      setSavedInsights(data);
    } catch (err) {
      console.error('Error fetching insights:', err);
    }
  };

  fetchInsights();
}, []);

const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5173/api/insights/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete insight');
    }

    // Remove deleted insight from UI
    setSavedInsights(prev => prev.filter(insight => insight._id !== id));
  } catch (err) {
    console.error(err);
  }
};


  const filters = ['all', 'Technology', 'Operations', 'Marketing', 'Finance'];

  const filteredInsights = savedInsights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || insight.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-12">
        <h2 className="text-2xl font-bold text-slate-800">Insight Library</h2>
        <Badge variant="secondary" className="bg-white/50">
          {savedInsights.length} saved insights
        </Badge>
      </div>

      {/* Search and Filter Bar */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50"
              />
            </div>
            
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="bg-white/50"
                >
                  {filter === 'all' ? 'All' : filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid gap-4">
        {filteredInsights.map((insight) => (
          <Card
            key={insight.id}
            className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight mb-2">{insight.title}</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {insight.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(insight.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <BookOpen className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-slate-700 text-sm leading-relaxed">{insight.summary}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {insight.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-slate-100">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button
  variant="destructive"
  size="sm"
  onClick={() => handleDelete(insight._id)}
>
  Delete
</Button>


              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No insights found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};