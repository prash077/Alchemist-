
// import React, { useEffect, useState } from 'react';
// import {
//   TrendingUp, Users, Lightbulb, ExternalLink,
//   BookmarkPlus, Eye, Share, Mail, FileText
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { ActNowModal } from '@/components/ActNowModal';
// import { useGamification } from '@/contexts/GamificationContext';
// import { useFounderPersona } from '@/contexts/FounderPersona';
// import { fetchNewsFromNewsAPI } from '@/lib/newsApi';
// import type { FounderGoal } from '@/contexts/FounderPersona';

// interface Insight {
//   id: number;
//   type: 'trend' | 'competitor' | 'insight';
//   title: string;
//   summary: string;
//   category: string;
//   impact: 'High' | 'Medium';
//   actionable: string;
//   source: string;
//   readTime: string;
//   xpReward: number;
//   url: string;
//   relevantToGoals: FounderGoal[];
  
// }

// interface DigestCardsProps {
//   onInsightRead: () => void;
//   topic: string;
// }

// export const DigestCards = ({ onInsightRead, topic }: DigestCardsProps) => {
//   const [readInsights, setReadInsights] = useState<Set<number>>(new Set());
//   const [insights, setInsights] = useState<Insight[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actNowModal, setActNowModal] = useState({
//     isOpen: false,
//     action: 'linkedin' as 'linkedin' | 'email' | 'notion',
//     insightData: null as any,
//   });

//   const { incrementInsightsRead, updateStreak } = useGamification();
//   const { goals } = useFounderPersona();

//   useEffect(() => {
//     const getNews = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const articles = await fetchNewsFromNewsAPI(topic);
//         setInsights(
//         articles.map((article, index) => 
//         {
//           const title = article.title;
//           const summary = article.description?.slice(0, 300) ?? 'No summary available.';
//           const actionable = `Think about how "${title}" could affect your startup strategy.`;

//     return {
//       id: index + 1,
//       type: index % 3 === 0 ? 'trend' : index % 3 === 1 ? 'competitor' : 'insight',
//       title,
//       summary,
//       category: article.source.name || 'General',
//       impact: index % 2 === 0 ? 'High' : 'Medium',
//       actionable,
//       source: article.source.name,
//       readTime: '3 min',
//       xpReward: 30 + index * 5,
//       url: article.url,
//       relevantToGoals: ['GTM', 'Scaling', 'Fundraising', 'Hiring'],
//     };
//   })
// );
//       } catch (err) {
//         setError('Failed to fetch insights. Please try again later.');
//         console.error('❌ Error fetching news:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getNews();
//   }, [topic]);

//   const getIconForType = (type: string) => {
//     switch (type) {
//       case 'trend': return TrendingUp;
//       case 'competitor': return Users;
//       case 'insight': return Lightbulb;
//       default: return TrendingUp;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'trend': return 'from-blue-500 to-cyan-500';
//       case 'competitor': return 'from-red-500 to-pink-500';
//       case 'insight': return 'from-green-500 to-emerald-500';
//       default: return 'from-gray-500 to-slate-500';
//     }
//   };

//   const handleReadInsight = (id: number) => {
//     if (!readInsights.has(id)) {
//       setReadInsights(prev => new Set(prev).add(id));
//       incrementInsightsRead();
//       updateStreak();
//       onInsightRead();
//     }
//   };

//   const handleActNow = (action: 'linkedin' | 'email' | 'notion', insight: Insight) => {
//     setActNowModal({
//       isOpen: true,
//       action,
//       insightData: {
//         title: insight.title,
//         summary: insight.summary,
//         category: insight.category,
//         source: insight.source,
//       },
//     });
//   };

//   const sortedInsights = [...insights].sort((a, b) => {
//     const aRelevance = a.relevantToGoals.some(goal => goals.includes(goal));
//     const bRelevance = b.relevantToGoals.some(goal => goals.includes(goal));
//     return Number(bRelevance) - Number(aRelevance);
//   });

//   return (
//     <div className="space-y-6">
//       <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 px-2 flex justify-between items-center">
//   <h2 className="text-2xl font-bold text-slate-800">Today's Insights</h2>
//   <div className="flex items-center gap-2 text-sm">
//     <Badge variant="secondary" className="bg-white/60 text-slate-700 shadow-sm">
//       {loading ? 'Loading...' : `${sortedInsights.length} new insights`}
//     </Badge>
//     {goals.length > 0 && (
//       <Badge variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700">
//         Personalized for you
//       </Badge>
//     )}
//   </div>
// </div>


//       {error && <div className="text-red-600 text-sm">{error}</div>}

