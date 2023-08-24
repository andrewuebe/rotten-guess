import ApiService from './axiosService';
import { getApiUrl } from '../helpers/generalHelpers';

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