export enum APIResponseStates {
  SUCCESS = 'success',
}

export enum JwtToken {
  LOCAL_STORAGE_KEY = 'rg_token',
}

export interface APIResponse {
  state: "success" | "error";
  data: any;
}