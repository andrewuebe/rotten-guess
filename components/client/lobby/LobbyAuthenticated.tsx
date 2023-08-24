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
    <div>
      <h1>You’re in a lobby!</h1>
      <div>
        Token: <span>{lobbyData.lobby_token}</span>
      </div>
      <PlayerList />
      {isLobbyHost && (
        <Button onClick={async () => {
          await game.start();
        }}>Start game</Button>
      )}
    </div>
  )
}