export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
}

export const ReactQueryKeys = {
  LOBBY: ['lobby'],
  PLAYER: ['player'],
  GAME: ['game'],
  MOVIE: ['movie'],
}