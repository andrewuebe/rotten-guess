import React from 'react';
import { Player } from "@/utilities/types/Player";
import PlayerColorCircle from './PlayerColorCircle';

interface DynamicPlayerListProps {
  playerArray: Player[];
  currentPlayerName?: string;
}

export default function DynamicPlayerList({ playerArray, currentPlayerName }: DynamicPlayerListProps) {
  const columns = React.useMemo(() => {
    const numberOfPlayers = playerArray.length;

    if (numberOfPlayers <= 2) {
      return [
        [playerArray[0], playerArray[1]],
      ].filter(row => row[0] !== undefined);
    }
    if (numberOfPlayers <= 4) {
      return [
        [playerArray[0]],
        [playerArray[1], playerArray[2]],
        [playerArray[3]],
      ].filter(row => row[0] !== undefined); // Filter out undefined players/rows
    }
    if (numberOfPlayers <= 6) {
      return [
        [playerArray[0]],
        [playerArray[1], playerArray[2], playerArray[3]],
        [playerArray[4], playerArray[5]],
      ].filter(row => row[0] !== undefined); // Filter out undefined players/rows
    }
    // For more than 6 players, you might return a single column layout, etc.
    // Default to a single column layout
    return [playerArray];
  }, [playerArray]);

  return (
    <div className="w-full grid gap-x-2 justify-start mt-4">
      <h4 className="font-semibold">
        Players
      </h4>
      {columns.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-start flex-wrap">
          {row.map((player, index) => player && (
            <div key={`${index}-${player.name}`} className="mt-2">
              <PlayerColorCircle playerArray={playerArray} playerName={player.name} isCurrentPlayer={player.name === currentPlayerName} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
