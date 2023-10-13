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