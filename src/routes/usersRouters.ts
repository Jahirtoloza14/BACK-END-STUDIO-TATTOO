import express from "express";
import { UserControler } from "../controllers/userController";
import { auth } from "../middlewares/auth";
import { SuperAdmin } from "../middlewares/SuperAdmin";

const router = express.Router();


// endpoint registro
router.post("/register",UserControler.register);

// endpoint login
router.post("/login", UserControler.login);

// endpoint ver todos los usuarios
router.get("/getall",UserControler.getAll);

// endpoint ver  por usuario
router.get("/:id",UserControler.getById);

// endpoint ver todos los artistas 
router.get("/artists/list", UserControler.allArtists);


// endpoint actualizar
router.patch("/:id", auth, UserControler.update);

// crear artistas 
router.post("/artists/create", UserControler.createArtist);
export default router;
