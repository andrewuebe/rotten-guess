import { APIResponse } from "../constants/APIConstants";

export interface Pick {
  movie_id?: string;
  rt_score?: number;
  timed_out?: boolean;
}

export interface Guess {
  player_id?: string;
  name: string;
  guess?: string;
  points?: number;
  timed_out?: boolean;
};

export enum GameStatus {
  'IN_PROGRESS' = 'IN_PROGRESS',
  'FINISHED' = 'FINISHED'
}

export enum RoundType {
  'GUESS_SCORE' = 'GUESS_SCORE',
  'GUESS_MOVIE' = 'GUESS_MOVIE'
};

export enum RoundStatus {
  'PICKING' = 'PICKING',
  'GUESSING' = 'GUESSING',
  'SCORES' = 'SCORES'
};

export interface GamePlayer {
  player_id: string;
  name: string;
}

interface EndTimes {
  [RoundStatus.PICKING]: Date | null;
  [RoundStatus.GUESSING]: Date | null;
  [RoundStatus.SCORES]: Date | null;
}

export interface Round {
  round_number: number;
  round_type: RoundType;
  round_status: RoundStatus;
  picker_player: GamePlayer;
  pick: Pick;
  guesses: Guess[] | [];
  end_times: EndTimes;
};

export interface PlayerScore extends GamePlayer {
  score: number;

};

export interface Game {
  lobby_id: string;
  current_round: number;
  status: string;
  rounds: Round[];
  player_scores: PlayerScore[];
};

export interface GetGameResponse extends APIResponse {
  data: Game;
  rounds_as_picker: number;
};

export interface UpdatedRoundResponse extends APIResponse {
  data: {
    updatedRound: Round;
    game: Game;
  }
}