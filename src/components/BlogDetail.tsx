import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Article {
  date: string;
  title: string;
  description: string;
  content: string;
  url?: string;
  fullContent?: string;
  source?: {
    name: string;
  };
  urlToImage?: string;
  author?: string;
  publishedAt?: string;
}

const BlogDetail: React.FC = () => {
  console.log('BlogDetail component mounted');
  const { id } = useParams<{ id: string }>();
  console.log('BlogDetail id:', id);
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fullContentLoading, setFullContentLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load articles from localStorage
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `news_${today}`;

    let articles: Article[] = [];
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      articles = JSON.parse(cachedData);
    } else {
      // Fallback to yesterday's data if today's data is not available
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const yesterdayCacheKey = `news_${yesterday}`;
      const yesterdayData = localStorage.getItem(yesterdayCacheKey);
      if (yesterdayData) {
        articles = JSON.parse(yesterdayData);
      }
    }

    const articleIndex = parseInt(id || '0');
    if (articles[articleIndex]) {
      setArticle(articles[articleIndex]);
    } else {
      setError('Article not found');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading article...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error || 'Article not found'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <button
          onClick={() => navigate('/')}
          className="mb-8 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
        >
          ← Back to Home
        </button>

        <article className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
          {/* Article Meta */}
          <div className="text-sm text-gray-300 mb-6 flex flex-wrap items-center gap-4">
            <span>{new Date(article.publishedAt || article.date).toLocaleDateString()}</span>
            {article.author && <span>By {article.author}</span>}
            {article.source?.name && <span>Source: {article.source.name}</span>}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">{article.title}</h1>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">{article.description}</p>

          {/* Article Content */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:text-white prose-p:text-gray-200 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:hover:text-blue-300 prose-strong:text-white prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-gray-200 prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-900/30 prose-blockquote:p-6 prose-blockquote:rounded-r-lg">
            {fullContentLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                  <p className="text-gray-300">Loading full article content...</p>
                </div>
              </div>
            )}
            {article.fullContent ? (
              <div className="space-y-6">
                <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
              </div>
            ) : article.content && article.content.length > 0 ? (
              <div className="space-y-6">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            ) : (
              <p className="text-gray-200 leading-relaxed text-xl">{article.description}</p>
            )}
          </div>

          {/* Read Original Article Link */}
          {article.url && (
            <div className="mt-12 pt-8 border-t border-white/20">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-lg"
              >
                Read full article on {article.source?.name || 'source website'}
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;