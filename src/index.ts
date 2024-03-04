import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { Logger, ILogObj } from "tslog";
import ImageRouter from "./router/ImageRouter";
import fileUpload from "express-fileupload";
import { getRedisClient } from "./helper/redisConnect";
import path from "path";
import { RedisClientType } from "redis";

dotenv.config();

const logger: Logger<ILogObj> = new Logger();

class App {
  public app: Application;
  public client: RedisClientType;
  constructor() {
    this.app = express();
    this.routes();
    this.redisConnection();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Welcome");
    });
    this.app.use("/app", ImageRouter);
  }

  protected async redisConnection(): Promise<void> {
    try {
      await getRedisClient();
      console.log("Hello from redis");
    } catch (error) {
      console.error("Redis connection error:", error);
    }
  }
}
const app = new App().app;

app.use(require("express-status-monitor")());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.listen(process.env.PORT || 5000, () => {
  logger.info("Server running on port " + process.env.PORT);
});
