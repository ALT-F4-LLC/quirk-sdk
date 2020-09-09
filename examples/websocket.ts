import { exit } from "process";
import ws from "ws";

async function main() {
  const token = "<quirk-developer-token>";

  const websocket = new ws(`wss://websocket.quirk.gg?token=${token}`);

  websocket.on("open", () => console.log("connected"));

  websocket.on("error", console.log);

  websocket.on("message", console.log);

  websocket.on("close", console.log);
}

main().catch((e) => {
  console.error(e);
  exit(1);
});
