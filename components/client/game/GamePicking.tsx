import { GamePlayer } from "@/utilities/types/Game"
import { Player } from "@/utilities/types/Player";
import MoviePicker from "../pickers/MoviePicker";
import { useGame } from "@/utilities/hooks/useGame";
import GameRoundHeader from "./GameRoundHeader";

interface GamePickingProps {
  pickerPlayer: GamePlayer;
  userPlayer: Player | undefined;
}

export default function GamePicking({ pickerPlayer, userPlayer }: GamePickingProps) {
  const isUserPickerPlayer = userPlayer?.name === pickerPlayer.name
  const { roundEndPicking, data } = useGame();

  const handleMoviePick = (movie: any) => {
    if (isUserPickerPlayer) {
      roundEndPicking({ movie_id: movie._id });
    }
  }

  if (isUserPickerPlayer) {
    // This user is the picker
    return (
      <div>
        <div className="">Round {data.current_round}</div>
        <h1 className="pb-4 text-eggplant-800 font-rokkitt font-black text-5xl sm:text-6xl leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
          Pick a movie
        </h1>
        <MoviePicker onPick={handleMoviePick} />
      </div>
    )
  }
  // This user will guess once the picker is done picking
  return (
    <div>
      <div className="">Round {data.current_round}</div>
      <h1 className="pb-4 text-eggplant-800 font-rokkitt font-black text-5xl sm:text-6xl leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
        Pick a movie
      </h1>
      <p className="mt-6">
        You’re waiting for ${pickerPlayer.name} to pick, when they're done it will be your turn to guess!
      </p>
    </div>
  )
}