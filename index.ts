import express, {
  Express,
  Request,
  Response,
} from "express";
import { DataSource } from "typeorm";
import { Tasks } from "./src/entities/tasks/Tasks.entity";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { tasksRouter } from "./src/routes/tasks.routes";
const { neon } = require("@neondatabase/serverless");

// Load env variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Raw Neon SQL setup
const sql = neon(process.env.DATABASE_URL);

// TypeORM setup
export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as any) || "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: true, // Only for dev
  entities: [Tasks],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database is running...");

    // Routes
    app.get("/api", (req: Request, res: Response) => {
      res.send("Server is running");
    });

    app.get(
      "/neon-version",
      async (req: Request, res: Response) => {
        const result = await sql`SELECT version()`;
        res.send(result[0]);
      },
    );

    app.use("/api/tasks", tasksRouter);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in database:", err);
  });
