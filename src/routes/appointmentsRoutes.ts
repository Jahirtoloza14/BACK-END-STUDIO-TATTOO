import express from "express";


import { artistAuth } from "../middlewares/isArtist";

import AppointmentControler from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/SuperAdmin";



const router = express.Router();


// ver todas las citas 
router.get("/get",auth,isSuperAdmin, AppointmentControler.getAppointments);

// crear una cita
router.post("/newAppointment", AppointmentControler.create );

// buscar una cita por id
router.get("/mysessions/:id", );

// ver citas  por un artista
router.get("/myappointments/:id", );

// eliminar cita
router.delete("/delete/:id", );
// actualizar cita
router.patch("/:id", );
export default router;