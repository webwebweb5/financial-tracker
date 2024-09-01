import express from "express";
import {
  getAllByUserID,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
} from "../controllers/financial-controller";

const router = express.Router();

router.get("/getAllByUserID/:userId", getAllByUserID);
router.post("/", createFinancialRecord);
router.put("/:id", updateFinancialRecord);
router.delete("/:id", deleteFinancialRecord);

export default router;
