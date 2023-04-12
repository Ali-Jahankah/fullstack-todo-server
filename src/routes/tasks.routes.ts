import { tasksValidator } from "./../validator/tasksValidator";
import express, { Router } from "express";
import { controller } from "../controllers/tasksController";
export const tasksRouter: Router = express.Router();

tasksRouter.get("/", controller.getAll);
tasksRouter.post(
  "/new-task",
  tasksValidator,
  controller.newTask,
);
