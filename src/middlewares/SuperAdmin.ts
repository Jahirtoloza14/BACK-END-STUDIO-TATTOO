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
     
  

    if (req.tokenData.role_name !=="admin") {
      
      
        return  res.json({
            success: true,
            message: "You don't have permission to perform this action"
            
            
        })
      }
  
  
    
    next()

}; 
export const authorizeMiddleware=(allowedRoles:string[])=>{

  return (req:Request,res:Response,next:NextFunction)=>{
      const userRole = req.tokenData.role_name;

      if(userRole === UserRoles.ADMIN.role_name){
          return next();
      }
      if(userRole === UserRoles.CLIENT.role_name){
        return next();
    }
      if(userRole === UserRoles.ARTIST.role_name){
      return next();
    }
      else{
                res.status(401).json({message:"Unauthorized"})

         
        
      }
  }
}


export { isSuperAdmin }




