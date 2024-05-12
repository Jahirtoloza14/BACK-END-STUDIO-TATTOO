import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, {JwtPayload} from "jsonwebtoken";
import { TokenData } from "../types/types";
//import * as jwt from 'jsonwebtoken';
import config from "../config/config";
// -----------------------------------------------------------------------------

import { UserRoles } from "../constants/UserRoles";

/*
export  const tokenAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("")[1]

  if(!token){
    res.status(401).json({
      message: "Unauthorized access"
    });
    return;
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string) as JwtPayload
    console.log(decoded);
    
    req.tokenData = {
      user_id: decoded.user_id,
      role: decoded.role_name
    }
  next(); 
 } catch (error){
  res.status(401).json({
    message: "Invalid token provied"
  })
 }
};
*/


const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
 
    console.log(req.tokenData.role); 
     

 
  

    if (req.tokenData.role !=="admin") {
      
      
        return  res.json({
            success: true,
            message: "You don't have permission to perform this action"
            
            
        })
    }
  
  
    
  
  
  
  
    
    next()

}; 


export { isSuperAdmin }





/*export const auth = (req: Request, res: Response, next: NextFunction) => {
  req.headers;

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Requiere autorización",
    });
  }

  try {
    const decoded = jwt.verify(token, "123") as jwtPayload;

    console.log(decoded);

    const decodedPayload: TokenData = {
      userId: decoded.userId,
      userRoles: decoded.userRoles,
    };

    req.TokenData = decodedPayload;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "NO AUTORIZADO",
    });
  }
};*/




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
};
*/


