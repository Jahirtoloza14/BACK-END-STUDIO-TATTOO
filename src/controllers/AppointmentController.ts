import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { dataSource} from "../database/data-source";
import { CreateAppointmentsRequestBody } from "../types/types";
import { Artist } from "../models/Artist";
import { User } from "../models/User";


export class AppointmentController {
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
            artist_name: appointment.artist.user.first_name,
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
            name: appointment.artist.user.first_name,
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
          .leftJoinAndSelect("user.artist", "artist")
          .where("user.id = :userId", { userId })
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
  }