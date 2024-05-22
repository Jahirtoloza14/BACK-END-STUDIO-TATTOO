import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

import {
  CreateUserRequestBody,
  TokenData,
} from "../types/types";
import { dataSource } from "../database/data-source";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";





export const UserControler = {



  // registrar usuario
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password, role_name } = req.body;
    try {
      // Crear nuevo usuario
      const newUser = userRepository.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role_name: role_name
      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "Usuario creado con éxito",
      });
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      res.status(500).json({
        message: "Error al registrarse",
        error: error.message,
      });
    }
  },


  // login usuario
  async login(req: Request, res: Response): Promise<void> {

    
    try {
       const { email, password } = req.body;
      // Validar existencia de email y contraseña
      if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Se requiere correo electrónico o contraseña",
        });
        return;
      }
      // Encontrar un usuario por email
      const user = await User.findOne({
        relations: {
          role: true,
        }, where: {
          email: email,
        },
        select: {
          id: true, email: true, password: true
        },
      });

      // Verificar usuario inexistente
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Correo electrónico o contraseña incorrectos",
        });
        return;
      }

      // Verificar contraseña si el usuario existe
      const ispasswordValid = bcrypt.compareSync(password, user.password);

      // Verificar contraseña valida
      if (!ispasswordValid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Correo electrónico o contraseña incorrectos",
        });
        return;
      }

        //generar user Role Name
      const roleName = user.role.role_name;
      const tokenPayload: TokenData ={
        user_id:user.id,
        role_name: roleName
      }

      // generar token 
      const token =jwt.sign(tokenPayload,process.env.JWT_SECRET as  string,{
          expiresIn: '150h'
      }

      
      );
      

      res.status(200).json({
        message: "Login",
        token,
      });


    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error al iniciar sesión",
        error: (error as any).message,
      });
    }
  },









  // mostrar todos los usuarios
  async getAll(req: Request, res: Response): Promise<void> {
    try{
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
  
      const [users, totalUsers] = await User.findAndCount({
        
        relations: {
          role: true,
        }, 
        select :{
          role: {
            role_name: true,
          },
          
        },
        skip: (page- 1) * limit,
        take: limit,
      });
  
   if ( totalUsers === 0) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "No autorizado" });
    return;
   }
   const totalPages= Math.ceil(totalUsers / limit);
   res.status(StatusCodes.OK).json({ users, totalPages });
  }catch (error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve users",
    });
  }
}  
   ,
  


  //mostrar usuarios por id
 /* async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = +req.params.id;
    
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: id,
        
      });

      if (!user) {
     res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  },
*/
 /* async getProfileById(req:Request,res:Response){
    try {
        const userId = Number(req.params.id);
        console.log(userId);
        
        const user = await User.findOne({
           relations: {
              role: true,
           },
           where: { id: userId },
        });

       

        if (!user) {
           res.status(404).json({ message: "User not found" });
           return;
        }

        res.json(user);
     } catch (error) {
        
        res.status(500).json({
           message: "Failed to retrieve user",
        });
     }
},*/

async getLogedUser(req:Request,res:Response){
  try {
    const userId = req.tokenData?.user_id;
    console.log(userId);
    const user = await User.findOne({
        relations:{
            role:true
        },
        where:{
            id:userId
        }
    });
    res.json(user).status(200).json({message:"User found successfully"});

}catch(error){
    res.status(500).json({message:"Something went wrong"});
}
},

async updateLogedUser(req:Request,res:Response){
  try {
      const userId = req.tokenData?.user_id;
      const {first_name,last_name,email} = req.body;
      const user = await User.findOne({where:{id:userId}});

      if(!user){
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      
      

      await user.save();
      res.status(StatusCodes.OK).json(user);
      return;
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    return;
  }
}

}