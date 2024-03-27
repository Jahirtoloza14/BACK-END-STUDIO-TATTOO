import express from "express";
import userRoutes from "./usersRouters";
import appointmentsRoutes from "./appointmentsRoutes";


const router = express.Router();

// API routes

router.use('/users', userRoutes);
router.use('/appointments', appointmentsRoutes);

export default router;


