import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function QuizComponent() {
  const [preguntas, setPreguntas] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswerClick = (index) => {
    if (preguntas[0].correctAnswer === index) {
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // El confetti se mostrará durante 3 segundos
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const headers = new Headers();
      headers.append(
        "X-Master-Key",
        "$2a$10$GVnjA1UyH.j/jOzsqiwXeOa.j.3axXrnrx1ZppxbQluUXFHIglan."
      ); // Error: Muy Grave de seguridad

      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/69d1d39daaba882197c68cf0",{ headers });
        const data = await response.json();
        setPreguntas(data.record);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    fetchQuiz();
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}

      <div>
        <h2>Quiz Component</h2>
        <p>{preguntas[0]?.question}</p>

        <div>
          {preguntas[0]?.answers.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(index)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}