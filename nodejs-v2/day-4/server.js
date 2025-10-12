import app from "./src/app.js";
import "dotenv/config.js";
const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
  console.log("app started http://localhost:3050");
});
