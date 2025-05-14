import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HangmanGame.css';

const phrases = [
  {
    text: 'guerra de los mil dias',
    hintImage: 'https://static.wixstatic.com/media/650530_b86c240dcc8f463d81e306fd5187e05b~mv2.jpg/v1/fill/w_980,h_688,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/650530_b86c240dcc8f463d81e306fd5187e05b~mv2.jpg'
  },
  {
    text: 'batalla de boyaca',
    hintImage: 'https://imagenes.eltiempo.com/files/image_1200_535/uploads/2017/11/09/5a04f217e8f08.jpeg'
  },
  {
    text: 'independencia de cartagena',
    hintImage: 'https://colombiaaprende.edu.co/sites/default/files/files_public/imagenes_agenda/shutterstock_1534914158.jpg'
  },
  {
    text: 'grito de independencia',
    hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Grito_de_independencia.jpg/1280px-Grito_de_independencia.jpg'
  },
  {
    text: 'el bogotazo',
    hintImage: 'https://www.elespectador.com/resizer/v2/G3MNCFGO25HAVBCSHM53ATYG2A.jpg?auth=1a39c6acfac5127445aec99d4666aaff1f06fbee16912147f71d98cdd77f6fd4&width=910&height=606&smart=true&quality=70'
  }
];

const normalize = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const HangmanGame: React.FC = () => {
  const [selected, setSelected] = useState(phrases[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [displayWord, setDisplayWord] = useState('');
  const [triesLeft, setTriesLeft] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // para reiniciar animación

  const getRandomPhrase = () => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const startGame = () => {
    const randomPhrase = getRandomPhrase();
    setSelected(randomPhrase);
    setGuessedLetters([]);
    setTriesLeft(6);
    setGameOver(false);
    setWin(false);
    const normalized = normalize(randomPhrase.text);
    setDisplayWord(normalized.split('').map(c => (c === ' ' ? ' ' : '_')).join(' '));
    setAnimationKey(prev => prev + 1); // cambia clave para animación
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameOver) return;
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    const normalized = normalize(selected.text);

    if (!normalized.includes(letter)) {
      setTriesLeft(prev => {
        const newTries = prev - 1;
        if (newTries <= 0) {
          setGameOver(true);
        }
        return newTries;
      });
    } else {
      const newDisplay = normalized
        .split('')
        .map(c => (c === ' ' ? ' ' : newGuessed.includes(c) ? c : '_'))
        .join(' ');

      setDisplayWord(newDisplay);

      if (!newDisplay.includes('_')) {
        setWin(true);
        setGameOver(true);
      }
    }
  };

  const letters = 'abcdefghijklmnñopqrstuvwxyz'.split('');

  return (
    <div className="hangman-container">
      <h2>Juego del Ahorcado</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={selected.hintImage}
            alt="Pista"
            className="hint-image"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          <div className="word">{displayWord}</div>

          <div className="letters">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter) || gameOver}
                className="letter-button"
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>

          <p>Intentos restantes: {triesLeft}</p>

          {gameOver && (
            <div className="result">
              {win ? <p>🎉 ¡Ganaste!</p> : <p>😢 Perdiste. La frase era: "{selected.text}"</p>}
              <button onClick={startGame}>Siguiente</button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HangmanGame;
