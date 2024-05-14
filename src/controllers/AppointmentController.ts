import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
export const createAppointments = async (req: Request, res: Response) => {
    try {
        const title = req.body.title;
        const user_id = req.body.user_id;
        const artist_id = req.body.artist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;
        const location = req.body.location;
        
    
        const newTattoo = await Appointment.create({
          title: title,
          user_id: user_id,
          artist_id: artist_id,
          start_time: start_time,
          end_time: end_time,
          location: location,
          
        }).save();
    
        return res.json({
          success: true,
          message: "appointment created succesfully",
          data: newTattoo,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "appointment can't be created",
          error: error,
        });
      }
    };