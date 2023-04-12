import express, {
  Router,
  Request,
  Response,
} from "express";
import { TasksController } from "../controllers/tasksController";
export const tasksRouter: Router = express.Router();

tasksRouter.get("/", (req: Request, res: Response) => {
  const controller = new TasksController();
  const allTasks = controller.getAll();
  res.send(allTasks);
});
