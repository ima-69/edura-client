export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile?: string;
  role: UserRole;
  nic?: string;
  student_status?: boolean;
  teacher_status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  nic: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  data: {
    student?: User;
    teacher?: User;
    admin?: User;
  };
}


