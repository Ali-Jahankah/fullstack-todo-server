import { AppDataSource } from "./../../index";
import { Tasks } from "../entities/tasks/Tasks.entity";

export class TasksController {
  constructor(
    private tasksRepo = AppDataSource.getRepository(Tasks),
  ) {}

  public async getAll(): Promise<Tasks[]> {
    try {
      let allTasks: Tasks[] = [];
      allTasks = await this.tasksRepo.find({
        order: {
          date: "ASC",
        },
      });
      console.log(allTasks);
      return allTasks;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
