import { useQueryClient } from "@tanstack/react-query";
import Button from "../buttons/Button";
import PlayerList from "./players/PlayerList";
import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { Lobby } from "@/utilities/types/Lobby";
import useSocketLogic from "@/utilities/hooks/useSocket";
import React, { useEffect, useMemo } from "react";
import { useGame } from "@/utilities/hooks/useGame";
import { Player } from "@/utilities/types/Player";
import Game from "../game/Game";
import GameRoundHeader from "../game/GameRoundHeader";
import LobbyTopBar from "./LobbyTopBar";
import PlayerColorCircle from "../players/PlayerColorCircle";
import DynamicPlayerList from "../players/DynamicPlayerList";

export default function LobbyAuthenticated() {
  const queryClient = useQueryClient();
  const lobbyData = queryClient.getQueryData<Lobby>(ReactQueryKeys.LOBBY);
  const playerData = queryClient.getQueryData<Player>(ReactQueryKeys.PLAYER);
  const socketLogic = useSocketLogic();
  const game = useGame();

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
        <div className="space-y-4 w-full block xs:space-y-0 xs:flex xs:flex-row xs:justify-left xs:space-x-2 mt-6">
          <Button onClick={() => console.log('lol')} style="secondary" size="large" color="eggplant" className="w-full xs:w-max">
            Leave Lobby
          </Button>
          {isLobbyHost && (
            <Button onClick={() => { }} style="primary" size="large" className="w-full xs:w-max">
              Start Lobby
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-rose-600 h-screen text-center">
      <GameRoundHeader title="In Lobby" subTitle="Once everyone who wants to play has joined the game, the lobby host can start the game!" />
      <div className="max-w-[750px] m-auto px-2">
        <div className="rounded-md bg-rose-100 shadow p-4">
          <div className="text-xl mb-2">
            Join token: <span className="font-mono">{lobbyData.lobby_token}</span>
          </div>
          <div className="mb-2">You are: "{playerData?.name}"</div>
          <h4 className="font-bold">Players:</h4>
          <PlayerList />
          {isLobbyHost && (
            <div className="mt-4">
              <Button onClick={async () => {
                await game.start();
              }}>Start game</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}