import express from "express";


import { artistAuth } from "../middlewares/isArtist";


import { auth } from "../middlewares/auth";
import { authorizeMiddleware, isSuperAdmin } from "../middlewares/SuperAdmin";
import { createAppointments, getAllApointments } from "../controllers/AppointmentController";



const router = express.Router();


// ver todas las citas 
router.get("/get",auth,authorizeMiddleware(["Admin"]), getAllApointments);

// crear una cita
router.post("/newAppointment",auth,authorizeMiddleware(["Client"]),createAppointments );

// buscar una cita por id
router.get("/mysessions/:id", );

// ver citas  por un artista
router.get("/myappointments/:id", );

// eliminar cita
router.delete("/delete/:id", );
// actualizar cita
router.patch("/:id", );
export default router;