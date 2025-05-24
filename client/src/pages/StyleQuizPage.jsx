import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StyleQuizPage.css";

const predefinedQuestions = [
  {
    id: "occasion",
    question: "What is the occasion you're dressing for?",
    options: ["Casual", "Formal", "Party", "Wedding", "Gym"],
  },
  {
    id: "style",
    question: "What style do you prefer?",
    options: ["Trendy", "Classic", "Minimal", "Bohemian", "Sporty"],
  },
  {
    id: "color",
    question: "Which color do you like to wear most?",
    options: ["Black", "White", "Blue", "Red", "Green"],
  },
];

const StyleQuizPage = () => {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/outfits").then((res) => {
      setOutfits(res.data);
    });
  }, []);

  const handleChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const occasion = answers["occasion"];
    const filtered = outfits.filter(
      (o) => o.occasion?.toLowerCase() === occasion?.toLowerCase()
    );

    setResults(filtered);
    setLoading(false);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">💫 Discover Your Style</h2>
      <form onSubmit={handleSubmit} className="quiz-form">
        {predefinedQuestions.map(({ id, question, options }) => (
          <div key={id} className="quiz-question">
            <p className="question-text">{question}</p>
            <div className="options">
              {options.map((option) => (
                <label key={option} className="quiz-option">
                  <input
                    type="radio"
                    name={id}
                    value={option}
                    checked={answers[id] === option}
                    onChange={() => handleChange(id, option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Loading..." : "🎯 Show My Outfits"}
        </button>
      </form>

      <hr className="divider" />

      <h3 className="results-title">👗 Recommended Outfits:</h3>
      {results.length === 0 ? (
        <p className="no-results">No recommendations yet. Try the quiz!</p>
      ) : (
        <div className="outfit-grid">
          {results.map((outfit) => (
            <div key={outfit._id} className="outfit-card">
              <img
                src={`http://localhost:5000${outfit.imageUrl}`}
                alt={outfit.name}
                className="outfit-image"
              />
              <p className="outfit-name">{outfit.name}</p>
              <p className="outfit-price">₹{outfit.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleQuizPage;
