import Image from 'next/image'
import { useEffect } from 'react'
import WebSocketTest from './components/WebSocketTest'
import JoinLobby from './components/JoinLobby';

export default function Home() {

  return (
    <main>
      <JoinLobby />
      {/* <WebSocketTest /> */}
    </main>
  )
}
