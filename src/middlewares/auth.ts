import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenData } from "../types/types";
//import * as jwt from 'jsonwebtoken';

// -----------------------------------------------------------------------------

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.json(
        {
          message: 'AUTH_REQUIRED'
        }
      )
    }

    const token = req.headers.authorization.split(' ')[1];
   
    
    if (!token) {
      return res.json(
        {
          message: 'AUTH_REQUIRED'
        }
      )
    }

    const tokenDecoded = jwt.verify(token, "123") as JwtPayload 
    
    const decodedPayload: TokenData = {
      first_name:tokenDecoded.first_name,
      last_name: tokenDecoded.last_name,
      user_id: tokenDecoded.user_id,
      role: tokenDecoded.role,

   };

   req.tokenData = decodedPayload;
   
  
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};




/*export const admin =(req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization?.split(" ")[1];   //<string>req.headers['auth'];
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    return res.status(401).send({message:"No authorized"});
  }

const {userId, email}= jwtPayload;
const newToken= jwt.sign({userId, email}, config.jwtSecret, {expiresIn: '1h'})
res.header( 'token', newToken);
next();
}; */









// Middleware para verificar el token de usuario
/*export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Requiere autorización"); // No se proporcionó ningún token
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    res.locals.user = decoded; // Almacenar la información del usuario en res.locals
    next();
  } catch (error) {
    return res.status(401).send("Token inválido"); // Token no válido
  }
}; */







/*export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization?.split(' ')[1];

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verificar el token
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Si el token es válido, puedes almacenar la información del usuario en res.locals para usarla en rutas posteriores si es necesario
    res.locals.user = decoded;
    next();
  });
};*/