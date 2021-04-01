export class Reccertificado{
  constructor(
    public id: number,
    public user_id: any,
    public tiporegistro_id: number,
    public user_post_id: number,

    public cert_act_academicas_y_asistenciales_nombre: string,
    public cert_act_academicas_y_asistenciales_cargo: string,
    public cert_act_academicas_y_asistenciales_tiempo: string,
    public cert_act_academicas_y_asistenciales_institucion: string,
    public cert_act_academicas_y_asistenciales_pdf: string,
    public cert_act_academicas_y_asistenciales_status_id: number,

    public trab_esp_y_art_cientificos_nombre: string,
    public trab_esp_y_art_cientificos_ano: string,
    public trab_esp_y_art_cientificos_revista: string,
    public trab_esp_y_art_cientificos_institucion: string,
    public trab_esp_y_art_cientificos_encalidad: string,
    public trab_esp_y_art_cientificos_pdf: string,
    public trab_esp_y_art_cientificos_status_id: number,

    public act_editor_revisor_pub_cient_nombre: string,
    public act_editor_revisor_pub_cient_ano: string,
    public act_editor_revisor_pub_cient_revista: string,
    public act_editor_revisor_pub_cient_pdf: string,
    public act_editor_revisor_pub_cient_status_id: number,

    public cert_asist_simposio_de_especialidad_nombre: string,
    public cert_asist_simposio_de_especialidad_modalidad: string,
    public cert_asist_simposio_de_especialidad_ano: string,
    public cert_asist_simposio_de_especialidad_institucion: string,
    public cert_asist_simposio_de_especialidad_horas: string,
    public cert_asist_simposio_de_especialidad_encalidade: string,
    public cert_asist_simposio_de_especialidad_pdf: string,
    public cert_asist_simposio_de_especialidad_status_id: number,

    public cert_asist_simposio_no_especialidad_nombre: string,
    public cert_asist_simposio_no_especialidad_modalidad: string,
    public cert_asist_simposio_no_especialidad_ano: string,
    public cert_asist_simposio_no_especialidad_institucion: string,
    public cert_asist_simposio_no_especialidad_horas: string,
    public cert_asist_simposio_no_especialidad_encalidade: string,
    public cert_asist_simposio_no_especialidad_pdf: string,
    public cert_asist_simposio_no_especialidad_status_id: number,
  ){}
}
