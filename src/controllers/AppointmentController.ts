import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

import { User } from "../models/User";
import { dataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { Artist } from "../models/Artist";
import {CreateAppointmentsRequestBody} from "../types/types"
import { create } from "domain";
import { getRepository, getConnection } from "typeorm";


export const AppointmentControler = {
  async create (req: Request, res: Response) : Promise<void> {
    const { title, description, start_time, end_time, location, user_id, artist_id } = req.body;
    
    try {
        const newAppointment = await Appointment.create({
          title:title,
            description:description,
            start_time:start_time,
            end_time:end_time,
            location:location,
            user_id: user_id ,
            artist_id: artist_id 
        }).save();
        res.status(201).json(newAppointment);
    } catch (error:any) {
        console.error('Error al crear cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
     
    }
},

  async updateAppointment(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const appointmentRepository = dataSource.getRepository(Appointment);
      await appointmentRepository.update({ id: id }, data);

      res.status(202).json({
        message: "Appointment updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating appointment",
      });
    }
  },




/*async createAppointment (req: Request, res: Response) : Promise<void > {
  const appointmentRepository = dataSource.getRepository(Appointment);
  const { title, description, start_time, end_time, user_id, artist_id, location } = req.body;
  try {
  
  
    const newAppointment = appointmentRepository.create({

    title : title,
    description: description,
    start_time:start_time,
    end_time:end_time,
    location: location,
    user_id : user_id,
    artist_id : artist_id,
    
   
    
    
  });
    await appointmentRepository.save(newAppointment);
    res.status(StatusCodes.CREATED).json({
      message: "Usuario creado con éxito",
    });
  } catch (error) {
    console.error("Error al registrarse:", error);
    res.status(500).json({
      message: "Error al registrarse",
      
    });
  }
},*/

// Obtener todas las citas
 async  getAppointments  (req: Request, res: Response) : Promise<void>{
  try{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const [users, totalUsers] = await User.findAndCount({
      where: {
        role: {
          role_name: 'admin'
        }
      },
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
  },




 

}
export default   AppointmentControler ;



 






// Crear una nueva cita

// Obtener una cita por su ID
/*export const getAppointmentById = async (req: Request, res: Response) => {
    const  id  = req.params;
    const appointmentRepository = dataSource.getRepository(Appointment);
    try {
        const appointment = await appointmentRepository.findOne(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.json(appointment);
    } catch (error) {
        console.error('Error al obtener cita por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
*/
// Actualizar una cita existente
/*export const updateAppointment = async (req: Request, res: Response) => {
    const  id  = req.params;
    const { title, description, start_time, end_time, location, user_id, artist_id, name } = req.body;
    const appointmentRepository = dataSource.getRepository(Appointment);
    try {
        const appointment = await appointmentRepository.findOne(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        appointment.title = title || appointment.title;
        appointment.description = description || appointment.description;
        appointment.start_time = start_time || appointment.start_time;
        appointment.end_time = end_time || appointment.end_time;
        appointment.location = location || appointment.location;
        appointment.user = { id: user_id } || appointment.user;
        appointment.artist = { id: artist_id } || appointment.artist;
        await appointmentRepository.save(appointment);
        res.json(appointment);
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};*/

// Eliminar una cita existente
/* export const deleteAppointment = async (req: Request, res: Response) => {
    const id  = req.params;
    const appointmentRepository = dataSource.getRepository(Appointment);
    try {
        const appointment = await appointmentRepository.findOne(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        await appointmentRepository.remove(appointment);
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
*/









/*export class AppointmentController {
    async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
        const appointmentRepository = dataSource.getRepository(Appointment);
  
        const page = req.query.page ? Number(req.query.page) : null;
        const limit = req.query.limit ? Number(req.query.limit) : null;
  
        interface filter {
          [key: string]: any;
        }
        const filter: any = {
          select: {
            date: true,
            time: true,
            user_id: true,
            artist_id: true,
            id: true,
          },
          relations: ["artist", "artist.user", "user"],
        };
  
        if (page && limit) {
          filter.skip = (page - 1) * limit;
        }
        if (limit) {
          filter.take = limit;
        }
  
        const [allAppointments, count] = await appointmentRepository.findAndCount(
          filter
        );
  
        const appointmentsWithArtistNames = allAppointments.map(appointment => ({
            ...appointment,
            artist_name: appointment.artist.id,
            user_name: appointment.user.first_name,
            user_last_name: appointment.user.last_name,
          }));
  
        res.status(200).json({
          count,
          limit,
          page,
          results: appointmentsWithArtistNames,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error al obtener usuarios",
        });
      }
    }
  
    async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
        const id = +req.params.id;
        const appointmentRepository =dataSource.getRepository(Appointment);
        const myAppointments = await appointmentRepository.find({
          where: { user_id: id },
          relations: ["artist", "artist.user"],
          select: ["id", "date", "time", "artist"],
        });
  
        const appointmentsWithArtistName = myAppointments.map((appointment) => ({
          id: appointment.id,
          date: appointment.date,
          time: appointment.time,
          artist: {
            id: appointment.artist.id,
            name: appointment.artist.id,
          },
        }));
  
        res.status(200).json(appointmentsWithArtistName);
      } catch (error) {
        res.status(500).json({
          message: "Error al conseguir citas",
        });
      }
    }
  
    async getByArtist(
      req: Request,
      res: Response
    ): Promise<void | Response<any>> {
      try {
        const userId = +req.params.id;
        const userRepository = dataSource.getRepository(User);
  
        const user = await userRepository
          .createQueryBuilder("user")
          .leftJoinAndSelect("id.artist", "artist")
          .where("id = :id", { id })
          .getOne();
  
        if (!user || !user.artist) {
          return res
            .status(404)
            .json({ message: "Usuario o artista asociado no encontrado" });
        }
  
        const artistId = user.artist.id;
  
        const appointmentRepository = dataSource.getRepository(Appointment);
        const myAppointments = await appointmentRepository.find({
          where: { artist_id: artistId },
          relations: ["user"],
          select: ["id", "date", "time", "artist_id"],
        });
  
        const appointmentsWithUserName = myAppointments.map((appointment) => ({
          id: appointment.id,
          date: appointment.date,
          time: appointment.time,
          artist_id: appointment.artist_id,
          user: {
            id: appointment.user.id,
            name: appointment.user.first_name,
            last_name: appointment.user.last_name,
           
          },
        }));
  
        res.status(200).json(appointmentsWithUserName);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error al conseguir citas",
        });
      }
    }
  
    async create(
      req: Request<{}, {}, CreateAppointmentsRequestBody>,
      res: Response
    ): Promise<void | Response<any>> {
      try {
        const data = req.body;
        const appointmentRepository = dataSource.getRepository(Appointment);
  
        const artistRepository = dataSource.getRepository(Artist);
        const artist = await artistRepository.findOne({
          where: { id: data.artist_id },
        });
        if (!artist) {
          return res
            .status(400)
            .json({ message: "El artista especificado no existe." });
        }
  
        const newAppointment = await appointmentRepository.save(data);
        res.status(201).json({
          message: "Cita creada exitosamente",
          appointment: newAppointment,
        });
      } catch (error: any) {
        console.error("Error al crear la cita:", error);
        res.status(500).json({
          message: "Error al crear la cita",
          error: error.message,
        });
      }
    }
  
    async updateAppointment(
      req: Request,
      res: Response
    ): Promise<void | Response<any>> {
      try {
        const id = +req.params.id;
        const data = req.body;
  
        const appointmentRepository = dataSource.getRepository(Appointment);
        await appointmentRepository.update({ id: id }, data);
  
        res.status(202).json({
          message: "Cita actualizada exitosamente",
        });
      } catch (error) {
        res.status(500).json({
          message: "Cita actualizada exitosamente",
        });
      }
    }
  
    async deleteAppointment(
      req: Request,
      res: Response
    ): Promise<void | Response<any>> {
      try {
        const id = +req.params.id;
  
        const appointmentRepository = dataSource.getRepository(Appointment);
        await appointmentRepository.delete(id);
  
        res.status(200).json({
          message: "Cita eliminada exitosamente",
        });
      } catch (error) {
        res.status(500).json({
          message: "Error al eliminar la cita",
        });
      }
    }
  }*/