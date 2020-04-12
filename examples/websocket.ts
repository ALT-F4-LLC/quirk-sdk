import fetch from "node-fetch";
import { exit } from "process";
import websocket from "ws";

async function main() {
  const base = "https://websocket.quirk.gg";

  const body = {
    auth_token: "<quirk-developer-token>"
  };

  const response = await fetch(`${base}/token`, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

  const data = await response.json();

  const { token } = data;

  const query = `?token=${token}&EIO=3&transport=websocket`;

  const ws = new websocket(`${base}/socket.io/${query}`);

  ws.on("open", () => setInterval(() => ws.ping(), 25000));

  ws.on("message", console.log);
}

main().catch(e => {
  console.error(e);
  exit(1);
});
