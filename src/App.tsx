import React, { useState } from 'react';
import { Door } from './components/Door';
import { GameStats } from './components/GameStats';
import { RefreshCw } from 'lucide-react';
import { generateDoors, getRevealableDoors } from './utils/gameLogic';
import { GameState, GameStats as GameStatsType } from './types/game';

function App() {
  const [stage, setStage] = useState(3);
  const [doors, setDoors] = useState<boolean[]>(() => generateDoors(3));
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [revealedDoors, setRevealedDoors] = useState<number[]>([]);
  const [canChangeDoor, setCanChangeDoor] = useState(true);
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [stats, setStats] = useState<GameStatsType>({ wins: 0, totalGames: 0 });

  const handleDoorSelect = (index: number) => {
    if (gameState === 'selecting') {
      setSelectedDoor(index);
      const goatDoors = getRevealableDoors(doors, index);
      const doorToReveal = goatDoors[Math.floor(Math.random() * goatDoors.length)];
      setRevealedDoors([doorToReveal]);
      setGameState('revealing');
    } else if (gameState === 'revealing' && canChangeDoor && index !== selectedDoor) {
      setSelectedDoor(index);
      setCanChangeDoor(false);
    }
  };

  const finishRound = () => {
    setRevealedDoors([...Array(doors.length).keys()]);
    setGameState('finished');
    
    const won = doors[selectedDoor!];
    setStats(prev => ({
      wins: prev.wins + (won ? 1 : 0),
      totalGames: prev.totalGames + 1
    }));
  };

  const nextStage = () => {
    const newStageCount = stage + 1;
    setStage(newStageCount);
    setDoors(generateDoors(newStageCount));
    setSelectedDoor(null);
    setRevealedDoors([]);
    setCanChangeDoor(true);
    setGameState('selecting');
  };

  const resetGame = () => {
    setStage(3);
    setDoors(generateDoors(3));
    setSelectedDoor(null);
    setRevealedDoors([]);
    setCanChangeDoor(true);
    setGameState('selecting');
    setStats({ wins: 0, totalGames: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Monty Hall Game</h1>
          <p className="text-gray-600 mb-4">
            Stage {stage}: Choose a door, then decide if you want to switch after a goat is revealed
          </p>
          <GameStats
            wins={stats.wins}
            totalGames={stats.totalGames}
            currentStage={stage}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {doors.map((hasPrize, index) => (
            <Door
              key={index}
              number={index + 1}
              isSelected={selectedDoor === index}
              isRevealed={revealedDoors.includes(index)}
              hasPrize={hasPrize}
              onClick={() => handleDoorSelect(index)}
              disabled={gameState === 'finished' || revealedDoors.includes(index)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {gameState === 'revealing' && (
            <button
              onClick={finishRound}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Finish Round
            </button>
          )}
          {gameState === 'finished' && (
            <button
              onClick={nextStage}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Next Stage
            </button>
          )}
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;