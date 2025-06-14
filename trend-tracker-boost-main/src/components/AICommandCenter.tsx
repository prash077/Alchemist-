import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, TrendingUp, Users, DollarSign, X } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';



interface AIResponse {
  id: string;
  query: string;
  response: string;
  insights: Array<{
    title: string;
    category: string;
    summary: string;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export const AICommandCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { incrementActionsPerformed } = useGamification();

  const mockResponses: Record<string, AIResponse> = {
    'healthtech': {
      id: '1',
      query: 'Trending in healthtech EU?',
      response: 'European healthtech is experiencing significant growth in AI diagnostics and telemedicine platforms. Key trends include regulatory compliance solutions and cross-border patient data sharing.',
      insights: [
        {
          title: 'Doctolib raises €500M Series F',
          category: 'Funding',
          summary: 'French telemedicine giant expands across Europe',
          trend: 'up'
        },
        {
          title: 'GDPR compliance tools surge 40%',
          category: 'Regulation',
          summary: 'Healthcare startups prioritize data protection',
          trend: 'up'
        }
      ]
    },
    'freemium': {
      id: '2',
      query: 'Freemium launches this quarter?',
      response: 'Q4 has seen 47 freemium model launches, with productivity tools and developer platforms leading. Conversion rates average 3.2% for B2B SaaS.',
      insights: [
        {
          title: 'Notion-style tools trending',
          category: 'Product',
          summary: 'All-in-one workspace platforms gaining traction',
          trend: 'up'
        },
        {
          title: 'API-first companies grow 25%',
          category: 'Developer Tools',
          summary: 'Developer-focused freemium models showing strong adoption',
          trend: 'up'
        }
      ]
    }
  };

  const handleQuery = async () => {
  if (!query.trim()) return;

  setIsLoading(true);
  incrementActionsPerformed();

  try {
   const apiKey ='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';

if (!apiKey) {
  console.error("❌ GNews API key is missing!");
  return;
}
const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${apiKey}&lang=en&max=3`;

const res = await fetch(url);
const data = await res.json();


    const insights = (data.articles || []).map((article: any) => ({
      title: article.title,
      category: 'Market Intelligence', // Or derive based on title
      summary: article.description || 'No summary available.',
      trend: 'up' as const
    }));

    const aiResponse: AIResponse = {
      id: Date.now().toString(),
      query,
      response: `Here's what’s trending for "${query}":`,
      insights
    };

    setResponses(prev => [aiResponse, ...prev]);
  } catch (error) {
    console.error(error);
    setResponses(prev => [{
      id: Date.now().toString(),
      query,
      response: `Unable to fetch insights for "${query}". Please try again later.`,
      insights: []
    }, ...prev]);
  } finally {
    setQuery('');
    setIsLoading(false);
  }
};

    
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuery();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-xl"
        size="icon"
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96 max-h-[80vh] flex flex-col">
      <Card className="bg-white shadow-2xl border-0 flex-1 flex flex-col">
        <CardHeader className="pb-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Command Center
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm opacity-90">Ask me about startup trends, markets, or competitors</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 max-h-96 overflow-hidden">
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {responses.length === 0 && (
              <div className="text-center text-slate-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm">Try asking:</p>
                <div className="mt-2 space-y-1">
                  <div className="text-xs bg-slate-100 rounded px-2 py-1">"Trending in healthtech EU?"</div>
                  <div className="text-xs bg-slate-100 rounded px-2 py-1">"Freemium launches this quarter?"</div>
                </div>
              </div>
            )}
            
            {responses.map((response) => (
              <div key={response.id} className="space-y-3">
                <div className="bg-slate-100 rounded-lg p-3">
                  <p className="text-sm font-medium text-slate-700">{response.query}</p>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100">
                  <p className="text-sm text-slate-700 mb-3">{response.response}</p>
                  
                  <div className="space-y-2">
                    {response.insights.map((insight, idx) => (
                      <div key={idx} className="bg-white rounded p-2 border border-indigo-100">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-xs font-medium text-slate-800">{insight.title}</h4>
                          <div className="flex items-center gap-1">
                            {insight.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                            {insight.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />}
                            {insight.trend === 'stable' && <div className="w-3 h-0.5 bg-slate-400" />}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs mb-1">{insight.category}</Badge>
                        <p className="text-xs text-slate-600">{insight.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-200" />
                  <span className="text-sm text-slate-600 ml-2">Analyzing startup intel...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about trends, markets, or competitors..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleQuery}
              disabled={!query.trim() || isLoading}
              size="icon"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};