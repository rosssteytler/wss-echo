import WebSocket, { WebSocketServer } from 'ws';

const port = process.env.PORT || 8080;

const wss = new WebSocketServer({ port });

wss.on('connection', (ws, req) => {
  const requestedProtocol = req.headers['sec-websocket-protocol'];
  if (requestedProtocol) {
    console.log('Client requested protocol:', requestedProtocol);
    ws.protocol = requestedProtocol;
  }

  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(message); // echo
  });

  ws.on('close', () => console.log('Client disconnected'));
});

console.log(`WebSocket echo server running on ws://localhost:${port}`);
