import express, { NextFunction } from "express";
import { UserControler } from "../controllers/userController";

import { authorizeMiddleware, isSuperAdmin } from "../middlewares/SuperAdmin";
import { artistAuth } from "../middlewares/isArtist";
import { auth } from "../middlewares/auth";


const router = express.Router();


// endpoint registro
router.post("/register",UserControler.register);

// endpoint login
router.post("/login", UserControler.login);

// endpoint ver todos los usuarios
router.get("/getall",auth,isSuperAdmin, UserControler.getAll);

// endpoint ver  por usuario
router.get("/profile",auth,authorizeMiddleware(["Artist","Client"]), UserControler.getLogedUser);


router.put('/profile/update', UserControler.updateLogedUser);


// endpoint ver todos los artistas 
router.get("/artists/list");




// crear artistas 
router.post("/artists/create");

// eliminar 
router.delete("/artists/delete",artistAuth);


export default router;

