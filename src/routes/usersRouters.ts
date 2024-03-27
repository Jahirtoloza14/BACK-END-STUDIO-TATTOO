import express from "express";
import { userControler } from "../controllers/userController";
import { auth } from "../middlewares/auth";


const router = express.Router();







// endpoint registro
router.post("/register",userControler.register);

// endpoint login
router.post("/login", userControler.login);

// endpoint ver todos los usuarios
router.get("/getall",userControler.getAll);

// endpoint ver  por usuario
router.get("/:id",userControler.getById);

// endpoint ver todos los artistas 
router.get("/artists/list", userControler.allArtists);


// endpoint actualizar
router.patch("/:id", auth, userControler.update);

export default router;
