import { tasksRouter } from "./src/routes/tasks.routes";
import express, {
  Express,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import bodyParser from "body-parser";
import cors from "cors";
import { Tasks } from "./src/entities/tasks/Tasks.entity";
const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
app.use("/tasks", tasksRouter);
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [Tasks],
});
AppDataSource.initialize()
  .then(() => {
    console.log(
      "Database is running on " + process.env.DATABASE_PORT,
    );
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "Error in databases");
  });
