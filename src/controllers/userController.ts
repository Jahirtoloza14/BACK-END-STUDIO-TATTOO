import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

import {
  CreateUserRequestBody,
  LoginUserRequestBody,
  TokenData,
} from "../types/types";
import { dataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { Artist } from "../models/Artist";
import { SaveOptions, RemoveOptions } from "typeorm";

import { userRepository } from "../data-access/repositories";
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import config from '../config/config'
import { Role } from "../models/Role";





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
        });;
      }


      const roleName = user.role.role_name;
      
      // generar token 
      const token =jwt.sign({
        email: user.email,
        userId: user.id,
        role: roleName,
      },
           process.env.JWT_SECRET,
        {
          expiresIn: '150h'
        }
      );

      res.status(200).json({
        message: "Login",
        token,
      });


    } catch (error) {
      res.status(500).json({
        message: "Error al iniciar sesión",
        error: (error as any).message
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
     res.status(404).json({ message: "no autrizado"});
     return;
   }
   const totalPages= Math.ceil(totalUsers / limit);
   res.status(200).json(users);
  }catch (error){
    res.status(500).json({
      message: "Failed to retrieve users",
    })
  }
}  
   ,
  


  //mostrar usuarios por id
  async getById(req: Request, res: Response): Promise<void> {
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

  async getProfileById(req:Request,res:Response){
    try {
        const userId = Number(req.params.id);

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
},

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
          res.status(404).json({message:"User not found"});
          return;
      }

      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      
      

      await user.save();
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({message:"Something went wrong"});
  }
},
  //actualizar datos de usuario

  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const userRepository = dataSource.getRepository(User);
      await userRepository.update({ id: id }, data);

      res.status(202).json({
        message: "Usuario actualizado con éxito",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar usuario",
      });
    }
  },
  // mostrar todos los artitas 
  async allArtists(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const artistRepository = dataSource.getRepository(Artist);

      const allArtists = await artistRepository.find({
        relations: ["user"],
      });

      const artistsWithDetails = allArtists.map((artist) => ({
        id: artist.id,
        first_name: artist.id,
      }));

      res.status(200).json(artistsWithDetails);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener artistas",
      });
    }
  },
  /*async createArtist(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
      // Crear nuevo usuario
      const dataUser: User = {
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.ARTIST,
        appointments: [],
        id: 0,
        hasId: function (): boolean {
          throw new Error("Function not implemented.");
        },
        save: function (options?: SaveOptions | undefined): Promise<User> {
          throw new Error("Function not implemented.");
        },
        remove: function (options?: RemoveOptions | undefined): Promise<User> {
          throw new Error("Function not implemented.");
        },
        softRemove: function (options?: SaveOptions | undefined): Promise<User> {
          throw new Error("Function not implemented.");
        },
        recover: function (options?: SaveOptions | undefined): Promise<User> {
          throw new Error("Function not implemented.");
        },
        reload: function (): Promise<void> {
          throw new Error("Function not implemented.");
        }
      };
      const newUser = await userRepository.save(dataUser);
  
      const artistRepository = dataSource.getRepository(Artist);
      const newArtist = await artistRepository.save({
        user: newUser,
        portfolio: "https://",
      });
      res.status(201).json(newArtist);
    } catch (error: any) {
      console.error("Error al crear artista:", error);
      res.status(500).json({
        message: "Error al crear artista",
        error: error.message,
      });
    }
  },*/

  /**  eliminar usuario
  async deleteUser(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
  
      const userRepository = dataSource.getRepository(User);
      await userRepository.delete({ id: id });
  
      res.status(200).json({
        message: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar usuario",
      });
    }
  },
  
  
  */




  async newUser(req: Request, res: Response): Promise<void | Response<any>> {
    const { first_name, last_name, password, email } = req.body;
    const user = new User();

    user.first_name = first_name;
    user.last_name = last_name;
    user.password = password;
    user.email = email;

  },
  async editUser(req: Request, res: Response): Promise<void | Response<any>> {
    let user;
    const id = parseInt(req.params.id, 10);
    const { first_name, last_name, role, email } = req.body;
    const userRepository = dataSource.getRepository(User)
    try {
      user = await userRepository.findOneOrFail({ where: { id: id } });
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.role = role;
    }
    catch (e) {
      return res.status(404).json({ message: 'User not found' })
    }

    const errors = await validate(user)
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    // try to save user

    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Username already in use' })
    } res.status(201).json({ meage: 'User update' })
  },

  async delete(req: Request, res: Response): Promise<void | Response<any>> {
    const id = req.params;
    const userRepository = dataSource.getRepository(User)
    let user: User;
    try {
      user = await userRepository.findOneByOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: ' User not found' })
    }

    // Remove user

    userRepository.delete(id);
    res.status(201).json({ message: ' User deleted' })

  },

  async createArtist(req: Request, res: Response): Promise<void | Response<any>> {
    const artistRepository = dataSource.getRepository(Artist);
    const { name, } = req.body;

    try {
      // Crear una nueva instancia de Artist con los datos proporcionados
      const newArtist = artistRepository.create({
        name,


      });

      // Guardar el nuevo artista en la base de datos
      await artistRepository.save(newArtist);

      // Responder con el nuevo artista creado
      res.status(201).json(newArtist);
    } catch (error) {
      console.error('Error al crear el artista:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }







}







// admin

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminRole = await Role.findOne({ where: { role_name: 'admin' } });

    if (!adminRole) {
      throw new Error('El rol de administrador no existe en la base de datos');
    }

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.role_name = 'admin'; // Aquí asignamos el rol de administrador
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret);
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }


};
export const createArtist = async (req: Request, res: Response) => {
  const artistRepository = dataSource.getRepository(Artist);
  const { name, } = req.body;

  try {
    // Crear una nueva instancia de Artist con los datos proporcionados
    const newArtist = artistRepository.create({
      name,



    });

    // Guardar el nuevo artista en la base de datos
    await artistRepository.save(newArtist);

    // Responder con el nuevo artista creado
    res.status(201).json(newArtist);
  } catch (error) {
    console.error('Error al crear el artista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const editUser = async (req: Request, res: Response): Promise<void> => {
  const userRepository = dataSource.getRepository(User);
  const id = req.params;


  try {
    const user = await userRepository.findOneOrFail(id);
    userRepository.merge(user, req.body);
    const updatedUser = await userRepository.save(user);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error editing user:', error);
    res.status(404).json({ message: 'User not found' });
  }




};










export default UserControler;
