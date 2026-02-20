export interface IMascota {
  id?: string;
  id_duenio: string;
  nombre: string;
  especie: string;
  fecha_nacimiento?: Date;
  estado: boolean; // 1 para activo, 0 para inactivo
}
