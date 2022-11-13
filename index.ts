import express, { Application } from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
