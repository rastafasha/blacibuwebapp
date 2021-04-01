export class User {
  map: any;
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: string,
    public tiporegistro_id: number,
    public user_post_id: number,
    public idioma: string,
    public pais: string,
    public name: string,
    public surname: string,
    public status_id: number,
    public pasaporte: string,
    public fecha_nac: string,
    public edad: string,
    public lugar_nac: string,
    public nacionalidad: string,
    public telefono: string,
    public direccion: string,
    public cod_postal: string,
    public pais_ejerce: string,
    public red_social: string,
    public user_red: string,
    public image: string
  ){}
}

export interface TipoRegistro {
  id: number;
  nombre: string;
}
