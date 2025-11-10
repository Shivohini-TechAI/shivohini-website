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
  const { id } = useParams<{ id: string }>();
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
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading article...</div>
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            {error || 'Article not found'}
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          ← Back to Home
        </button>

        <article className="bg-white rounded-lg shadow-md p-8">
          {/* Article Meta */}
          <div className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-4">
            <span>{new Date(article.publishedAt || article.date).toLocaleDateString()}</span>
            {article.author && <span>By {article.author}</span>}
            {article.source?.name && <span>Source: {article.source.name}</span>}
          </div>

          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{article.description}</p>

          {/* Article Content */}
          <div className="prose prose-base prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-strong:text-gray-900 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
            {fullContentLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                  <p className="text-gray-500">Loading full article content...</p>
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
              <p className="text-gray-700 leading-relaxed text-lg">{article.description}</p>
            )}
          </div>

          {/* Read Original Article Link */}
          {article.url && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read full article on {article.source?.name || 'source website'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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