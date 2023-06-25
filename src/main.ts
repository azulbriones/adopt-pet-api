import bodyParser from "body-parser";
import express from "express";

// import { userRouter } from "./features/user/infraestructure/routes/user-router";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

//app.use("/users/", userRouter);

app.listen(PORT, () => {
  console.log(`[APP] - Starting application on port ${PORT}`);
});
