export interface CreateUserRequestBody {
    first_name: string;
    last_name: string;
    email: string;
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
    userId: string;
    userRoles: string;
  }
  export interface CreateArtistRequestBody {
    user_id: string;
    portfolio: string;
  }