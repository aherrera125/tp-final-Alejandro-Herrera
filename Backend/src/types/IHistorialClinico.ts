export interface IHistorialClinico {
  id?: string;
  id_mascota: string;
  fecha_registro?: string;
  descripcion: string;
  status: boolean;
  id_user: string;
}

export interface IHistorialClinicoDTO {
  id?: string;
  mascotaId?: string;
  nombre_duenio: string;
  apellido_duenio: string;
  telefono: string;
  direccion: string;
  mascota: string;
  raza: string;
  edad: number;
  historial: string;
}
