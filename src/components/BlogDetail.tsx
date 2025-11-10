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
    // Static blog articles focused on IT, Computer, AI Tech Industry
    const staticArticles: Article[] = [
      {
        date: new Date().toISOString().split('T')[0],
        title: "The Future of Artificial Intelligence in Enterprise Solutions",
        description: "Exploring how AI is transforming business operations and decision-making processes across industries.",
        content: "Artificial Intelligence is revolutionizing the way enterprises operate. From predictive analytics to automated decision-making, AI technologies are enabling businesses to process vast amounts of data at unprecedented speeds. Machine learning algorithms can now identify patterns and trends that were previously invisible to human analysts. Key areas of impact include customer service automation, supply chain optimization, and risk assessment. As AI continues to evolve, we're seeing the emergence of more sophisticated applications like natural language processing, computer vision, and generative AI models. The integration of AI into enterprise systems requires careful consideration of ethical implications, data privacy, and workforce transformation. Companies that successfully adopt AI technologies are gaining significant competitive advantages through improved efficiency, reduced costs, and enhanced customer experiences.",
        url: "/blog/0"
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        title: "Cloud Computing: Revolutionizing IT Infrastructure",
        description: "How cloud technologies are reshaping IT infrastructure and enabling scalable, cost-effective solutions.",
        content: "Cloud computing has fundamentally changed the IT landscape. Traditional on-premises data centers are being replaced by scalable, pay-as-you-go cloud services that offer unprecedented flexibility and cost efficiency. Major cloud providers like AWS, Azure, and Google Cloud offer a comprehensive suite of services including Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). The benefits of cloud adoption include reduced capital expenditures, improved scalability, enhanced security, and faster deployment times. Multi-cloud and hybrid cloud strategies are becoming increasingly popular as organizations seek to avoid vendor lock-in and optimize their IT investments. However, successful cloud migration requires careful planning, including data migration strategies, security considerations, and staff training. The future of cloud computing looks promising with the emergence of edge computing, serverless architectures, and AI-powered cloud management tools.",
        url: "/blog/1"
      },
      {
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // Day before yesterday
        title: "Cybersecurity in the Digital Age: Protecting Critical Assets",
        description: "Essential strategies for safeguarding digital assets in an increasingly connected and threat-filled environment.",
        content: "As digital transformation accelerates, cybersecurity has become a critical concern for organizations worldwide. The proliferation of connected devices, cloud services, and remote work has expanded the attack surface significantly. Common threats include ransomware, phishing attacks, data breaches, and supply chain vulnerabilities. Effective cybersecurity requires a multi-layered approach that includes network security, endpoint protection, identity and access management, and security awareness training. Advanced technologies like AI-powered threat detection, zero-trust architectures, and blockchain-based security solutions are helping organizations stay ahead of evolving threats. Regulatory compliance, such as GDPR and CCPA, adds another layer of complexity to cybersecurity management. Organizations must invest in robust security frameworks, regular vulnerability assessments, and incident response planning. The human element remains crucial, with employee training and awareness programs playing a vital role in preventing security incidents. As cyber threats continue to evolve, proactive security measures and continuous monitoring are essential for protecting critical digital assets.",
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
          {/* Article Image */}
          {article.urlToImage && (
            <div className="mb-6">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

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
