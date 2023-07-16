import { Player } from './Player';

export interface Lobby {
  lobby_token: string;
  game_id: string | null;
  players: Player[];
  is_active: boolean;
  is_public: boolean;
  lobby_max_size: number;
}