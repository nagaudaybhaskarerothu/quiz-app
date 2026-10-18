
import { useState } from "react";
import questionsData from "./questions";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questionsData[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questionsData.length) * 100;

  function handleAnswer(option) {
    if (answer === "") {
      setAnswer(option);
    }
  }

  function handleNext() {
    if (answer === "") {
      alert("Please select an answer!");
      return;
    }

    const isCorrect = answer === question.answer;

    if (isCorrect) {
      setMarks((prevMarks) => prevMarks + 1);
    }

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
    } else {
      setShowResult(true);
    }
  }

  function handleRestart() {
    setCurrentQuestion(0);
    setAnswer("");
    setMarks(0);
    setShowResult(false);
  }

  if (showResult) {
    const percentage = Math.round(
      (marks / questionsData.length) * 100
    );

    return (
      <div className="app-container">
        <div className="quiz-card result-card">
          <div className="result-icon">
            {percentage >= 70 ? "🏆" : "🎯"}
          </div>

          <p className="eyebrow">QUIZ COMPLETED</p>
          <h1 color="red">Well done!</h1>

          <p className="subtitle">
            You have completed all the questions.
          </p>

          <div className="score-circle">
            <span className="score-number">{percentage}%</span>
            <span className="score-label">Your Score</span>
          </div>

          <div className="result-stats">
            <div className="stat-box">
              <strong>{marks}</strong>
              <span>Correct</span>
            </div>

            <div className="stat-box">
              <strong>{questionsData.length - marks}</strong>
              <span>Incorrect</span>
            </div>

            <div className="stat-box">
              <strong>{questionsData.length}</strong>
              <span>Total</span>
            </div>
          </div>

          <button className="primary-button" onClick={handleRestart}>
            ↻ Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="quiz-card">
        <header className="quiz-header">
          <div className="brand-icon">Q</div>

          <div className="brand-text">
            <h1>QuizMaster</h1>
            <p>Test your knowledge</p>
          </div>

          <span className="question-badge">
            {currentQuestion + 1} / {questionsData.length}
          </span>
        </header>

        <section className="progress-section">
          <div className="progress-info">
            <span>YOUR PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <main className="question-section">
          <p className="eyebrow">
            QUESTION {currentQuestion + 1}
          </p>

          <h2>{question.question}</h2>

          <p className="instruction">
            Choose the correct answer below.
          </p>

          <div className="options-list">
            {question.options.map((option, index) => {
              let optionClass = "option-button";

              if (answer !== "") {
                if (option === question.answer) {
                  optionClass += " correct-option";
                } else if (option === answer) {
                  optionClass += " incorrect-option";
                }
              } else if (answer === option) {
                optionClass += " selected-option";
              }

              return (
                <button
                  key={option}
                  className={optionClass}
                  onClick={() => handleAnswer(option)}
                  disabled={answer !== ""}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="option-text">{option}</span>

                  {answer !== "" && option === question.answer && (
                    <span className="option-indicator">✓</span>
                  )}

                  {answer !== "" &&
                    option === answer &&
                    option !== question.answer && (
                      <span className="option-indicator">✕</span>
                    )}
                </button>
              );
            })}
          </div>

          {answer !== "" && (
            <div
              className={
                answer === question.answer
                  ? "feedback correct-feedback"
                  : "feedback incorrect-feedback"
              }
            >
              {answer === question.answer
                ? "✓ Correct answer! Great job."
                : `✕ Incorrect. The correct answer is ${question.answer}.`}
            </div>
          )}
        </main>

        <footer className="quiz-footer">
          <span className="score-display">
            ⭐ Score: {marks}
          </span>

          <button
            className="primary-button next-button"
            onClick={handleNext}
            disabled={answer === ""}
          >
            {currentQuestion === questionsData.length - 1
              ? "Finish Quiz"
              : "Next Question"}
            <span>→</span>
          </button>
        </footer>
      </div>

      <p className="footer-note">
        Learn something new every day.
      </p>
    </div>
  );
}
