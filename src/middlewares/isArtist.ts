import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config/config";

/*export const isArtist = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.tokenData);

  const roles = req.tokenData.userRoles;

  if (!roles.includes("artist")) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "No tienes permiso para acceder.",
    });
  }

  next();
};*/

/*export const artistMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Se requiere un token de autenticación",
    });
  }

  try {
    const decodedToken: any = jwt.verify(token, 'TODO_SECRET'); // Aquí debes usar tu secreto real

    // Verifica si el rol del usuario es "artista"
    if (decodedToken.role !== 'artist') {
      return res.status(403).json({
        message: "Acceso denegado. Se requiere el rol de 'artista'",
      });
    }

    // Si el usuario tiene el rol de artista, permite el acceso
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};*/





// Middleware para verificar el token de artista
export const artistAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).send("Requiere autorización"); // No se proporcionó ningún token
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    // Verificar si el usuario tiene el rol de artista
    if (decoded.role !== 'artist') {
      return res.status(403).send("Acceso prohibido para artistas"); // Acceso prohibido para artistas
    }
    res.locals.artist = decoded; // Almacenar la información del artista en res.locals
    next();
  } catch (error) {
    return res.status(401).send("Token inválido"); // Token no válido
  }
};