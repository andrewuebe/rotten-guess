import { APIResponse } from '../constants/APIConstants';
import { Player } from './Player';

export interface Lobby {
  lobby_token: string;
  game_id: string | null;
  players: Player[];
  is_in_game: boolean;
  is_public: boolean;
  lobby_max_size: number;
}

export interface GetLobbyResponse extends APIResponse {
  data: {
    lobby: Lobby;
    player: Player;
  }
}

export interface JoinCreateLobbyResponse extends APIResponse {
  data: {
    lobby: Lobby;
    player: Player;
    token: string;
  }
}