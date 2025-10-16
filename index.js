import WebSocket, { WebSocketServer } from 'ws';

const port = process.env.PORT || 8080;

const wss = new WebSocketServer({ port });

wss.on('connection', (ws, req) => {
  const requestedProtocol = req.headers['sec-websocket-protocol'];
  console.log('Client connected, requested protocol:', requestedProtocol);

  ws.on('message', (message) => {
    const received = message.toString()
    console.log('Received:', received);
    ws.send(`${received}, ${requestedProtocol}`);
  });

  ws.on('close', () => console.log('Client disconnected'));
});

console.log(`WebSocket echo server running on ws://localhost:${port}`);
