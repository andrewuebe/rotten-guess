import { useQueryClient } from "@tanstack/react-query";
import Button from "../buttons/Button";
import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import React, { useMemo } from "react";
import { useLobby } from "@/utilities/hooks/useLobby";
import { Player } from "@/utilities/types/Player";
import Game from "../game/Game";
import LobbyTopBar from "./LobbyTopBar";
import PlayerColorCircle from "../players/PlayerColorCircle";
import DynamicPlayerList from "../players/DynamicPlayerList";
import useSocketLogic from "@/utilities/hooks/useSocket";
import { useGame } from "@/utilities/hooks/useGame";

export default function LobbyAuthenticated() {
  const queryClient = useQueryClient();
  const { data: lobbyData, leave } = useLobby();
  const { start } = useGame();
  const playerData = queryClient.getQueryData<Player>(ReactQueryKeys.PLAYER);
  const socketLogic = useSocketLogic();

  const isLobbyHost = useMemo(() => {
    if (!lobbyData || !playerData) return false;
    const hostPlayer = lobbyData.players[0];
    if (hostPlayer.name === playerData.name) return true;
    return false;
  }, [lobbyData, playerData]);

  if (!lobbyData) {
    return null; // or some fallback UI
  }

  if (lobbyData.is_in_game) {
    return (
      <Game />
    )
  }

  return (
    <div className="bg-corn-soup-100 h-screen">
      <LobbyTopBar />
      <div className="container pt-4 sm:pt-8">
        <div className="mt-4">
          <div className="">Lobby</div>
          <h1 className="pb-4 text-eggplant-800 font-rokkitt font-black text-5xl sm:text-6xl leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
            {lobbyData.lobby_token}
          </h1>
        </div>
        <p className="text-eggplant-800 text-lg mb-4">
          You are: <PlayerColorCircle playerArray={lobbyData?.players} playerName={playerData?.name as string} isCurrentPlayer />
        </p>
        <p className="text-eggplant-800 text-base">
          Once everyone who wants to play has joined the game (using the lobby token “{lobbyData.lobby_token}”), the lobby host can start the game!
        </p>
        <div>
          <DynamicPlayerList playerArray={lobbyData?.players} currentPlayerName={playerData?.name as string} />
        </div>
        <p className="mt-6 text-sm">
          {isLobbyHost ? 'As the lobby host, it’s up to you to start the game' : 'You are not the host, so you need to wait for the host to start the game'}
        </p>
        <div className="space-y-4 w-full block flex-col flex-col-reverse xs:space-y-0 xs:flex xs:flex-row xs:justify-left xs:space-x-2 mt-2">
          <Button onClick={() => leave()} style="secondary" size="large" color="eggplant" className="w-full xs:w-max">
            Leave Lobby
          </Button>
          {isLobbyHost && (
            <Button onClick={() => start()} style="primary" size="large" className="w-full xs:w-max">
              Start Game
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}