import { validationResult } from "express-validator";
import { AppDataSource } from "./../../index";
import { Tasks } from "../entities/tasks/Tasks.entity";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      let allTasks: Tasks[] = [];
      allTasks = await AppDataSource.getRepository(
        Tasks,
      ).find({
        order: {
          date: "ASC",
        },
      });
      allTasks = instanceToPlain(allTasks) as Tasks[];
      return res
        .status(200)
        .json({ msg: "Getting all tasks", data: allTasks });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Internal server error", data: [] });
    }
  }
  public async newTask(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    return res.status(200);
  }
}

export const controller = new TasksController();
