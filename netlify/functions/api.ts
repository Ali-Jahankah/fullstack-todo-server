import express, {
  Express,
  Request,
  Response,
  Router
} from "express";

import serverless from "serverless-http";
import { tasksRouter } from "../../src/routes/tasks.routes";

const router = Router()
const api: Express = express();
router.get("/api", (req: Request, res: Response) => {
  res.send("Server is running");
});
api.use("/tasks", tasksRouter);
api.use("/tasks", tasksRouter);
export const handler = serverless(api);

