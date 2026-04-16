import { useEffect, useState } from "react"
import Confetti from "react-confetti";

export default function QuizComponents() {

    const [preguntas, setPreguntas] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showCorrect, setShowCorrect] = useState(false);

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        setShowCorrect(true);

        if (preguntas[currentQuestion]?.correctAnswer === index) {
            setShowConfetti(true);

            setTimeout(() => {
                setShowConfetti(false);
            }, 3000);
        }
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            const headers = new Headers()
            headers.append("X-Master-Key","$2a$10$YUx0rt/.PfX3vfVITaYWRuj72r84Ta/JvbTySb/t.1EPQ8FwgnrKe")

            try {
                const response = await fetch(
                    "https://api.jsonbin.io/v3/b/69d5d45636566621a88ca01c",
                    { headers }
                );

                const data = await response.json()
                setPreguntas(data.record);

            } catch (error) {
                console.error("Error fetching quiz data:", error)
            }
        }

        fetchQuiz()
    }, [])

    return (
        <>
        
            {showConfetti && <Confetti />}
            <div>
                <h1>Quiz Components</h1>
                <p>{preguntas[currentQuestion]?.question}</p>
                <div>
                    {preguntas[currentQuestion]?.answers.map((option, index) => {
                        let background = "";
                        if (showCorrect) {
                            if (index === preguntas[currentQuestion].correctAnswer) {
                                background = "green";
                            } else if (index === selectedAnswer) {
                                background = "red";
                            }
                        }

                        return (
                            <button
                                key={index}onClick={() => handleAnswerClick(index)}
                                style={{ background }}
                                //disabled={showCorrect}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    )
}