//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="h-32 bg-white/50 animate-pulse rounded-lg shadow-inner" />
//           ))}
//         </div>
//       ) : sortedInsights.length === 0 ? (
//         <div className="text-center text-slate-600 text-sm mt-6">
//           No insights found for <strong>"{topic}"</strong>. Try another topic.
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           {sortedInsights.map(insight => {
//             const Icon = getIconForType(insight.type);
//             const isRead = readInsights.has(insight.id);
//             const isRelevant = insight.relevantToGoals.some(goal => goals.includes(goal));

//             return (
//               <Card
//                 key={insight.id}
//                 className={`bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
//                   isRead ? 'opacity-75' : ''
//                 } ${isRelevant ? 'ring-2 ring-indigo-200' : ''}`}
//               >
//                 <CardHeader className="pb-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeColor(insight.type)}`}>
//                         <Icon className="w-5 h-5 text-white" />
//                       </div>
//                       <div>
//                         <CardTitle className="text-lg leading-tight">{insight.title}</CardTitle>
//                         <div className="flex items-center gap-3 mt-2">
//                           <Badge variant="outline" className="text-xs">
//                             {insight.category}
//                           </Badge>
//                           <span className="text-xs text-slate-500">{insight.source}</span>
//                           <span className="text-xs text-slate-500">{insight.readTime}</span>
//                           {isRelevant && (
//                             <Badge className="text-xs bg-indigo-100 text-indigo-700 border-indigo-200">
//                               Relevant to your goals
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {isRead && (
//                         <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
//                           +{insight.xpReward} XP
//                         </Badge>
//                       )}
//                       <Badge
//                         variant={insight.impact === 'High' ? 'destructive' : 'secondary'}
//                         className="text-xs"
//                       >
//                         {insight.impact} Impact
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="space-y-4">
//                   <p className="text-slate-700 leading-relaxed">{insight.summary}</p>

//                   <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
//                     <div className="font-medium text-indigo-900 mb-2">💡 Actionable Insight:</div>
//                     <p className="text-indigo-800 text-sm">{insight.actionable}</p>
//                   </div>

//                   <div className="flex items-center justify-between pt-2">
//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleReadInsight(insight.id)}
//                         disabled={isRead}
//                         className="bg-white/50"
//                       >
//                         <Eye className="w-4 h-4 mr-2" />
//                         {isRead ? 'Read' : `Read (+${insight.xpReward} XP)`}
//                       </Button>
//                       <Button variant="outline" size="sm" className="bg-white/50">
//                         <BookmarkPlus className="w-4 h-4 mr-2" />
//                         Save
//                       </Button>
//                     </div>
//                     <a href={insight.url} target="_blank" rel="noopener noreferrer">
//                       <Button variant="ghost" size="sm">
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         View Source
//                       </Button>
//                     </a>
//                   </div>

//                   <div className="border-t border-slate-200 pt-4">
//                     <h4 className="text-sm font-medium text-slate-700 mb-3">🚀 Act Now:</h4>
//                     <div className="flex gap-2 flex-wrap">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleActNow('linkedin', insight)}
//                         className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
//                       >
//                         <Share className="w-4 h-4 mr-2" />
//                         Draft LinkedIn Post
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleActNow('email', insight)}
//                         className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
//                       >
//                         <Mail className="w-4 h-4 mr-2" />
//                         VC Outreach Email
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleActNow('notion', insight)}
//                         className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
//                       >
//                         <FileText className="w-4 h-4 mr-2" />
//                         Add to Notion
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       <ActNowModal
//         isOpen={actNowModal.isOpen}
//         onClose={() => setActNowModal(prev => ({ ...prev, isOpen: false }))}
//         action={actNowModal.action}
//         insightData={actNowModal.insightData}
//       />
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import {
  TrendingUp, Users, Lightbulb, ExternalLink,
  BookmarkPlus, Eye, Share, Mail, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActNowModal } from '@/components/ActNowModal';
import { useGamification } from '@/contexts/GamificationContext';
import { useFounderPersona } from '@/contexts/FounderPersona';
import { fetchNewsFromNewsAPI } from '@/lib/newsApi';
import type { FounderGoal } from '@/contexts/FounderPersona';

// 🧠 New: Fetch insight from Groq backend

const fetchGroqInsight = async (topic: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5173/api/actionable-insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title:topic }),
    });

    const data = await response.json();
    return data.insight || 'No actionable insight available.';
  } catch (error) {
    console.error('Groq Insight Error:', error);
    return 'No actionable insight available.';
  }
};

interface Insight {
  id: number;
  type: 'trend' | 'competitor' | 'insight';
  title: string;
  summary: string;
  category: string;
  impact: 'High' | 'Medium';
  actionable: string;
  source: string;
  readTime: string;
  xpReward: number;
  url: string;
  relevantToGoals: FounderGoal[];
}

interface DigestCardsProps {
  onInsightRead: () => void;
  topic: string;
}

