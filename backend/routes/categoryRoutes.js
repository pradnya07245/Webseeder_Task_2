import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

export default router;
