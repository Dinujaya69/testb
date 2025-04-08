import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  filterUsersByName,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/reg", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/filter", filterUsersByName);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
