export interface IUsuario {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  nombre: string;
  apellido: string;
  especialidad: string;
  matricula: string;
  status?: boolean;
  role?: "user" | "admin";
}
