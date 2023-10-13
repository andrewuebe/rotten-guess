import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { Lobby } from "@/utilities/types/Lobby";
import { useQueryClient } from "@tanstack/react-query";
import { StarFilledIcon } from "@radix-ui/react-icons";
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
        <div className="flex justify-center items-center" key={`${index}-${player.name}`}>
          {player.name}
          {index === 0 && <span className="ml-1 text-yellow-500" title="lobby host"><StarFilledIcon width="15" height="15" /></span>}
        </div>
      ))}
    </div>
  );
}