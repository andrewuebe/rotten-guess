'use client'
import { useState } from 'react';
import { createLobby, joinLobbyByToken } from '../utilities/services/lobbyService';
import { useAuth } from '../contexts/AuthContext';

export default function JoinLobby() {
  const { lobbyInfo, setAuthToken, setLobbyInfo } = useAuth();

  const handleCreateLobby = async () => {
    console.log('lets create the lobby!');
    const createLobbyResponse = await createLobby();
    if (createLobbyResponse) {
      const { lobby, token } = createLobbyResponse.data;
      setAuthToken(token);
      setLobbyInfo(lobby);
    }
  }

  if (lobbyInfo) {
    return (
      <div>
        <h1>You are cool, you are in a lobby</h1>
        <ul>
          <li>Token: {lobbyInfo.lobby_token}</li>
          <li>Players:</li>
          <ul>
            {lobbyInfo.players.map((player, index) => {
              return (
                <li key={`player_${index + 1}`}>{player.name}</li>
              )
            })}
          </ul>
        </ul>
      </div>
    )
  }

  return (
    <>
      <button onClick={() => { handleCreateLobby() }}>Create Lobby</button>
      {/* <button onClick={() => { handleJoinLobby() }}>Join Lobby</button> */}
    </>
  )
}