import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Article {
  date: string;
  title: string;
  description: string;
  content: string;
  url?: string;
  source?: {
    name: string;
  };
  urlToImage?: string;
  author?: string;
  publishedAt?: string;
}

const DailyBlogUpdates = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [clickedArticles, setClickedArticles] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  // Function to format date as Today, Yesterday, or Day before yesterday
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date.toDateString() === dayBeforeYesterday.toDateString()) {
      return 'Day before yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Function to strip HTML tags, images, and unwanted content from text
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    // Remove images
    const images = tmp.querySelectorAll("img");
    images.forEach(img => img.remove());
    let text = tmp.textContent || tmp.innerText || "";

    // Remove unwanted content
    const unwantedPatterns = [
      /Follow topics and authors from this story to see more like this in your personalized homepage feed and to receive email updates\./gi,
      /Stevie Bonifield/gi,
      /Gaming/gi,
      /Labor/gi,
      /News/gi,
      /Tech/gi,
      /More in this stream/gi,
      /See all/gi,
      /Am I the only person that didn\'t watch the GTA VI trailer\?/gi,
      /Dominic PrestonMay \d+/gi,
      /Rockstar says new GTA VI trailer was 'equal parts gameplay and cutscenes'/gi,
      /Andrew WebsterMay \d+/gi,
      /Grand Theft Auto VI's second trailer sets up its Bonnie and Clyde story/gi,
      /Most Popular/gi,
      /Making KPop Demon Hunters sound magical meant finding the right harmonies/gi,
      /LG's brilliant B5 OLED TV is already down to just \$530 for Black Friday/gi,
      /The Playdate is a great indie puzzle machine/gi,
      /Where is the Trump phone\?/gi,
      /Google's Pixel Watch 3 and Anker's two-headed USB-C cable are our favorite deals this week/gi,
      /The Verge Daily/gi,
      /A free daily digest of the news that matters most\./gi,
      /Email \(required\)/gi,
      /Enter your email/gi,
      /Sign Up/gi,
      /By submitting your email, you agree to our Terms and Privacy Notice\. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply\./gi,
      /Text settings/gi,
      /Story text/gi,
      /Size/gi,
      /Standard/gi,
      /Links/gi,
      /Minimize to nav/gi
    ];

    unwantedPatterns.forEach(pattern => {
      text = text.replace(pattern, '');
    });

    // Clean up extra whitespace and empty lines
    text = text.replace(/\n\s*\n/g, '\n').trim();

    return text;
  };

  // Function to fetch news from NewsAPI
  const fetchNews = async () => {
    const apiKey = 'c9263a027df943ee958b80b76fa1c60d';
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `news_${today}`;

    // Check if we have cached data for today
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setArticles(parsedData.slice(0, 3)); // Ensure only 3 articles are shown
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=AI+OR+artificial+intelligence+OR+computer+OR+IT+OR+technology+OR+innovation+OR+invention&sortBy=publishedAt&apiKey=${apiKey}&pageSize=20&domains=techcrunch.com,wired.com,arstechnica.com,thenextweb.com,venturebeat.com`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.status === 'ok' && data.articles) {
        // Filter articles to only show today's news and exclude unwanted sources and content
        const today = new Date().toISOString().split('T')[0];
        const unwantedSources = ['buzzfeed', 'buzzfeed.com', 'BuzzFeed', 'buzzfeednews'];
        const unwantedUrls = ['buzzfeed.com'];
        const unwantedKeywords = [
          'people whose lives', 'blown up by', 'unfortunate decisions',
          'viral', 'shocking', 'amazing', 'incredible', 'mind-blowing',
          'you won\'t believe', 'what happened next', 'gone wrong',
          'fails', 'fails compilation', 'funny', 'hilarious', 'laugh',
          'entertainment', 'celebrity', 'celebrities', 'hollywood',
          'movie', 'movies', 'tv show', 'tv shows', 'netflix', 'streaming'
        ];

        const todaysArticles = data.articles.filter((article: any) => {
          const articleDate = new Date(article.publishedAt).toISOString().split('T')[0];
          const sourceName = article.source?.name?.toLowerCase() || '';
          const articleUrl = article.url?.toLowerCase() || '';
          const title = article.title?.toLowerCase() || '';
          const description = article.description?.toLowerCase() || '';

          const isUnwantedBySource = unwantedSources.some(unwanted => sourceName.includes(unwanted));
          const isUnwantedByUrl = unwantedUrls.some(unwanted => articleUrl.includes(unwanted));
          const isUnwantedByTitle = unwantedKeywords.some(keyword => title.includes(keyword));
          const isUnwantedByDescription = unwantedKeywords.some(keyword => description.includes(keyword));

          return articleDate === today && !isUnwantedBySource && !isUnwantedByUrl && !isUnwantedByTitle && !isUnwantedByDescription;
        });

        // Take up to 3 articles from today
        const selectedArticles = todaysArticles.slice(0, 3);

        const mappedArticles: Article[] = selectedArticles.map((article: any, index: number) => ({
          date: new Date(article.publishedAt).toISOString().split('T')[0],
          title: article.title || 'No Title',
          description: article.description || 'No Description',
          content: article.content || article.description || 'No Content',
          url: article.url,
          source: { name: article.source?.name || 'Unknown Source' },
          urlToImage: article.urlToImage,
          author: article.author,
          publishedAt: article.publishedAt
        }));

        setArticles(mappedArticles);
        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(mappedArticles));
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');

      // Try to load cached data from previous days if available
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const yesterdayCacheKey = `news_${yesterday}`;
      const yesterdayData = localStorage.getItem(yesterdayCacheKey);
      if (yesterdayData) {
        setArticles(JSON.parse(yesterdayData));
        setError('Showing yesterday\'s news due to API error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="p-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">Blog Updates</span>
        </h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Loading latest news...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="p-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">Blog Updates</span>
        </h2>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Failed to load news: {error}</p>
          <p className="text-gray-600">Showing fallback content...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="p-6">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">Blog Updates</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {articles.map((article, index) => {
          const isClicked = clickedArticles.has(index);
          return (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 cursor-pointer overflow-hidden border border-white/20"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              {/* 3D Depth Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Content */}
              <div className="relative z-10">
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <h3
                  className={`text-xl font-bold mb-4 cursor-pointer transition-colors ${isClicked ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'}`}
                  onClick={() => {
                    setClickedArticles(prev => new Set(prev).add(index));
                    navigate(`/blog/${index}`);
                  }}
                >
                  {article.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                  {(stripHtml(article.description || "")).slice(0, 60) + "..."}
                </p>

                {/* Learn More Button */}
                <button
                  onClick={() => navigate(`/blog/${index}`)}
                  className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-semibold hover:from-cyan-700 hover:to-blue-700 transform group-hover:translate-x-2 transition-all duration-300"
                >
                  Read More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>

              {/* 3D Border Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-200 group-hover:to-blue-200 rounded-3xl transition-all duration-300" />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 rounded-3xl" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyBlogUpdates;