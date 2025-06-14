import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, TrendingUp, X } from 'lucide-react';
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
    url?: string;
  }>;
}

export const AICommandCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { incrementActionsPerformed } = useGamification();

  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    incrementActionsPerformed();

    try {
      const GROQ_API_KEY = `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`;
      const GROQ_MODEL = "llama3-70b-8192";

      const systemPrompt = `
You are a startup market intelligence assistant. Given a query like "Trending in HealthTech EU?" or "Freemium launches this quarter", respond with:

- A brief summary insight paragraph.
- A list of 2-3 news-style insights with:
  - title
  - category (like Funding, Product, Regulation, etc.)
  - short summary
  - trend ("up", "down", or "stable")
  - optional url (if applicable)

Respond in JSON format with ONLY these keys:
{
  "response": "Short paragraph",
  "insights": [
    {
      "title": "...",
      "category": "...",
      "summary": "...",
      "trend": "up",
      "url": "https://..."
    }
  ]
}`;

      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          temperature: 0.7
        })
      });

      const result = await groqResponse.json();
      const content = result.choices?.[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);

      const aiResponse: AIResponse = {
        id: Date.now().toString(),
        query,
        response: parsed.response || `Here's what’s trending for "${query}":`,
        insights: parsed.insights || []
      };

      setResponses(prev => [aiResponse, ...prev]);
    } catch (error) {
      console.error("Groq API error:", error);
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
                          {insight.url ? (
                            <a
                              href={insight.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-indigo-600 hover:underline"
                            >
                              {insight.title}
                            </a>
                          ) : (
                            <h4 className="text-xs font-medium text-slate-800">{insight.title}</h4>
                          )}
                          <div className="flex items-center gap-1">
                            {insight.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                            {insight.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />}
                            {insight.trend === 'stable' && <div className="w-3 h-0.5 bg-slate-400" />}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs mb-1">{insight.category}</Badge>
                        <p className="text-xs text-slate-600">{insight.summary}</p>
                        {insight.url && (
                          <a
                            href={insight.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                          >
                            Read more →
                          </a>
                        )}
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
