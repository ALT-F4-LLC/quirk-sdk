import fetch from "node-fetch";
import { exit } from "process";
import ws from "ws";

async function main() {
  const domain = "websocket.quirk.gg";

  const body = {
    auth_token: "<quirk-developer-token>"
  };

  const response = await fetch(`https://${domain}/token`, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

  const data = await response.json();

  const { token } = data;

  const websocket = new ws(`wss://${domain}?token=${token}`);

  websocket.on("open", () => console.log("connected"));

  websocket.on("error", console.log);

  websocket.on("message", console.log);

  websocket.on("close", console.log);
}

main().catch(e => {
  console.error(e);
  exit(1);
});
