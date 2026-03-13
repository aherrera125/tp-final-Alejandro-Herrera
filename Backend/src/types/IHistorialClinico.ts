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
  mascotaNombre: string;
  mascotaEdad: number;
  mascotaEspecie: string;
  duenioNombre: string;
  duenioApellido: string;
  telefono: string;
  direccion: string;
  descripcion: string;
}
