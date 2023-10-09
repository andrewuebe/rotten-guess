import { useState } from "react";
import Button from "../buttons/Button";
import { useAuth } from "../../../app/contexts/AuthContext";
import { createLobby } from "@/utilities/services/lobbyService";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import TextInput from "../inputs/TextInput";
import { useLobby } from "@/utilities/hooks/useLobby";
import GameRoundHeader from "../game/GameRoundHeader";

export default function LobbyUnauthenticated() {
  const { saveAuthToken } = useAuth();
  const lobby = useLobby();
  const queryClient = useQueryClient();

  const [isJoiningLobby, setIsJoiningLobby] = useState(false);
  const [lobbyTokenInput, setLobbyTokenInput] = useState('');

  const handleCreateLobby = async () => {
    console.log('lets create the lobby!');
    await lobby.createNew();
  }

  const handleJoinLobby = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    await lobby.join(lobbyTokenInput);
  }

  if (isJoiningLobby) {
    return (
      <div>
        <form onSubmit={(e) => handleJoinLobby(e)}>
          <TextInput
            value={lobbyTokenInput}
            onChange={(value) => setLobbyTokenInput(value)}
            placeholder="Lobby token"
            type="text"
          />
          <Button onClick={(e) => handleJoinLobby(e)} type="submit" color="primary" size="medium">
            Join Lobby
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <GameRoundHeader title="Rotten Guess" />
      <div className="flex flex-row justify-center w-full space-x-2">
        <Button onClick={handleCreateLobby} color="primary" size="medium">
          Start Lobby
        </Button>
        <Button onClick={() => setIsJoiningLobby(true)} color="primary" size="medium">
          Join Lobby
        </Button>
      </div>
    </div>
  )
}