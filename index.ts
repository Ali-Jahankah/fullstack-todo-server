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

console.log('test');
const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 4001;
app.get("/api", (req: Request, res: Response) => {
  res.send("Server is running");
});
app.use("/api/tasks", tasksRouter);
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any || 'postgres',
  url: 'postgres://vpfejssl:qWVDOYQev2sX88lxgw7FXmXuX_lNEbhG@rogue.db.elephantsql.com/vpfejssl',
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

