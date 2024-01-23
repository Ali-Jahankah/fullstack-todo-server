import express, {
  Express,
  Request,
  Response
} from "express";

import serverless from "serverless-http";
import { tasksRouter } from "../../src/routes/tasks.routes";

const api: Express = express();
tasksRouter.get("/api", (req: Request, res: Response) => {
  res.send("Server is running");
});
api.use("/tasks", tasksRouter);
api.use("/tasks", tasksRouter);
export const handler = serverless(api);

