import express from "express";


import { artistAuth } from "../middlewares/isArtist";


import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/SuperAdmin";
import { createAppointments } from "../controllers/AppointmentController";



const router = express.Router();


// ver todas las citas 
router.get("/get",auth,isSuperAdmin);

// crear una cita
router.post("/newAppointment", createAppointments );

// buscar una cita por id
router.get("/mysessions/:id", );

// ver citas  por un artista
router.get("/myappointments/:id", );

// eliminar cita
router.delete("/delete/:id", );
// actualizar cita
router.patch("/:id", );
export default router;