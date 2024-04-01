import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isArtist } from "../middlewares/isArtist";
import { SuperAdmin } from "../middlewares/SuperAdmin";



const router = express.Router();
const appointmentController = new AppointmentController();

// ver todas las citas 
router.get("/get", auth, SuperAdmin, appointmentController.getAll);

// crear una cita
router.post("/newAppointment", auth, appointmentController.create);

// buscar una cita por id
router.get("/mysessions/:id", auth, appointmentController.getById);

// ver citas  por un artista
router.get("/myappointments/:id", auth, isArtist, appointmentController.getByArtist);

export default router;