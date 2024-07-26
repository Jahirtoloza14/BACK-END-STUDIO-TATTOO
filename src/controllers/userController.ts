import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import { TokenData } from "../types/types";
import { dataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { UserRoles } from "../constants/UserRoles";




export const UserControler = {

  // registrar usuario como rol Cliente
  async register(req: Request, res: Response): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
      // Crear nuevo usuario
      const newUser = userRepository.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.CLIENT



      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "Usuario creado con éxito",
      });
      return
    } catch (error: any) {

      res.status(500).json({
        message: "Error al registrarse",
        error: error.message,
      }); return
    }
  },
  // registrar usuario como rol artista
  async registerArtist(req: Request, res: Response): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
      // Crear nuevo usuario
      const newUser = userRepository.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.ARTIST



      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "Usuario creado con éxito",
      });
      return
    } catch (error: any) {

      res.status(500).json({
        message: "Error al registrarse",
        error: error.message,
      }); return
    }
  },



  // registrar usuario como rol Admin
  async registerAdmin(req: Request, res: Response): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
      // Crear nuevo usuario
      const newUser = userRepository.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.ADMIN




      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "Usuario creado con éxito",
      });
      return
    } catch (error: any) {

      res.status(500).json({
        message: "Error al registrarse",
        error: error.message,
      }); return
    }
  },


  // login usuario
  async login(req: Request, res: Response): Promise<void> {

    try {
      const { email, password } = req.body;
      // Validar existencia de email y contraseña
      if (!email || !password) {
        res.status(400).json({
          message: "Se requiere correo electrónico o contraseña",
        });
        return;
      }
      // Encontrar un usuario por email
      const user = await User.findOne({
        relations: { role: true },
        where: {
          email: email,
        },
        select: {
          id: true, email: true, password: true,


        },

      });

      // Verificar usuario inexistente
      if (!user) {
        res.status(400).json({
          message: "Correo electrónico o contraseña incorrectos",
        });
        return;
      }

      // Verificar contraseña si el usuario existe
      const ispasswordValid = bcrypt.compareSync(password, user.password);

      // Verificar contraseña valida
      if (!ispasswordValid) {
        res.status(500).json({
          message: "Correo electrónico o contraseña incorrectos",
        });
        return;
      }


      //generar user Role Name
      const roleName = user.role.name;
      const tokenPayload: TokenData = {
        id: user.id,
        role: roleName,
      };

      // generar token 
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
        expiresIn: '150h'
      }


      );


      res.status(StatusCodes.OK).json({
        message: "Login exitoso",
        token,
      });
      return;

    } catch (error) {
      res.status(400).json({
        message: "Error al iniciar sesión",
        error: (error as any).message,



      }); return
    }
  },

  // mostrar todos los usuarios
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const [users, totalUsers] = await User.findAndCount(
        
        {
          relations:{
            role:true
            
            }
       

        }
      );
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  ,

  // Mostrar usuario logeado
  async getLogedUser(req: Request, res: Response) {
    try {
      const userId = req.tokenData?.id;
      console.log(userId);
      const user = await User.findOne({
        relations:{
          role:true
          
          },
        where: {
          id: userId,
        }
      });
      res.json(user).status(200).json({ message: "User found successfully" });
      return
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
    return
  },

  // actualizar usuario
  async updateLogedUser(req: Request, res: Response) {
    try {
      const userId = req.tokenData?.id;
      const { first_name, last_name, email } = req.body;
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
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