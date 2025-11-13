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

const BlogUpdates = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [clickedArticles, setClickedArticles] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();
  const articlesPerPage = 3;

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
      /Minimize to nav/gi,
      /CommentLoaderSave StorySave this story/gi
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
    console.log('fetchNews function called');
    const apiKey = 'c9263a027df943ee958b80b76fa1c60d';
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `news_${today}`;
    console.log('Cache key:', cacheKey);

    // Force fresh data fetching by clearing cache
    localStorage.removeItem(cacheKey);
    console.log('Cache cleared, fetching fresh data');

    try {
      console.log('Fetching news from NewsAPI...');
      const apiUrl = `https://newsapi.org/v2/everything?q=AI+OR+artificial+intelligence+OR+computer+OR+IT+OR+technology+OR+innovation+OR+invention&sortBy=publishedAt&apiKey=${apiKey}&pageSize=100&domains=techcrunch.com,wired.com,arstechnica.com,thenextweb.com,venturebeat.com`;
      console.log('API URL:', apiUrl);
      const response = await fetch(apiUrl);
      console.log('API Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response data:', data);

      if (data.status === 'ok' && data.articles) {
        console.log('Total articles received:', data.articles.length);

        // Filter articles to only show news from last 30 days and exclude unwanted sources and content
        const today = new Date().toISOString().split('T')[0];
        const unwantedSources = ['buzzfeed', 'buzzfeed.com', 'BuzzFeed', 'buzzfeednews'];
        const unwantedUrls = ['buzzfeed.com'];
        const unwantedKeywords = [
          'people whose lives', 'blown up by', 'unfortunate decisions',
          'viral', 'shocking', 'amazing', 'incredible', 'mind-blowing',
          'you won\'t believe', 'what happened next', 'gone wrong',
          'fails', 'fails compilation', 'funny', 'hilarious', 'laugh',
          'entertainment', 'celebrity', 'celebrities', 'hollywood',
          'movie', 'movies', 'tv show', 'tv shows', 'netflix', 'streaming',
          'black friday', 'deals', 'shopping', 'sale', 'discount', 'offer',
          'home depot', 'tools', 'hardware', 'appliances', 'furniture',
          'christmas', 'holiday', 'gift', 'gifts', 'shopping guide',
          'best buys', 'price drop', 'clearance', 'bargain', 'coupon',
          'gay', 'lgbtq', 'dating', 'app store', 'china', 'government',
          'censorship', 'social', 'community', 'marginalized', 'regulator',
          'removal', 'pulls', 'removes', 'banned', 'blocked', 'forbidden',
          'groww', 'ipo', 'indian fintech', 'retail investing boom'
        ];

        // Keywords for MNCs and inventions
        const mncKeywords = ['google', 'microsoft', 'apple', 'amazon', 'nvidia', 'tesla', 'ibm', 'intel', 'amd', 'meta', 'oracle', 'adobe', 'salesforce', 'cisco', 'qualcomm', 'facebook', 'twitter', 'linkedin'];
        const inventionKeywords = ['invention', 'innovation', 'breakthrough', 'patent', 'new technology', 'discovery', 'advancement', 'cutting-edge', 'revolutionary'];
        const techKeywords = ['ai', 'artificial intelligence', 'machine learning', 'computer', 'technology', 'software', 'hardware', 'startup', 'tech', 'digital'];

        const filteredArticles = data.articles.filter((article: any) => {
          const articleDate = new Date(article.publishedAt);
          const today = new Date();
          const thirtyDaysAgo = new Date(today);
          thirtyDaysAgo.setDate(today.getDate() - 30);

          const sourceName = article.source?.name?.toLowerCase() || '';
          const articleUrl = article.url?.toLowerCase() || '';
          const title = article.title?.toLowerCase() || '';
          const description = article.description?.toLowerCase() || '';

          const isUnwantedBySource = unwantedSources.some(unwanted => sourceName.includes(unwanted));
          const isUnwantedByUrl = unwantedUrls.some(unwanted => articleUrl.includes(unwanted));
          const isUnwantedByTitle = unwantedKeywords.some(keyword => title.includes(keyword));
          const isUnwantedByDescription = unwantedKeywords.some(keyword => description.includes(keyword));

          // Check if article is about MNCs, inventions, or general tech topics
          const isAboutMNC = mncKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
          const isAboutInvention = inventionKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
          const isAboutTech = techKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));

          // Show articles from the last 30 days that are about MNCs, inventions, or tech topics
          const isWithinLastThirtyDays = articleDate >= thirtyDaysAgo && articleDate <= today;

          return isWithinLastThirtyDays && !isUnwantedBySource && !isUnwantedByUrl && !isUnwantedByTitle && !isUnwantedByDescription && (isAboutMNC || isAboutInvention || isAboutTech);
        });

        console.log('Articles after filtering:', filteredArticles.length);

        // Take up to 6 articles from the last 7 days for pagination
        const selectedArticles = filteredArticles.slice(0, 6);
        console.log('Selected articles:', selectedArticles.length);

        const mappedArticles: Article[] = selectedArticles.map((article: any, index: number) => {
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          const dayBeforeYesterday = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
          let date, publishedAt;
          if (index < 2) {
            date = today;
            publishedAt = new Date().toISOString();
          } else if (index < 4) {
            date = yesterday;
            publishedAt = new Date(Date.now() - 86400000).toISOString();
          } else {
            date = dayBeforeYesterday;
            publishedAt = new Date(Date.now() - 2 * 86400000).toISOString();
          }
          return {
            date,
            title: article.title || 'No Title',
            description: article.description || 'No Description',
            content: article.content || article.description || 'No Content',
            url: article.url,
            source: { name: article.source?.name || 'Unknown Source' },
            urlToImage: article.urlToImage,
            author: article.author,
            publishedAt
          };
        });

        console.log('Mapped articles:', mappedArticles);
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
    console.log('BlogUpdates component mounted, calling fetchNews');
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Latest <span className="text-blue-400">Blog Updates</span>
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <span className="ml-4 text-gray-300">Loading latest news...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Latest <span className="text-blue-400">Blog Updates</span>
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">Failed to load news: {error}</p>
            <p className="text-gray-300">Please check your internet connection and try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  console.log('BlogUpdates rendering with articles:', articles.length);
  console.log('Articles data:', articles);
  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Latest <span className="text-blue-400">Blog Updates</span>
          </h2>
        </div>
        {articles.length === 0 && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-300">No articles available at the moment.</p>
          </div>
        )}
        {/* Sliding Container with Navigation */}
        <div className="relative flex items-center">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="absolute left-0 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <span className="text-white text-2xl">←</span>
          </button>

          {/* Sliding Container */}
          <div className="relative overflow-hidden flex-1 mx-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, pageIndex) => (
                <div key={pageIndex} className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  {articles.slice(pageIndex * articlesPerPage, (pageIndex + 1) * articlesPerPage).map((article, index) => {
                    const globalIndex = pageIndex * articlesPerPage + index;
                    const isClicked = clickedArticles.has(globalIndex);
                    return (
                      <div
                        key={globalIndex}
                        className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer"
                        style={{
                          animationDelay: `${index * 150}ms`
                        }}
                      >
                        {/* Content */}
                        <div className="relative z-10">
                          <p className="text-sm text-gray-300 mb-4">{new Date(article.publishedAt || article.date).toLocaleDateString()}</p>
                          <h3
                            className={`text-xl font-bold mb-4 cursor-pointer transition-colors ${isClicked ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}
                            onClick={() => {
                              setClickedArticles(prev => new Set(prev).add(globalIndex));
                              navigate(`/blog/${globalIndex}`);
                            }}
                          >
                            {article.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                            {(stripHtml(article.description || "")).slice(0, 60) + "..."}
                          </p>

                          {/* Learn More Button */}
                          <button
                            onClick={() => navigate(`/blog/${globalIndex}`)}
                            className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-semibold hover:from-blue-300 hover:to-blue-200 transform group-hover:translate-x-2 transition-all duration-300"
                          >
                            Read More
                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(articles.length / articlesPerPage) - 1, prev + 1))}
            disabled={currentPage === Math.ceil(articles.length / articlesPerPage) - 1}
            className="absolute right-0 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <span className="text-white text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogUpdates;
