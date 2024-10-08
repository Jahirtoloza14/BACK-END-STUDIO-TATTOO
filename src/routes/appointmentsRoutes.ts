import express from "express";
import { auth } from "../middlewares/auth";
import { authorizeMiddleware, authorizeMiddlewareArtist } from "../middlewares/SuperAdmin";
import { AppointmentController, deleteAppointment, getAllApointments, getByLogedArtist, getByLogedClient, updateAppointment } from "../controllers/AppointmentController";



const router = express.Router();

// ver todas las citas 
router.get("/get", getAllApointments);

// crear una cita
router.post("/newAppointment", AppointmentController.createAppointment);

// buscar una cita por id
router.get("/myappointment/appointment", auth, authorizeMiddleware(["Client"]),getByLogedClient);

// ver citas  por un artista
router.get("/myappointments/:id", auth, authorizeMiddlewareArtist(["Artist"]), getByLogedArtist);

// eliminar cita
router.delete("/delete/:id", auth, authorizeMiddleware(["Client"]), deleteAppointment);

// actualizar cita
router.put("/:id", updateAppointment);
export default router;