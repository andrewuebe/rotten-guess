import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { Lobby } from "@/utilities/types/Lobby";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function PlayerList() {
  const queryClient = useQueryClient();
  const lobbyData = queryClient.getQueryData<Lobby>(ReactQueryKeys.LOBBY);

  if (!lobbyData?.players) {
    return (
      <div>
        No one is in this lobby!
      </div>
    );
  }

  return (
    <div>
      {lobbyData?.players.map((player, index) => (
        <div key={`${index}-${player.name}`}>
          {player.name}
        </div>
      ))}
    </div>
  );
}