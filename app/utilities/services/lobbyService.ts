import ApiService from './axiosService';
import { APIResponseStates, JwtToken } from '../constants/APIConstants';
import { getApiUrl } from '../helpers/generalHelpers';
import axios, { AxiosError } from 'axios';

const lobbyService = new ApiService({ baseUrl: getApiUrl() });

export const getLobby = async () => {
  try {
    const response = await lobbyService.get('/lobby');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLobbyByToken = async (code: string) => {
  try {
    const response = await lobbyService.get(`/lobby/${code}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const joinLobbyByToken = async (lobbyToken: string, playerName?: string) => {
  try {
    const response = await lobbyService.post('/lobby/join', { lobbyToken, playerName: playerName ?? null });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const createLobby = async (data?: any) => {
  try {
    console.log('we are here in create lobby');
    const response = await lobbyService.post('/lobby', data);
    console.log(response);
    if (response.data.state === APIResponseStates.SUCCESS) {
      localStorage.setItem(JwtToken.LOCAL_STORAGE_KEY, response.data.data.token);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};