import express from "express";
import {
  getUsers,
  getUserById,
  seedUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/seed", seedUsers);

export default router;
