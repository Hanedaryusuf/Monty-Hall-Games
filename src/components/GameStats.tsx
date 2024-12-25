import React from 'react';
import { Trophy } from 'lucide-react';

interface GameStatsProps {
  wins: number;
  totalGames: number;
  currentStage: number;
}

export function GameStats({ wins, totalGames, currentStage }: GameStatsProps) {
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        Game Statistics
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Stage</p>
          <p className="text-2xl font-bold text-blue-600">{currentStage}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Wins</p>
          <p className="text-2xl font-bold text-green-600">{wins}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Win Rate</p>
          <p className="text-2xl font-bold text-purple-600">{winRate}%</p>
        </div>
      </div>
    </div>
  );
}