export const DigestCards = ({ onInsightRead, topic }: DigestCardsProps) => {
  const [readInsights, setReadInsights] = useState<Set<number>>(new Set());
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actNowModal, setActNowModal] = useState({
    isOpen: false,
    action: 'linkedin' as 'linkedin' | 'email' | 'notion',
    insightData: null as any,
  });

  const { incrementInsightsRead, updateStreak } = useGamification();
  const { goals } = useFounderPersona();

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await fetchNewsFromNewsAPI(topic);

        // 🧠 Parallel Groq insight fetch
        const actionableInsights = await Promise.all(
          articles.map(article =>
            fetchGroqInsight(article.title)
          )
        );

        // 🧩 Build full insight objects
        setInsights(
          articles.map((article, index) => {
            const title = article.title;
            const summary = article.description?.slice(0, 300) ?? 'No summary available.';
            const actionable = actionableInsights[index];

            return {
              id: index + 1,
              type: index % 3 === 0 ? 'trend' : index % 3 === 1 ? 'competitor' : 'insight',
              title,
              summary,
              category: article.source.name || 'General',
              impact: index % 2 === 0 ? 'High' : 'Medium',
              actionable,
              source: article.source.name,
              readTime: '3 min',
              xpReward: 30 + index * 5,
              url: article.url,
              relevantToGoals: ['GTM', 'Scaling', 'Fundraising', 'Hiring'],
            };
          })
        );
      } catch (err) {
        setError('Failed to fetch insights. Please try again later.');
        console.error('❌ Error fetching news or insights:', err);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [topic]);

  const handleSave = async (insight: {
    title: string;
    category: string;
    date: string;
    tags: string[];
    summary: string;
  }) => {
    try {
      const res = await fetch('http://localhost:5173/api/insights/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insight),
      });
  
      if (!res.ok) throw new Error('Failed to save insight');
      console.log('Insight saved successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'trend': return TrendingUp;
      case 'competitor': return Users;
      case 'insight': return Lightbulb;
      default: return TrendingUp;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trend': return 'from-blue-500 to-cyan-500';
      case 'competitor': return 'from-red-500 to-pink-500';
      case 'insight': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const handleReadInsight = (id: number) => {
    if (!readInsights.has(id)) {
      setReadInsights(prev => new Set(prev).add(id));
      incrementInsightsRead();
      updateStreak();
      onInsightRead();
    }
  };

  const handleActNow = (action: 'linkedin' | 'email' | 'notion', insight: Insight) => {
    setActNowModal({
      isOpen: true,
      action,
      insightData: {
        title: insight.title,
        summary: insight.summary,
        category: insight.category,
        source: insight.source,
      },
    });
  };

  const sortedInsights = [...insights].sort((a, b) => {
    const aRelevance = a.relevantToGoals.some(goal => goals.includes(goal));
    const bRelevance = b.relevantToGoals.some(goal => goals.includes(goal));
    return Number(bRelevance) - Number(aRelevance);
  });

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 px-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Today's Insights</h2>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="secondary" className="bg-white/60 text-slate-700 shadow-sm">
            {loading ? 'Loading...' : `${sortedInsights.length} new insights`}
          </Badge>
          {goals.length > 0 && (
            <Badge variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700">
              Personalized for you
            </Badge>
          )}
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white/50 animate-pulse rounded-lg shadow-inner" />
          ))}
        </div>
      ) : sortedInsights.length === 0 ? (
        <div className="text-center text-slate-600 text-sm mt-6">
          No insights found for <strong>"{topic}"</strong>. Try another topic.
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedInsights.map(insight => {
            const Icon = getIconForType(insight.type);
            const isRead = readInsights.has(insight.id);
            const isRelevant = insight.relevantToGoals.some(goal => goals.includes(goal));

            return (
              <Card
                key={insight.id}
                className={`bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  isRead ? 'opacity-75' : ''
                } ${isRelevant ? 'ring-2 ring-indigo-200' : ''}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeColor(insight.type)}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{insight.title}</CardTitle>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.category}
                          </Badge>
                          <span className="text-xs text-slate-500">{insight.source}</span>
                          <span className="text-xs text-slate-500">{insight.readTime}</span>
                          {isRelevant && (
                            <Badge className="text-xs bg-indigo-100 text-indigo-700 border-indigo-200">
                              Relevant to your goals
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isRead && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          +{insight.xpReward} XP
                        </Badge>
                      )}
                      <Badge
                        variant={insight.impact === 'High' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {insight.impact} Impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">{insight.summary}</p>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                    <div className="font-medium text-indigo-900 mb-2">💡 Actionable Insight:</div>
                    <p className="text-indigo-800 text-sm">{insight.actionable}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReadInsight(insight.id)}
                        disabled={isRead}
                        className="bg-white/50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {isRead ? 'Read' : `Read (+${insight.xpReward} XP)`}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/50"
                        onClick={() =>
                          handleSave({
                            title: insight.title,
                            category: insight.category,
                            date: new Date().toISOString(),
                            tags: insight.relevantToGoals,
                            summary: insight.summary
                          })
                        }
                      >
                        <BookmarkPlus className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <a href={insight.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Source
                      </Button>
                    </a>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">🚀 Act Now:</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleActNow('linkedin', insight)}
                        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                      >
                        <Share className="w-4 h-4 mr-2" />
                        Draft LinkedIn Post
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleActNow('email', insight)}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        VC Outreach Email
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleActNow('notion', insight)}
                        className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Add to Notion
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ActNowModal
        isOpen={actNowModal.isOpen}
        onClose={() => setActNowModal(prev => ({ ...prev, isOpen: false }))}
        action={actNowModal.action}
        insightData={actNowModal.insightData}
      />
    </div>
  );
};
