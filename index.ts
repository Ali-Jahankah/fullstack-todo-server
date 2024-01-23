import express, {
  Express,
  Request,
  Response
} from "express";

import { DataSource } from "typeorm";
import { Tasks } from "./src/entities/tasks/Tasks.entity";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { tasksRouter } from "./src/routes/tasks.routes";

const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 4001;
app.get("/api", (req: Request, res: Response) => {
  res.send("Server is running");
});
app.use("/tasks", tasksRouter);
export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://vpfejssl:qWVDOYQev2sX88lxgw7FXmXuX_lNEbhG@rogue.db.elephantsql.com/vpfejssl",
  // port: Number(process.env.DATABASE_PORT) || 5432,
  // password: process.env.DATABASE_PASSWORD || 'qWVDOYQev2sX88lxgw7FXmXuX_lNEbhG',
  // username: process.env.DATABASE_USERNAME || 'vpfejssl',
  // database: process.env.DATABASE_NAME || 'vpfejssl',
  synchronize: true,
  entities: [Tasks]
});
AppDataSource.initialize()
  .then(() => {
    console.log(
      "Database is running",
    );
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "Error in databases");
  });

