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
import LobbyTopBar from "./LobbyTopBar";

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
      <div className="bg-corn-soup-100 h-screen">
        <LobbyTopBar />
        <div className="container pt-4 sm:pt-8">
          <div className="mt-4">
            <h1 className="pb-4 text-eggplant-800 font-rokkitt font-black text-5xl sm:text-6xl leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
              Enter a lobby token
            </h1>
          </div>
          <form onSubmit={(e) => handleJoinLobby(e)}>
            <div className="mb-4">
              <TextInput
                value={lobbyTokenInput}
                onChange={handleInputChange}
                placeholder="Lobby token"
                type="text"
              />
            </div>
            <Button onClick={(e) => handleJoinLobby(e)} type="submit" color="vine" size="medium">
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
    )
  }

  return (
    <div className="bg-corn-soup-100 h-screen">
      <LobbyTopBar />
      <div className="container pt-4 sm:pt-8">
        <div className="flex flex-start items-center pb-4 mb-6">
          <h1 className="mt-4 flex-shrink pb-4 w-max text-eggplant-800 font-rokkitt font-black text-2xl leading-[36px] xs:text-4xl sm:text-6xl xs:leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
            Is your movie knowledge rotten, or not?
          </h1>
          <div className="w-full max-w-[210px] flex-grow">
            <img src="homepage-lad.svg" />
          </div>
        </div>
        <p className="text-eggplant-800 text-lg">
          Rotten Guess is a game where you and your friends guess the Rotten Tomatoes score of a movie. The closer you are to the actual score, the more points you get!
        </p>
        <div className="space-y-4 w-full block xs:space-y-0 xs:flex xs:flex-row xs:justify-left xs:space-x-2 mt-6">
          <Button onClick={() => setIsJoiningLobby(true)} style="secondary" size="large" className="w-full xs:w-max">
            Join Lobby
          </Button>
          <Button onClick={handleCreateLobby} style="primary" size="large" className="w-full xs:w-max">
            Start Lobby
          </Button>
        </div>
      </div>
    </div>
  )
}