import express, { Express, Request, Response, Router } from "express";

import serverless from "serverless-http";
import { tasksRouter } from "../../src/routes/tasks.routes";

const router: Router = express.Router();
const api: Express = express();
api.get("/api", (req: Request, res: Response) => {
  res.send("Server is running");
});
router.use("/tasks", tasksRouter);
api.use("/api", router);
export const handler = serverless(api);
