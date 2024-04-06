import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isArtist } from "../middlewares/isArtist";
import { SuperAdmin } from "../middlewares/SuperAdmin";



const router = express.Router();
const appointmentController = new AppointmentController();

// ver todas las citas 
router.get("/get",auth,  appointmentController.getAll);

// crear una cita
router.post("/newAppointment", auth, appointmentController.create);

// buscar una cita por id
router.get("/mysessions/:id", auth, appointmentController.getById);

// ver citas  por un artista
router.get("/myappointments/:id", auth, isArtist, appointmentController.getByArtist);

// eliminar cita
router.delete("/delete/:id", auth, appointmentController.deleteAppointment);
// actualizar cita
router.patch("/:id", auth, appointmentController.updateAppointment);
export default router;