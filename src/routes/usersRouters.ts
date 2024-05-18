import express, { NextFunction } from "express";
import { UserControler } from "../controllers/userController";

import { isSuperAdmin } from "../middlewares/SuperAdmin";
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
router.get("/profile", UserControler.getLogedUser);


router.put('/profile/update', UserControler.updateLogedUser);


// endpoint ver todos los artistas 
router.get("/artists/list", UserControler.allArtists);




// crear artistas 
router.post("/artists/create", UserControler.createArtist);

// eliminar 
router.delete("/artists/delete",artistAuth, UserControler.delete);


export default router;

