export interface CreateUserRequestBody {
    first_name: string;
    last_name: string;
    email: string;
    role_name:string;
    password: string;
  }
  export interface CreateAppointmentsRequestBody {
    user_id: number;
    artist_id: number;
    date: Date;
    time: string;
  }
  export interface LoginUserRequestBody {
    email: string;
    password: string;
  }
  export interface TokenData {
    user_id: number,
    role: string
  }
  export interface CreateArtistRequestBody {
    user_id: number;
    portfolio: string;
  }