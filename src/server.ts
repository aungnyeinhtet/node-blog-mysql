import * as dotenv from "dotenv";
import { createApp } from "./app";
import { PORT } from "./config/constants";

dotenv.config();

/**
 * bootstrap server
 *
 * @return
 */

(async () => {
  const app = createApp();
  app.listen(app.get(PORT), () => {
    console.log(
      `[${process.env.NODE_ENV}] Server is up and running on PORT:${app.get(
        PORT
      )}`
    );
  });
})();
