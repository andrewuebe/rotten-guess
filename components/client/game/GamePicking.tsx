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
  const { roundEndPicking } = useGame();

  const handleMoviePick = (movie: any) => {
    if (isUserPickerPlayer) {
      roundEndPicking({ movie_id: movie._id });
    }
  }

  if (isUserPickerPlayer) {
    // This user is the picker
    return (

      <div className="w-full h-screen">
        <div className="bg-rose-600 h-full">
          <div className="mb-4">
            <GameRoundHeader title="Pick a movie" />
          </div>
          <MoviePicker onPick={handleMoviePick} />
        </div>
      </div>
    )
  }
  // This user will guess once the picker is done picking
  return (
    <div>
      WAITING FOR {pickerPlayer.name} TO PICK
    </div>
  )
}