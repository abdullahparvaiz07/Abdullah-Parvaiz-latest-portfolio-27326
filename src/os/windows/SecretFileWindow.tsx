/**
 * Abdullah OS — Secret File: Website Rescue Mission Mini-Game
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, XCircle, Trophy, Zap } from 'lucide-react';
import { useOS } from '../OSContext';
import { ACHIEVEMENT_IDS } from '../types';

interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'seo',
    title: 'Fix the SEO',
    category: '🔍 SEO',
    description: 'The website has no meta description. Which tag should be added to the <head>?',
    options: [
      '<meta name="description" content="...">',
      '<meta name="keywords" content="...">',
      '<link rel="description" href="...">',
      '<title description="...">',
    ],
    correctIndex: 0,
    explanation: 'The meta description tag tells search engines what your page is about, improving click-through rates from search results.',
  },
  {
    id: 'speed',
    title: 'Optimize Loading Speed',
    category: '⚡ Performance',
    description: 'Images are loading all at once, slowing down the page. What technique should we use?',
    options: [
      'Use loading="eager" on all images',
      'Use loading="lazy" on below-fold images',
      'Remove all images from the page',
      'Convert all images to BMP format',
    ],
    correctIndex: 1,
    explanation: 'Lazy loading defers off-screen images until the user scrolls near them, significantly improving initial load time.',
  },
  {
    id: 'responsive',
    title: 'Fix Mobile Layout',
    category: '📱 Responsive',
    description: 'Text is overflowing on mobile. Which CSS property fixes the container width?',
    options: [
      'width: 1200px;',
      'max-width: 100%; overflow: hidden;',
      'position: absolute; width: auto;',
      'display: none; (hide on mobile)',
    ],
    correctIndex: 1,
    explanation: 'Using max-width: 100% ensures containers never exceed the viewport width, and overflow: hidden prevents scroll bleed.',
  },
  {
    id: 'ux',
    title: 'Improve Accessibility',
    category: '♿ UX/A11y',
    description: 'Buttons have light gray text (#999) on a white background. What should we do?',
    options: [
      'Make the text even lighter for a clean look',
      'Keep it — aesthetics over accessibility',
      'Use a darker color (#333) for WCAG contrast ratio',
      'Add a text-shadow instead',
    ],
    correctIndex: 2,
    explanation: 'WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text. Dark text (#333) on white provides excellent readability.',
  },
];

export default function SecretFileWindow() {
  const { unlockAchievement } = useOS();
  const [phase, setPhase] = useState<'warning' | 'game' | 'complete'>('warning');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    unlockAchievement(ACHIEVEMENT_IDS.FOUND_SECRET);
  }, [unlockAchievement]);

  const handleStartGame = () => {
    setPhase('game');
  };

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === CHALLENGES[currentChallenge].correctIndex;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, isCorrect]);
  };

  const handleNextChallenge = () => {
    if (currentChallenge + 1 >= CHALLENGES.length) {
      setPhase('complete');
      if (score + (selectedAnswer === CHALLENGES[currentChallenge].correctIndex ? 1 : 0) >= 3) {
        unlockAchievement(ACHIEVEMENT_IDS.COMPLETED_CHALLENGE);
      }
    } else {
      setCurrentChallenge(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const challenge = CHALLENGES[currentChallenge];

  return (
    <div className="os-secret">
      <AnimatePresence mode="wait">
        {phase === 'warning' && (
          <motion.div
            key="warning"
            className="os-secret-warning"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <AlertTriangle size={64} className="text-red-500" />
            </motion.div>
            <h2 className="os-secret-warning-title">⚠️ WARNING</h2>
            <p className="os-secret-warning-text">
              This file was marked DO_NOT_OPEN for a reason...<br />
              A website is in critical condition and needs your help!
            </p>
            <button className="os-secret-start-btn" onClick={handleStartGame}>
              <Zap size={16} />
              Start Website Rescue Mission
            </button>
          </motion.div>
        )}

        {phase === 'game' && (
          <motion.div
            key={`challenge-${currentChallenge}`}
            className="os-secret-game"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            {/* Progress */}
            <div className="os-secret-progress">
              <div className="os-secret-progress-bar">
                <div
                  className="os-secret-progress-fill"
                  style={{ width: `${((currentChallenge + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
              <span className="os-secret-progress-text">
                Challenge {currentChallenge + 1}/{CHALLENGES.length}
              </span>
            </div>

            {/* Challenge */}
            <div className="os-secret-category">{challenge.category}</div>
            <h3 className="os-secret-challenge-title">{challenge.title}</h3>
            <p className="os-secret-challenge-desc">{challenge.description}</p>

            {/* Options */}
            <div className="os-secret-options">
              {challenge.options.map((option, i) => {
                let optionClass = 'os-secret-option';
                if (showResult) {
                  if (i === challenge.correctIndex) optionClass += ' os-secret-option--correct';
                  else if (i === selectedAnswer) optionClass += ' os-secret-option--wrong';
                  else optionClass += ' os-secret-option--dimmed';
                } else if (i === selectedAnswer) {
                  optionClass += ' os-secret-option--selected';
                }

                return (
                  <motion.button
                    key={i}
                    className={optionClass}
                    onClick={() => handleSelectAnswer(i)}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <span className="os-secret-option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <code className="os-secret-option-text">{option}</code>
                    {showResult && i === challenge.correctIndex && <CheckCircle2 size={18} className="text-green-400" />}
                    {showResult && i === selectedAnswer && i !== challenge.correctIndex && <XCircle size={18} className="text-red-400" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  className="os-secret-explanation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p>
                    {selectedAnswer === challenge.correctIndex ? '✅ Correct!' : '❌ Not quite.'}{' '}
                    {challenge.explanation}
                  </p>
                  <button className="os-secret-next-btn" onClick={handleNextChallenge}>
                    {currentChallenge + 1 >= CHALLENGES.length ? 'See Results' : 'Next Challenge →'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            key="complete"
            className="os-secret-complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Trophy size={64} className="text-orange-500" />
            <h2 className="os-secret-complete-title">Mission Complete!</h2>
            <div className="os-secret-score">
              <span className="os-secret-score-num">{score}</span>
              <span className="os-secret-score-total">/ {CHALLENGES.length}</span>
            </div>
            <p className="os-secret-score-label">
              {score === CHALLENGES.length
                ? '🌟 Perfect Score! You\'re a web development master!'
                : score >= 3
                ? '🎉 Great job! You really know your stuff!'
                : '💪 Good effort! Keep learning and try again!'}
            </p>
            <div className="os-secret-results">
              {CHALLENGES.map((c, i) => (
                <div key={c.id} className="os-secret-result-row">
                  <span>{answers[i] ? '✅' : '❌'}</span>
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
