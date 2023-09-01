import ApiService from './axiosService';
import { getApiUrl } from '../helpers/generalHelpers';
import { Guess, Pick } from '../types/Game';

const gameService = new ApiService({ baseUrl: getApiUrl() });

export const startGame = async () => {
  try {
    const response = await gameService.post('/game/start');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGame = async () => {
  try {
    const response = await gameService.get('/game');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const endPicking = async (pick: Pick) => {
  try {
    const response = await gameService.post('/game/round/picking-end', { pick: pick });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const endGuessing = async (guess: Guess) => {
  try {
    const response = await gameService.post('/game/round/guessing-end', { guess: guess });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}