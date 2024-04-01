import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";
import {
  CreateUserRequestBody,
  LoginUserRequestBody,
  TokenData,
} from "../types/types";
import { dataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { Artist } from "../models/Artist";





export const UserControler = {



// registrar usuario
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
      // Crear nuevo usuario
      const newUser = userRepository.create({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.CLIENT,
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
  async login(
    req: Request<{}, {}, LoginUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const userRepository = dataSource.getRepository(User);
    const { email, password } = req.body;
    try {
      // Validar existencia de email y contraseña
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Se requiere correo electrónico o contraseña",
        });
      }

      // Encontrar un usuario por email
      const user = await userRepository.findOne({
        where: {
          email: email,
        },
        relations: {
          role: true,
        },
        select: {
          role: {
            role_name: true,
          },
        },
      });

      // Verificar usuario inexistente
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Correo electrónico o contraseña incorrectos",
        });
      }

      // Verificar contraseña si el usuario existe
      const ispasswordValid = bcrypt.compareSync(password, user.password);

      // Verificar contraseña valida
      if (!ispasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Correo electrónico o contraseña incorrectos",
        });
      }
    
    // Verificar contraseña si el usuario existe
    const PasswordValid = bcrypt.compareSync(password, user.password);

    // Verificar contraseña valida
    if (!PasswordValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Correo electrónico o contraseña incorrectos",
      });
    }

    // Generar token
    const userRole = user.role.role_name;

    const tokenPayload: TokenData = {
      userId: user.id?.toString() as string,
      userRoles: userRole as string,
    };

    const token = jwt.sign(tokenPayload, "123", {
      expiresIn: "1h",
    });

    res.status(StatusCodes.OK).json({
      message: "Iniciar sesión exitosamente",
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error al iniciar sesión",
      error,
    });
  }
},









// mostrar todos los usuarios
    async getAll(req: Request, res:Response): Promise<void>
{
    const users= await User.find();
    res.json(users);
},


//mostrar usuarios por id
  async getById(req: Request, res:Response): Promise<void>{
    const userId = Number(req.params.id);

    const user = await User.findOne({where: { id: userId}});
    res.json(user);
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
      first_name: artist.user.first_name,
    }));

    res.status(200).json(artistsWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener artistas",
    });
  }
},
// eliminar usuario
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
}

}