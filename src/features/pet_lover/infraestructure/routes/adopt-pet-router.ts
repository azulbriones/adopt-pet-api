import express from "express";

import {
  addNewPetUseController,
  deletePetUseController,
  getAllPetsUseController,
  getPetByFoundationIdUseController,
  getPetByIdUseController,
  getPetByOwnerIdUseController,
  updatePetUseController,
} from "../dependecies";

const adoptPetRouter = express.Router();

adoptPetRouter.get(
  "/",
  getAllPetsUseController.run.bind(getAllPetsUseController)
);
adoptPetRouter.get(
  "/:id",
  getPetByIdUseController.run.bind(getPetByIdUseController)
);
adoptPetRouter.post(
  "/",
  addNewPetUseController.run.bind(addNewPetUseController)
);
adoptPetRouter.delete(
  "/:id",
  deletePetUseController.run.bind(deletePetUseController)
);
adoptPetRouter.get(
  "/owner/:ownerId",
  getPetByOwnerIdUseController.run.bind(getPetByOwnerIdUseController)
);
adoptPetRouter.get(
  "/foundation/:foundationId",
  getPetByFoundationIdUseController.run.bind(getPetByFoundationIdUseController)
);
adoptPetRouter.put(
  "/:id",
  updatePetUseController.run.bind(updatePetUseController)
);

export { adoptPetRouter };
