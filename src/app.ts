import express, { Express } from "express";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import { PORT } from "./config/constants";
import routes from "./routes";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

export const createApp = (): Express => {
  const app = express();

  app.set(PORT, process.env.DB_PORT || 8000);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(expressRateLimit({ windowMs: 60 * 1000, max: 30 }));
  app.use(helmet());
  app.use(compression());
  app.use("/api", routes);

  return app;
};
