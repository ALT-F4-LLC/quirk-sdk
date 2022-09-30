import fetch from "node-fetch";
import { exit } from "process";
import ws from "ws";

async function main() {
  const domain = "websocket.quirk.tools";

  const body = {
    access_token: "<quirk-developer-token>",
  };

  const response = await fetch(`https://${domain}/token`, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  const data = await response.json();

  const { access_token } = data;

  const websocket = new ws(
    `wss://websocket.quirk.tools?access_token=${access_token}`
  );

  websocket.on("open", () => console.log("connected"));

  websocket.on("error", console.log);

  websocket.on("message", console.log);

  websocket.on("close", console.log);
}

main().catch((e) => {
  console.error(e);
  exit(1);
});
