import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Article {
  date: string;
  title: string;
  description: string;
  content: string;
  url?: string;
  fullContent?: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fullContentLoading, setFullContentLoading] = useState<boolean>(false);

  useEffect(() => {
    // Static blog articles based on company categories
    const staticArticles: Article[] = [
      {
        date: new Date().toISOString().split('T')[0],
        title: "New AI-Powered Analytics Tool Launch",
        description: "We're excited to announce the launch of our latest AI-powered analytics tool, designed to revolutionize data processing for enterprises.",
        content: "This new tool leverages machine learning algorithms to provide real-time insights, improving decision-making processes across industries. Key features include automated data cleaning, predictive modeling, and intuitive dashboards. The tool has been developed with enterprise-grade security and scalability in mind, ensuring it can handle large datasets efficiently. Our team has worked closely with industry leaders to incorporate best practices in AI ethics and data privacy.",
        url: "/blog/0"
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        title: "Achieving Carbon Neutrality: Our Journey",
        description: "Milestone update on our sustainability initiatives, including recent achievements in reducing carbon footprint.",
        content: "Over the past year, we've implemented green technologies in our data centers, resulting in a 40% reduction in energy consumption. This includes solar panel installations and advanced cooling systems. We've also partnered with renewable energy providers to offset our remaining carbon emissions. This commitment to sustainability not only reduces our environmental impact but also sets a new standard for the tech industry.",
        url: "/blog/1"
      },
      {
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // Day before yesterday
        title: "Blockchain in Supply Chain: A Case Study",
        description: "How our blockchain solution improved transparency and efficiency for a major logistics client.",
        content: "By integrating blockchain technology, our client saw a 30% increase in supply chain visibility and a significant reduction in fraud. The decentralized ledger ensures tamper-proof records from production to delivery. Smart contracts automated routine processes, reducing manual intervention and errors. This case study demonstrates the transformative potential of blockchain in traditional industries.",
        url: "/blog/2"
      }
    ];

    const articleIndex = parseInt(id || '0');
    if (staticArticles[articleIndex]) {
      setArticle(staticArticles[articleIndex]);
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
          <div className="text-sm text-gray-500 mb-4">
            {new Date(article.date).toLocaleDateString()}
          </div>
          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{article.description}</p>

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
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;
