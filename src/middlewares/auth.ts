import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenData } from "../types/types";
//import * as jwt from 'jsonwebtoken';

// -----------------------------------------------------------------------------

export const auth = (req:Request,res:Response,next:NextFunction) => {
  
   
  const token = req.headers.authorization?.split(" ")[1];
  

  if(!token){
      res.status(401).json({message: "Unauthorized"});
      return;
  }

  try{
  
      const decoded = jwt.verify(
          token, 
          process.env.JWT_SECRET as string
          ) as JwtPayload
   
      req.tokenData = {
          user_id: decoded.user_id,
          role_name: decoded.role_name,
          }
      

      //call the next middleware
      next();
      
  }catch(error){
      res.status(401).json({message: "Unauthorized"});
      
      return;
  }
  
}