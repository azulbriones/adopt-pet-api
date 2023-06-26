import bodyParser from "body-parser";
import express from "express";

import { adoptPetRouter } from "./features/pet_lover/infraestructure/routes/adopt-pet-router";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use("/adopt-pets/", adoptPetRouter);

app.listen(PORT, () => {
  console.log(`[APP] - Starting application on port ${PORT}`);
});
