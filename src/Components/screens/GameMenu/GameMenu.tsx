import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaQuestion, FaGamepad, FaUserSecret, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './GameMenu.css';

const GameMenu: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  // Reproducir automáticamente cuando se carga
  useEffect(() => {
    const audio = new Audio("");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Intenta reproducir después de una interacción del usuario
    const playAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener('click', playAudio);
    };

    document.addEventListener('click', playAudio);

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <>
      <div className="animated-bg" />
      <div className={`game-menu ${darkMode ? 'dark' : 'light'}`}>
        <div className="theme-toggle">
          <button onClick={toggleTheme} className="toggle-button">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <h2 className="menu-title">Seleccione un Juego</h2>
        <div className="game-options">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/TriviaGame" className="game-button">
              <span className="icon"><FaQuestion /></span> Trivia
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/HangmanGame" className="game-button">
              <span className="icon"><FaGamepad /></span> Ahorcado
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/JuegosScreen" className="game-button">
              <span className="icon"><FaUserSecret /></span> Adivina Quién
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GameMenu;
