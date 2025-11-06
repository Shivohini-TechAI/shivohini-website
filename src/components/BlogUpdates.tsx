import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Article {
  date: string;
  title: string;
  description: string;
  content: string;
  url?: string;
}

const DailyBlogUpdates = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [clickedArticles, setClickedArticles] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

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

  useEffect(() => {
    // Static blog articles based on company categories
    const staticArticles: Article[] = [
      {
        date: new Date().toISOString().split('T')[0],
        title: "New AI-Powered Analytics Tool Launch",
        description: "We're excited to announce the launch of our latest AI-powered analytics tool, designed to revolutionize data processing for enterprises.",
        content: "This new tool leverages machine learning algorithms to provide real-time insights, improving decision-making processes across industries. Key features include automated data cleaning, predictive modeling, and intuitive dashboards.",
        url: "/blog/0"
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        title: "Achieving Carbon Neutrality: Our Journey",
        description: "Milestone update on our sustainability initiatives, including recent achievements in reducing carbon footprint.",
        content: "Over the past year, we've implemented green technologies in our data centers, resulting in a 40% reduction in energy consumption. This includes solar panel installations and advanced cooling systems.",
        url: "/blog/1"
      },
      {
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // Day before yesterday
        title: "Blockchain in Supply Chain: A Case Study",
        description: "How our blockchain solution improved transparency and efficiency for a major logistics client.",
        content: "By integrating blockchain technology, our client saw a 30% increase in supply chain visibility and a significant reduction in fraud. The decentralized ledger ensures tamper-proof records from production to delivery.",
        url: "/blog/2"
      }
    ];

    setArticles(staticArticles);
  }, []);

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
