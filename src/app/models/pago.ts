export class Pago{
    constructor(
      public id: number,
      public user_id: number,
      public tiporegistro_id: number,
      public user_post_id: number,
      public transf_banco: string,
      public transf_fecha: string,
      public transf_numero: string,
      public transf_pdf: string,
      public transf_pdf_status_id: number
    ){}
  }
