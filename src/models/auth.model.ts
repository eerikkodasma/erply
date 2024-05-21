export interface AuthState {
    email: string | null;
    token: string | null;
    isAuthenticated: boolean;
  }
  
  export interface LoginPayload {
    email: string;
    token: string;
  }
  