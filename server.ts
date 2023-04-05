import express, { Express, Request, Response } from "express";

const PORT = process.env.PORT || 4000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
