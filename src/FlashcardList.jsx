import { useState } from "react";
import Flashcard from "./Flashcard";

function FlashcardList({
  flashcards,
  masteredCards,
  markCardAsMastered,
  currentStreak,
  longestStreak,
  updateStreaks,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
    setFeedback(null); // Reset feedback after moving to the next card
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setFlipped(false);
    setFeedback(null); // Reset feedback after moving to the previous card
  };

  const shuffleCards = () => {
    setCurrentIndex(Math.floor(Math.random() * flashcards.length));
    setFlipped(false);
    setFeedback(null); // Reset feedback on shuffle
  };

  const checkAnswer = (input, correctAnswer) => {
    const normalizedInput = input.trim().toLowerCase();
    const normalizedAnswer = correctAnswer.trim().toLowerCase();

    if (normalizedInput === normalizedAnswer || normalizedInput.includes(normalizedAnswer)) {
      setFeedback("Correct! ✅");
      updateStreaks(true); // Update streak on correct answer
    } else {
      setFeedback("Incorrect ❌");
      updateStreaks(false); // Reset streak on incorrect answer
    }
  };

  const markMastered = () => {
    markCardAsMastered(currentIndex);
  };
  return (
    <div className="flashcard-container">
      <div className="streak-info">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>

      <Flashcard
        card={flashcards[currentIndex]}
        flipped={flipped}
        setFlipped={setFlipped}
        checkAnswer={checkAnswer}
        markAsMastered={markMastered}
      />
      <div className="navigation-buttons">
        <button onClick={prevCard}>Previous</button>
        <button onClick={shuffleCards}>Shuffle</button>
        <button onClick={nextCard}>Next</button>
      </div>

      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default FlashcardList;
