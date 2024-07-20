import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { dataSource } from "../database/data-source";
import { Artist } from "../models/Artist";
import { getRepository } from "typeorm";

    // Show all appointments
    export const  getAllApointments= async (req:Request,res:Response) =>{
      try {
          const page = Number(req.query.page) || 1;
          const limit = Number(req.query.limit) || 10;

          const [jobdates,totalJobdates] = await Appointment.findAndCount(
              {
                  select:{
                    id:true,
                    title: true,
                    user_id: true,
                    artist_id: true,
                    start_time: true,
                    end_time: true,
                   location: true
                  }
              }
          );
          
          res.json(jobdates);

      }catch(error){
          res.status(500).json({message:"Something went wrong"});
      }
  };

  // update appointment
  export const updateAppointment = async (req:Request,res:Response) =>{
    try {
        const id = Number(req.params.id);
        const {user_id,title,artist_id,start_time,end_time,location} = req.body;
        const appointmentDate = await Appointment.findOne({where:{id:id}});
            
        if(!appointmentDate){
            res.status(404).json({message:"Jobdate not found"});
            return;
        }
        appointmentDate.id=id;
        appointmentDate.title = title;
        appointmentDate.user_id = user_id;
        appointmentDate.artist_id = artist_id;
        appointmentDate.start_time = start_time;
        appointmentDate.end_time = end_time;
        appointmentDate.location = location;

        await appointmentDate.save();
        res.json(appointmentDate);
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
};
// delete appointment
export const deleteAppointment= async (req:Request,res:Response)=>{
  try {
      const id = Number(req.tokenData.id);
      const appointmentDate = await Appointment.findOne({where:{id:id}});
      if(!appointmentDate){
          res.status(404).json({message:"Jobdate not found"});
          return;
      }
      await appointmentDate.remove();
      res.json({message:"Jobdate deleted"});
  }catch(error){
      res.status(500).json({message:"Something went wrong"});
  }
}


// create appointment
export const AppointmentController = {
  async createAppointment(req: Request, res: Response): Promise<void> {
    const appointmentRepository = dataSource.getRepository(Appointment);
    const {  title, user_id, artist_id, start_time, end_time, location } = req.body;

    try {
      const newAppointment = appointmentRepository.create({
        
        title,
        user_id,
        artist_id,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        location
      });

      await appointmentRepository.save(newAppointment);
      res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({
        message: "Error creating appointment",
        
      });
    }
  }
};

// get appointments by id artist 
export const getByLogedArtist = async (req: Request, res: Response) => {
  
    const artist= Number(req.tokenData.id);
    const providedArtistId = Number(req.params.id);
    if (artist !== providedArtistId) {
      return res.status(403).json({ error: 'Unauthorized:' });
    }
  
    const jobdates = await Appointment.find({
   
      relations:{
       
          artists:true,
         users:true,
      },
      select:{
          id:true,
          artist_id:true,
          start_time:true,
          end_time:true,
          title:true,
          artists:{
                  id:true,
                  first_name:true,
                  last_name:true,
                                            
          },
          users:{
              id:true,
              first_name:true,
              last_name:true,

          }
          },
         where:{
          artist_id: artist
         }
      });
      
      res.json(jobdates).status(200);

  }
