export interface User {
  email: string;
  password: string;
  confirm_password: string;
  role: string; // Si "role" tiene un conjunto fijo de valores, puedes usar un tipo literal
}

export interface ApiResponse {
  code: number
  data: any
  message: string
}

export interface ApplicantProfile {
  user_id: number;
  first_name: string;
  last_name_father: string;
  last_name_mother: string;
  age: number;
  date_of_birth: string; // También puedes usar Date si prefieres trabajar con objetos Date
}


export interface UserSession {
  activation_token: string | null; // Puede ser un string o null
  created_at: string; // Fecha en formato ISO
  email: string; // Correo electrónico
  expiration_token: string | null; // Puede ser un string o null
  id: number; // Identificador único
  role: string; // Rol del usuario
  status: boolean; // Estado activo/inactivo
  updated_at: string; // Fecha en formato ISO
}
