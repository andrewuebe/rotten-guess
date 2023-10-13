import { useState } from "react";
import Button from "../buttons/Button";
import { useAuth } from "../../../app/contexts/AuthContext";
import { createLobby } from "@/utilities/services/lobbyService";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import TextInput from "../inputs/TextInput";
import { useLobby } from "@/utilities/hooks/useLobby";
import GameRoundHeader from "../game/GameRoundHeader";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function LobbyUnauthenticated() {
  const { saveAuthToken } = useAuth();
  const lobby = useLobby();
  const queryClient = useQueryClient();

  const [isJoiningLobby, setIsJoiningLobby] = useState(false);
  const [lobbyTokenInput, setLobbyTokenInput] = useState('');

  const [lobbyJoinError, setLobbyJoinError] = useState('');

  const handleCreateLobby = async () => {
    console.log('lets create the lobby!');
    await lobby.createNew();
  }

  const handleInputChange = (value: string) => {
    setLobbyJoinError('');
    setLobbyTokenInput(value);
  }

  const handleJoinLobby = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevent the default form submission
    setLobbyJoinError('');
    const joinLobbyResponse = await lobby.join(lobbyTokenInput);
    if (!joinLobbyResponse) {
      setLobbyJoinError('Invalid lobby token');
    }
  }

  if (isJoiningLobby) {
    return (
      <div className="bg-rose-600 h-screen">
        <GameRoundHeader title="Enter token" />
        <div className="mt-6 max-w-[750px] m-auto px-2">
          <div className="rounded-md bg-rose-100 shadow p-4">
            <form onSubmit={(e) => handleJoinLobby(e)}>
              <div className="mb-4">
                <TextInput
                  value={lobbyTokenInput}
                  onChange={handleInputChange}
                  placeholder="Lobby token"
                  type="text"
                />
              </div>
              <Button onClick={(e) => handleJoinLobby(e)} type="submit" color="primary" size="medium">
                Join Lobby
              </Button>
              {lobbyJoinError && (
                <div className="flex flex-start items-center text-rose-800 mt-2">
                  <span className="mr-2"><ExclamationTriangleIcon /></span>{lobbyJoinError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="bg-rose-600 h-screen">
      <GameRoundHeader title="Rotten Guess" />
      <div className="mt-6 max-w-[750px] m-auto px-2">
        <div className="rounded-md bg-rose-100 shadow p-4">
          <h3 className="mb-4 text-ce">
            Test your knowledge of Rotten Tomatoes scores with your friends!
          </h3>
          <div className="flex flex-row justify-center w-full space-x-2">
            <Button onClick={handleCreateLobby} color="primary" size="medium">
              Start Lobby
            </Button>
            <Button onClick={() => setIsJoiningLobby(true)} color="primary" size="medium">
              Join Lobby
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}