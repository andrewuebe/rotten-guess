import { Player } from "@/utilities/types/Player";
import { PersonIcon } from "@radix-ui/react-icons";


interface PlayerColorCircleProps {
  playerArray: Player[];
  playerName: string;
  isCurrentPlayer?: boolean;
  style?: 'default' | 'pill';
}

export default function PlayerColorCircle({ playerArray, playerName, isCurrentPlayer = false, style = 'pill' }: PlayerColorCircleProps) {
  const indexColorClassMap = ['bg-tomato-soup-500', 'bg-vine-500', 'bg-eggplant-500', 'bg-pumpkin-500', 'bg-bird-egg-500', 'bg-corn-soup-500'];
  const indexBorderClassMap = ['border-tomato-soup-500', 'border-vine-500', 'border-eggplant-500', 'border-pumpkin-500', 'border-bird-egg-500', 'border-corn-soup-500'];
  const playerIndex = playerArray.findIndex(player => player.name === playerName);

  if (style === 'pill') {
    return (
      <span className={`text-sm inline-flex items-center align-middle mr-1 ${indexColorClassMap[playerIndex]} bg-opacity-40 border-2 ${indexBorderClassMap[playerIndex]} rounded-full p-1 px-3`}>
        {isCurrentPlayer && (
          <div className="mr-1">
            <PersonIcon />
          </div>
        )}
        {playerName}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center align-middle">
      <div
        className={`inline-flex items-center align-middle justify-center h-3.5 w-3.5 rounded-full mr-1 ${indexColorClassMap[playerIndex]}`}
      >
        {isCurrentPlayer && (
          <div className="h-1.5 w-1.5 rounded-full bg-corn-soup-100 bg-opacity-80 animate-pulse"></div>
        )}
      </div>
      {playerName}
    </span >
  );
}
