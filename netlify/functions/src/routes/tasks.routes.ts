import express, { Router } from "express";
import {
  tasksValidator,
  updateValidator,
} from "./../validator/tasksValidator";

import { controller } from "../controllers/tasksController";
export const tasksRouter: Router = express.Router();
tasksRouter.get("/", controller.getAll);
tasksRouter.post(
  "/new-task",
  tasksValidator,
  controller.newTask,
);
tasksRouter.put(
  "/update-task",
  updateValidator,
  controller.updateTask,
);
