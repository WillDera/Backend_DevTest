import express, { Application } from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello Express app");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
