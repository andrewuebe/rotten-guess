import { GamePlayer } from "@/utilities/types/Game"
import { Player } from "@/utilities/types/Player";

interface GamePickingProps {
  pickerPlayer: GamePlayer;
  userPlayer: Player;
}

export default function GamePicking({ pickerPlayer, userPlayer }: GamePickingProps) {
  console.log('pickerPlayer: ', pickerPlayer);
  console.log('userPlayer: ', userPlayer);
  const isUserPickerPlayer = userPlayer.name === pickerPlayer.name

  if (isUserPickerPlayer) {
    // This user is the picker
    return (
      <div>
        PICKING!!!
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