// Flashcard.jsx
import { useState } from "react";

function Flashcard({ card, flipped, setFlipped, checkAnswer, markAsMastered}) {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleCheckAnswer = () => {
    checkAnswer(userInput, card.answer, setFeedback);
  };

  const categoryColors = {
    Geography: "#ffcc00",
    Culture: "#ff6666",
    Literature: "#6699ff",
    Sport: "#ff9913",
  };

  const backgroundColor = categoryColors[card.category] || "#ddd";

  return (
    <div className="flashcard" style={{ backgroundColor }}>
      <div className="flashcard-content">
        {flipped ? (
          <div>
            <h3>{card.answer}</h3>
            <button  className="anwer_buton" onClick={() => setFlipped(false)}>Flip Back</button>
            <button onClick={() => markAsMastered()}>Mark as Mastered</button>
          </div>
        ) : (
          <div>
            <h3>{card.question}</h3>
            {card.image && <img src={card.image} alt="Flashcard" />}
            <input
              type="text"
              className="user-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your answer"
            />
            <button className="submit-button" onClick={handleCheckAnswer}>Submit</button>
            {feedback && <p>{feedback}</p>}
            <button className="flip-button" onClick={() => setFlipped(true)}>
              Flip to Reveal Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flashcard;