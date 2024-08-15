import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";




// mostrar todas las citas 
export const getAllApointments = async (req: Request, res: Response) => {
  try {

    const [appointments] = await Appointment.findAndCount(
      {
        select: {
          id: true,
          title: true,
          user_id: true,
          artist_id: true,
          start_time: true,
          end_time: true,
          location: true
        }
      }
    );

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// actualizar cita
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { user_id, title, artist_id, start_time, end_time, location } = req.body;
    const appointmentDate = await Appointment.findOne({ where: { id: id } });

    if (!appointmentDate) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }
    appointmentDate.id = id;
    appointmentDate.title = title;
    appointmentDate.user_id = user_id;
    appointmentDate.artist_id = artist_id;
    appointmentDate.start_time = start_time;
    appointmentDate.end_time = end_time;
    appointmentDate.location = location;

    await appointmentDate.save();
    res.json(appointmentDate);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// eliminar cita
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.tokenData.id);
    const appointmentDate = await Appointment.findOne({ where: { id: id } });
    if (!appointmentDate) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }
    await appointmentDate.remove();
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}


// crear cita
export const AppointmentController = {
  async createAppointment(req: Request, res: Response): Promise<void> {



    try {
      const { title, user_id, artist_id, start_time, end_time, location } = req.body;
      const newAppointment = Appointment.create({

        title,
        user_id,
        artist_id,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        location
      });

      await Appointment.save(newAppointment);
      res.status(201).json({
        message: "Cita creada exitosamente",
        appointment: newAppointment
      });
    } catch (error) {
      console.error('Error al crear la cita:', error);
      res.status(500).json({
        message: "Erro al crear la cita",

      });
    }
  }
};

// Mostrar cita por artista logeado 
export const getByLogedArtist = async (req: Request, res: Response) => {

  const artist = Number(req.tokenData.id);
  const providedArtistId = Number(req.params.id);
  if (artist !== providedArtistId) {
    return res.status(403).json({ error: 'No Autorizado:' });
  }

  const appointments = await Appointment.find({

    relations: {

      artists: true,
      users: true,
    },
    select: {
      id: true,
      artist_id: true,
      start_time: true,
      end_time: true,
      title: true,
      location: true,
      artists: {
        id: true,
        user: {
          first_name: true,
          last_name: true,
        }
      },

    },
    where: {
      artist_id: artist
    }
  });

  res.json(appointments).status(200);

}
export const getByLogedClient = async (req: Request, res: Response) => {

  const client = Number(req.tokenData.id);


  const appointments = await Appointment.find({

    relations: {
      artists: true,
      users: true,
    },
    select: {
      id: true,
      title: true,
      artist_id: true,
      start_time: true,
      end_time: true,
      location: true

    },


    where: {
      user_id: client
    }
  });

  res.json(appointments).status(200);

}
