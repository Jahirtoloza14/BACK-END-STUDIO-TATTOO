import express, { NextFunction } from "express";
import { UserControler } from "../controllers/userController";
import { authorizeMiddleware, authorizeMiddlewareAdmin } from "../middlewares/SuperAdmin";
import { artistAuth } from "../middlewares/isArtist";
import { auth } from "../middlewares/auth";



const router = express.Router();


// endpoint register admin
router.post("/registerAdmin",UserControler.registerAdmin);

// endpoint register artist
router.post("/registerArtist",UserControler.registerArtist);

// endpoint register client
router.post("/register",UserControler.register);

// endpoint login
router.post("/login", UserControler.login);

// endpoint ver todos los usuarios
router.get("/getall",auth,authorizeMiddlewareAdmin(["Admin"]), UserControler.getAll);

// endpoint ver  por usuario
router.get("/profile",auth,authorizeMiddleware(["Client","Artist","Admin"]), UserControler.getLogedUser);

// endpoint actualizar perfil
router.put('/profile/update', UserControler.updateLogedUser);




export default router;

