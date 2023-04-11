import express, {
  Router,
  Request,
  Response,
} from "express";

export const tasksRouter: Router = express.Router();

tasksRouter.get("/", (req: Request, res: Response) => {
  res.send("Get all the tasks");
});
