import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input";

const apiId = Number(process.env.API_ID_TELEGRAM) || 0;
const apiHash = process.env.API_HASH_TELEGRAM || "";
const stringSession = new StringSession(""); // fill this later with the value from session.save()

const loginUser = async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("number?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("Code?"),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("https://t.me/CTOofMorud", { message: "gm sirs" });
};

export default loginUser;
