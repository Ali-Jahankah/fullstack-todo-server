import express, {
  Express,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: Number(process.env.DATABASE_PORT) || 5000,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATBASE_NAME,
  synchronize: true,
});
AppDataSource.initialize()
  .then(() => {
    console.log("Database is running");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "Error in databases");
  });
