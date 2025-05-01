import express from "express";
import { getAllResidencies } from "../controllers/resdCntrl.js";

const router = express.Router();

// Define the `/allresd` route
router.get("/allresd", getAllResidencies);

export { router as residencyRoute };