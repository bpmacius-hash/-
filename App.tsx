import React, { useState, useMemo } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GameLevel from './components/GameLevel';
import ResultScreen from './components/ResultScreen';
import { QUESTIONS } from './constants';
import { ScoreData, Dimension } from './types';

function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // Total coins logic: 
  // For standard questions: coin = value (1-7)
  // For reverse questions: coin = 8 - value
  // We need to store the *raw* user input in 'answers' to calculate correct dimensions later,
  // but we can calculate total coins on the fly for display.
  const calculateCoinFromInput = (qId: number, rawValue: number) => {
    const q = QUESTIONS.find(q => q.id === qId);
    if (!q) return 0;
    return q.isReverse ? (8 - rawValue) : rawValue;
  };

  const totalCoins = useMemo(() => {
    return Object.entries(answers).reduce((acc, [qId, rawVal]) => {
      return acc + calculateCoinFromInput(Number(qId), rawVal);
    }, 0);
  }, [answers]);

  const handleStart = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setAnswers({});
  };

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentLevel]: value }));
    
    if (currentLevel < QUESTIONS.length) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const calculateFinalResults = (): ScoreData => {
    let totalScore = 0;
    const dimensions: { [key in Dimension]: number } = {
      'Self-Efficacy': 0,
      'Resilience': 0,
      'Hope': 0,
      'Optimism': 0
    };

    QUESTIONS.forEach(q => {
      const rawVal = answers[q.id] || 0; // default 0 if missing (shouldn't happen)
      // Logic for score:
      // If direct: score = value
      // If reverse: score = 8 - value
      // Wait, the prompt says "1分就是一个金币" (1 point is 1 coin).
      // And the prompt defines scoring logic:
      // "1,2... complete mismatch get 1 point" (Direct scoring)
      // "8,10... complete mismatch get 7 points" (Reverse scoring)
      // So the Coin Count IS the Score.
      
      const score = q.isReverse ? (8 - rawVal) : rawVal;
      
      totalScore += score;
      dimensions[q.dimension] += score;
    });

    let level: 'Low' | 'Medium' | 'High' = 'Low';
    if (totalScore >= 26 && totalScore < 109) level = 'Low';
    else if (totalScore >= 109 && totalScore <= 154) level = 'Medium';
    else if (totalScore > 154) level = 'High';

    return {
      total: totalScore,
      level,
      dimensions
    };
  };

  return (
    <div className="h-full w-full">
      {gameState === 'start' && <WelcomeScreen onStart={handleStart} />}
      
      {gameState === 'playing' && (
        <GameLevel 
          question={QUESTIONS[currentLevel - 1]} 
          currentLevel={currentLevel}
          totalLevels={QUESTIONS.length}
          onAnswer={handleAnswer}
          totalCoins={totalCoins}
        />
      )}

      {gameState === 'result' && (
        <ResultScreen 
          scoreData={calculateFinalResults()} 
          onRestart={() => setGameState('start')} 
        />
      )}
    </div>
  );
}

export default App;