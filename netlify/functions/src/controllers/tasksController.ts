import { Request, Response } from "express";
import {
  instanceToPlain,
  plainToInstance,
} from "class-transformer";

import { AppDataSource } from "../../api";
import { Tasks } from "../entities/tasks/Tasks.entity";
import { UpdateResult } from "typeorm";
import { validationResult } from "express-validator";
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
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    try {
      const newTask: Tasks = new Tasks();

      newTask.title = req.body.title;
      newTask.description = req.body.description;
      newTask.date = req.body.date;
      newTask.status = req.body.status;
      newTask.level = req.body.level;
      const createdTask = await AppDataSource.getRepository(
        Tasks,
      ).save(newTask);
      const plainTask = instanceToPlain(createdTask);
      return res.status(201).json({
        data: plainTask,
        msg: "New task created successfuly!",
      });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Internal server error!" });
    }
  }
  public async updateTask(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    let task: Tasks | null;
    try {
      task = await AppDataSource.getRepository(
        Tasks,
      ).findOne({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Internal server error!" });
    }
    if (!task) {
      return res.status(404).json({
        msg: "Task with provided id is not found!",
      });
    }
    const updatedTask: UpdateResult =
      await AppDataSource.getRepository(Tasks).update(
        req.body.id,
        plainToInstance(Tasks, { status: req.body.status }),
      );
    const plainUpdatedTask = instanceToPlain(
      updatedTask,
    ) as UpdateResult;
    return res.status(200).json({
      msg: `Task with the id << ${req.body.id} >> succesfully update!`,
      data: plainUpdatedTask,
    });
  }
}

export const controller = new TasksController();
