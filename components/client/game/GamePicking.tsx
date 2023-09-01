import { GamePlayer } from "@/utilities/types/Game"
import { Player } from "@/utilities/types/Player";
import MoviePicker from "../pickers/MoviePicker";
import { useGame } from "@/utilities/hooks/useGame";

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
      <div>
        <MoviePicker onPick={handleMoviePick} />
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