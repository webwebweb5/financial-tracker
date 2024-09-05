import express from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
} from "../controllers/category.controller";

const router = express.Router();

router.get("/getAllCategories/:userId", getAllCategories);
router.post("/create", createCategory);
router.delete("/:id", deleteCategoryById);

export default router;
