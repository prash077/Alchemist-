
export type NewsItem = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export async function fetchNewsFromNewsAPI(query: string): Promise<NewsItem[]> {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  
  if (!API_KEY) {
    throw new Error("News API key is missing. Check your .env file.");
  }

  // Build the URL for NewsAPI (using the 'everything' endpoint)
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=10&apiKey=${API_KEY}`;
  
  console.log("🔍 NewsAPI URL:", url);
  
  const res = await fetch(url);
  const data = await res.json();
  
  console.log("📰 NewsAPI Response Data:", data);
  
  if (res.status !== 200 || data.status !== "ok") {
    throw new Error("Failed to fetch news from NewsAPI");
  }
  
  return data.articles as NewsItem[];
}
