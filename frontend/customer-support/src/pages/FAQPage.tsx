import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/FAQPage.css";

export interface Article {
  id: number;
  title: string;
  content: string;
}

const FAQPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${process.env.API_DOMAIN}/knowledgebase`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const openArticle = async (articleId: number) => {
    try {
      const response = await axios.get(
        `${process.env.API_DOMAIN}/knowledgebase/${articleId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSelectedArticle(response.data);
    } catch (error) {
      console.error("Error fetching article details:", error);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-grid">
        {articles.map((article) => (
          <div
            key={article.id}
            className="faq-card"
            onClick={() => openArticle(article.id)}
          >
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedArticle.title}</h3>
            <p>{selectedArticle.content}</p>
            <button onClick={() => setSelectedArticle(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
