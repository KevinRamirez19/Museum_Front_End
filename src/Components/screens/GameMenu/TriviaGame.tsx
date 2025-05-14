import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TriviaGame.css'; // Asegúrate de importar el archivo CSS

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "¿Cuál es la capital de Colombia?",
    options: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    answer: "Bogotá"
  },
  {
    question: "¿Quién pintó la Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "¿En qué año se firmó el Acta de Independencia de Colombia?",
    options: ["1810", "1819", "1821", "1830"],
    answer: "1810"
  },
  {
    question: "¿Qué prócer lideró la Batalla de Boyacá?",
    options: ["Antonio Nariño", "Francisco de Paula Santander", "Simón Bolívar", "José María Córdova"],
    answer: "Simón Bolívar"
  },
  {
    question: "¿Qué ciudad fue la primera en declarar la independencia absoluta en Colombia?",
    options: ["Bogotá", "Medellín", "Cartagena", "Tunja"],
    answer: "Cartagena"
  },
  {
    question: "¿Cómo se llamó la unión de Colombia, Venezuela, Ecuador y Panamá en el siglo XIX?",
    options: ["La Confederación Granadina", "La Gran Colombia", "Nueva Granada", "Unión Bolivariana"],
    answer: "La Gran Colombia"
  },
  {
    question: "¿Qué conflicto armado duró de 1899 a 1902 en Colombia?",
    options: ["La Guerra de los Mil Días", "La Independencia", "La Guerra Civil", "La Violencia"],
    answer: "La Guerra de los Mil Días"
  },
  {
    question: "¿Cuál es el nombre del acuerdo que dio fin al conflicto con las FARC?",
    options: ["Acuerdo de Paz de La Habana", "Acuerdo de Cartagena", "Acuerdo Nacional", "Pacto de Bogotá"],
    answer: "Acuerdo de Paz de La Habana"
  },
  {
    question: "¿Qué presidente colombiano fue asesinado en 1948?",
    options: ["Alfonso López Pumarejo", "Rafael Uribe Uribe", "Jorge Eliécer Gaitán", "Carlos Lleras Restrepo"],
    answer: "Jorge Eliécer Gaitán"
  },
  {
    question: "¿En qué año fue fundado Bogotá?",
    options: ["1538", "1542", "1525", "1550"],
    answer: "1538"
  }
];

const TriviaGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 segundos para cada pregunta
  const [answerStatus, setAnswerStatus] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Temporizador de cuenta regresiva
  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer('');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
      setAnswerStatus('correcta');
    } else if (option !== '') {
      setAnswerStatus('incorrecta');
    }

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedOption(null);
        setAnswerStatus(null);
        setTimeLeft(15); // reiniciar tiempo
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setTimeLeft(15);
    setAnswerStatus(null);
  };

  // Barra de progreso del juego
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="trivia-game">
      <h2>Trivia Histórica</h2>

      {/* Barra de progreso del juego */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      {/* Contador regresivo */}
      <div className="timer">
        <strong>{timeLeft}</strong> segundos restantes
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p><strong>Pregunta {currentQuestionIndex + 1}:</strong> {currentQuestion.question}</p>

            <div className="options">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = selectedOption === option;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedOption}
                    className={isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {answerStatus && (
              <p className={answerStatus === 'correcta' ? 'correct' : 'incorrect'}>
                {answerStatus === 'correcta' ? 'Respuesta correcta!' : 'Respuesta incorrecta'}
              </p>
            )}

            <p className="score">Puntaje: {score}</p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <h3>🎉 ¡Juego Terminado!</h3>
            <p>Tu puntaje final fue: <strong>{score}/{questions.length}</strong></p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={resetGame}
              className="reset-button"
            >
              Jugar de nuevo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TriviaGame;
