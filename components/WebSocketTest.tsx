'use client'

import { useState, useEffect } from 'react';

export default function WebSocketTest() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const handleEmitSomething = () => {
    if (!socket) return;
    socket.send('something');
  };
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:3000');
    setSocket(webSocket);
  }, []);
  return (
    <div>
      <p>Mamma freaking mia!!</p>
      <button onClick={handleEmitSomething}>Emit something</button>
    </div>
  )
}