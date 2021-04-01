import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

import {User} from '../../../models/users';
import { UserService } from '../../../services/user.service';
import {Reccertificado} from '../../../models/rec-certificado';
import { ReccertificadoService} from '../../../services/rec-certificado.service';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-reccertificados',
  templateUrl: './form-reccertificados.component.html',
  styleUrls: ['./form-reccertificados.component.css'],
  providers: [UserService, ReccertificadoService, TranslateService]
})
export class FormReccertificadosComponent implements OnInit, DoCheck {

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })


  public users: User;
  public recertcertificados: Reccertificado;
  public status;
  public identity;
  public token;
  public url;
  public storage=environment.storage;

  public activeLang = '';
  flag = false;

  sub: any;
  user: any;
  recertcertificado:any;

  imagePath: string;

  public reccertificadoConfig = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'recertcertificado/upload',
      headers: {
        Authorization: this.userService.getToken(),
      },
      responseType: 'json',
    },
    theme: 'attachPin',
    selectFileBtn: 'Seleccionar Archivo',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText: 'Subir Archivo',
    afterUploadMsg_success: 'Se cargó correctamente el archivo',
    afterUploadMsg_error: 'Se produjo un error al subir el archivo',
  };

  constructor(
    private userService: UserService,
    private reccertificadoService: ReccertificadoService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder
    ) {
      this.loadUser();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();

      this.recertcertificado = new Reccertificado(1, this.identity.sub, this.identity.tiporegistro_id, 1,'', '', '', '', '', 1, '', '', '', '', '', '', 1, '', '', '', '', 1, '', '', '', '', '', '', '', 1, '', '', '', '', '', '', '', 1 );

    // rellenar objeto usuario
    this.recertcertificado = new Reccertificado(
      this.identity.id,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.cert_act_academicas_y_asistenciales_nombre,
      this.identity.cert_act_academicas_y_asistenciales_cargo,
      this.identity.cert_act_academicas_y_asistenciales_tiempo,
      this.identity.cert_act_academicas_y_asistenciales_institucion,
      this.identity.cert_act_academicas_y_asistenciales_pdf,
      this.identity.cert_act_academicas_y_asistenciales_status_id,
      this.identity.trab_esp_y_art_cientificos_nombre,
      this.identity.trab_esp_y_art_cientificos_ano,
      this.identity.trab_esp_y_art_cientificos_revista,
      this.identity.trab_esp_y_art_cientificos_institucion,
      this.identity.trab_esp_y_art_cientificos_encalidad,
      this.identity.trab_esp_y_art_cientificos_pdf,
      this.identity.trab_esp_y_art_cientificos_status_id,
      this.identity.act_editor_revisor_pub_cient_nombre,
      this.identity.act_editor_revisor_pub_cient_ano,
      this.identity.act_editor_revisor_pub_cient_revista,
      this.identity.act_editor_revisor_pub_cient_pdf,
      this.identity.act_editor_revisor_pub_cient_status_id,
      this.identity.cert_asist_simposio_de_especialidad_nombre,
      this.identity.cert_asist_simposio_de_especialidad_modalidad,
      this.identity.cert_asist_simposio_de_especialidad_ano,
      this.identity.cert_asist_simposio_de_especialidad_institucion,
      this.identity.cert_asist_simposio_de_especialidad_horas,
      this.identity.cert_asist_simposio_de_especialidad_encalidade,
      this.identity.cert_asist_simposio_de_especialidad_pdf,
      this.identity.cert_asist_simposio_de_especialidad_status_id,
      this.identity.cert_asist_simposio_no_especialidad_nombre,
      this.identity.cert_asist_simposio_no_especialidad_modalidad,
      this.identity.cert_asist_simposio_no_especialidad_ano,
      this.identity.cert_asist_simposio_no_especialidad_institucion,
      this.identity.cert_asist_simposio_no_especialidad_horas,
      this.identity.cert_asist_simposio_no_especialidad_encalidade,
      this.identity.cert_asist_simposio_no_especialidad_pdf,
      this.identity.cert_asist_simposio_no_especialidad_status_id,
    );



  }




  ngOnInit(): void {
    this.flag = true;
    this.loadUser();
    window.scrollTo(0, 0);
    //this.getRecerticiado();
    this.gettodoslosRecCertificados();

    this.getUserdetail(this.identity.sub);

    this.userService.getUser(this.identity.sub).subscribe(
      res => {
        this.recertificadoForm.patchValue({
          id: res.id,
          cert_act_academicas_y_asistenciales_nombre: res.user.recertcertificados[0].cert_act_academicas_y_asistenciales_nombre,
          cert_act_academicas_y_asistenciales_cargo: res.user.recertcertificados[0].cert_act_academicas_y_asistenciales_cargo,
          cert_act_academicas_y_asistenciales_tiempo: res.user.recertcertificados[0].cert_act_academicas_y_asistenciales_tiempo,
          cert_act_academicas_y_asistenciales_institucion: res.user.recertcertificados[0].cert_act_academicas_y_asistenciales_institucion,
          cert_act_academicas_y_asistenciales_pdf: res.user.recertcertificados[0].cert_act_academicas_y_asistenciales_pdf,
          trab_esp_y_art_cientificos_nombre: res.user.recertcertificados[0].trab_esp_y_art_cientificos_nombre,
          trab_esp_y_art_cientificos_ano: res.user.recertcertificados[0].trab_esp_y_art_cientificos_ano,
          trab_esp_y_art_cientificos_revista: res.user.recertcertificados[0].trab_esp_y_art_cientificos_revista,
          trab_esp_y_art_cientificos_institucion: res.user.recertcertificados[0].trab_esp_y_art_cientificos_institucion,
          trab_esp_y_art_cientificos_encalidad: res.user.recertcertificados[0].trab_esp_y_art_cientificos_encalidad,
          trab_esp_y_art_cientificos_pdf: res.user.recertcertificados[0].trab_esp_y_art_cientificos_pdf,
          act_editor_revisor_pub_cient_nombre: res.user.recertcertificados[0].act_editor_revisor_pub_cient_nombre,
          act_editor_revisor_pub_cient_ano: res.user.recertcertificados[0].act_editor_revisor_pub_cient_ano,
          act_editor_revisor_pub_cient_revista: res.user.recertcertificados[0].act_editor_revisor_pub_cient_revista,
          act_editor_revisor_pub_cient_pdf: res.user.recertcertificados[0].act_editor_revisor_pub_cient_pdf,
          cert_asist_simposio_de_especialidad_nombre: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_nombre,
          cert_asist_simposio_de_especialidad_modalidad: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_modalidad,
          cert_asist_simposio_de_especialidad_ano: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_ano,
          cert_asist_simposio_de_especialidad_institucion: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_institucion,
          cert_asist_simposio_de_especialidad_horas: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_horas,
          cert_asist_simposio_de_especialidad_encalidade: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_encalidade,
          cert_asist_simposio_de_especialidad_pdf: res.user.recertcertificados[0].cert_asist_simposio_de_especialidad_pdf,
          cert_asist_simposio_no_especialidad_nombre: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_nombre,
          cert_asist_simposio_no_especialidad_modalidad: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_modalidad,
          cert_asist_simposio_no_especialidad_ano: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_ano,
          cert_asist_simposio_no_especialidad_institucion: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_institucion,
          cert_asist_simposio_no_especialidad_horas: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_horas,
          cert_asist_simposio_no_especialidad_encalidade: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_encalidade,
          cert_asist_simposio_no_especialidad_pdf: res.user.recertcertificados[0].cert_asist_simposio_no_especialidad_pdf,
        });
      }
    );
    //this.getCertificadoUser();
  }

  // tslint:disable-next-line: typedef
  ngDoCheck(){
    this.loadUser();

  }

  // tslint:disable-next-line: typedef
  loadUser(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  gettodoslosRecCertificados(){
    this.reccertificadoService.getReCertificados().subscribe(
      response => {
        if (response.status === 'success'){
          this.recertcertificados = response.recertcertificados;
          //console.log(this.recertcertificados);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  getRecertificado(){
    // sacar el id del post del la url
    this.route.params.subscribe(params => {
      const id = +params.id;

      // peticion ajax para sacar los datos del post
      this.reccertificadoService.getReCertificado(id).subscribe(
        response => {
          if (response.status === 'success'){
            this.recertcertificado = response.recertcertificado;
            console.log(this.recertcertificado);
          }else{
            //this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          //this.router.navigate(['/inicio']);
        }
      );

    });
  }


  getUserdetail(sub:number){
    this.userService.getUser(this.identity.sub).subscribe(
      response => {
        if (response.status === 'success'){
          this.user = response.user;

        }
      }
    );

  }


  onSubmit(form){



    this.reccertificadoService.update(this.token, this.recertcertificados, this.identity.sub).subscribe(
      response => {
        if (response && response.status){
          console.log(response);
          this.status = 'success';
          this.recertcertificado.cert_act_academicas_y_asistenciales_pdf = response.filepdf;
          this.recertcertificado.trab_esp_y_art_cientificos_pdf = response.filepdf;
          this.recertcertificado.cert_o_diploma_academico_pdf = response.filepdf;
          this.recertcertificado.cert_o_diploma_asistencial_pdf = response.filepdf;

          // Actualizar usuario en sesion
          if (response.changes.cert_act_academicas_y_asistenciales_nombre){
            this.recertcertificados.cert_act_academicas_y_asistenciales_nombre = response.changes.cert_act_academicas_y_asistenciales_nombre;
          }

          if (response.changes.cert_act_academicas_y_asistenciales_cargo){
            this.recertcertificados.cert_act_academicas_y_asistenciales_cargo = response.changes.cert_act_academicas_y_asistenciales_cargo;
          }

          if (response.changes.cert_act_academicas_y_asistenciales_tiempo){
            this.recertcertificados.cert_act_academicas_y_asistenciales_tiempo = response.changes.cert_act_academicas_y_asistenciales_tiempo;
          }

          if (response.changes.cert_act_academicas_y_asistenciales_institucion){
            this.recertcertificados.cert_act_academicas_y_asistenciales_institucion = response.changes.cert_act_academicas_y_asistenciales_institucion;
          }
          if (response.changes.cert_act_academicas_y_asistenciales_pdf){
            this.recertcertificados.cert_act_academicas_y_asistenciales_pdf = response.changes.cert_act_academicas_y_asistenciales_pdf;
          }

          if (response.changes.trab_esp_y_art_cientificos_nombre){
            this.recertcertificados.trab_esp_y_art_cientificos_nombre = response.changes.trab_esp_y_art_cientificos_nombre;
          }
          if (response.changes.trab_esp_y_art_cientificos_ano){
            this.recertcertificados.trab_esp_y_art_cientificos_ano = response.changes.trab_esp_y_art_cientificos_ano;
          }
          if (response.changes.trab_esp_y_art_cientificos_revista){
            this.recertcertificados.trab_esp_y_art_cientificos_revista = response.changes.trab_esp_y_art_cientificos_revista;
          }
          if (response.changes.trab_esp_y_art_cientificos_institucion){
            this.recertcertificados.trab_esp_y_art_cientificos_institucion = response.changes.trab_esp_y_art_cientificos_institucion;
          }
          if (response.changes.trab_esp_y_art_cientificos_encalidad){
            this.recertcertificados.trab_esp_y_art_cientificos_encalidad = response.changes.trab_esp_y_art_cientificos_encalidad;
          }
          if (response.changes.trab_esp_y_art_cientificos_pdf){
            this.recertcertificados.trab_esp_y_art_cientificos_pdf = response.changes.trab_esp_y_art_cientificos_pdf;
          }
          if (response.changes.act_editor_revisor_pub_cient_nombre){
            this.recertcertificados.act_editor_revisor_pub_cient_nombre = response.changes.act_editor_revisor_pub_cient_nombre;
          }
          if (response.changes.act_editor_revisor_pub_cient_ano){
            this.recertcertificados.act_editor_revisor_pub_cient_ano = response.changes.act_editor_revisor_pub_cient_ano;
          }
          if (response.changes.act_editor_revisor_pub_cient_revista){
            this.recertcertificados.act_editor_revisor_pub_cient_revista = response.changes.act_editor_revisor_pub_cient_revista;
          }
          if (response.changes.act_editor_revisor_pub_cient_pdf){
            this.recertcertificados.act_editor_revisor_pub_cient_pdf = response.changes.act_editor_revisor_pub_cient_pdf;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_nombre){
            this.recertcertificados.cert_asist_simposio_de_especialidad_nombre = response.changes.cert_asist_simposio_de_especialidad_nombre;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_modalidad){
            this.recertcertificados.cert_asist_simposio_de_especialidad_modalidad = response.changes.cert_asist_simposio_de_especialidad_modalidad;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_ano){
            this.recertcertificados.cert_asist_simposio_de_especialidad_ano = response.changes.cert_asist_simposio_de_especialidad_ano;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_institucion){
            this.recertcertificados.cert_asist_simposio_de_especialidad_institucion = response.changes.cert_asist_simposio_de_especialidad_institucion;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_horas){
            this.recertcertificados.cert_asist_simposio_de_especialidad_horas = response.changes.cert_asist_simposio_de_especialidad_horas;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_encalidade){
            this.recertcertificados.cert_asist_simposio_de_especialidad_encalidade = response.changes.cert_asist_simposio_de_especialidad_encalidade;
          }
          if (response.changes.cert_asist_simposio_de_especialidad_pdf){
            this.recertcertificados.cert_asist_simposio_de_especialidad_pdf = response.changes.cert_asist_simposio_de_especialidad_pdf;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_nombre){
            this.recertcertificados.cert_asist_simposio_no_especialidad_nombre = response.changes.cert_asist_simposio_no_especialidad_nombre;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_modalidad){
            this.recertcertificados.cert_asist_simposio_no_especialidad_modalidad = response.changes.cert_asist_simposio_no_especialidad_modalidad;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_ano){
            this.recertcertificados.cert_asist_simposio_no_especialidad_ano = response.changes.cert_asist_simposio_no_especialidad_ano;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_institucion){
            this.recertcertificados.cert_asist_simposio_no_especialidad_institucion = response.changes.cert_asist_simposio_no_especialidad_institucion;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_horas){
            this.recertcertificados.cert_asist_simposio_no_especialidad_horas = response.changes.cert_asist_simposio_no_especialidad_horas;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_encalidade){
            this.recertcertificados.cert_asist_simposio_no_especialidad_encalidade = response.changes.cert_asist_simposio_no_especialidad_encalidade;
          }
          if (response.changes.cert_asist_simposio_no_especialidad_pdf){
            this.recertcertificados.cert_asist_simposio_no_especialidad_pdf = response.changes.cert_asist_simposio_no_especialidad_pdf;
          }

          this.recertcertificados = response.recertcertificados;

        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

     console.log(this.recertcertificados);

     /*if (!this.recertificadoForm.valid ) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }*/


    console.log(this.recertificadoForm.value);


  }


  fileUpload(datos){
    // const data = JSON.parse(datos.response);
    const data = JSON.parse(JSON.stringify(datos.body));

    console.log(datos);
    console.log(JSON.parse(datos));
    console.log(JSON.stringify(datos));
    console.log(JSON.parse(JSON.stringify(datos.body)));

      this.recertcertificados.trab_esp_y_art_cientificos_pdf = data.trab_esp_y_art_cientificos_pdf;
      this.recertcertificados.cert_act_academicas_y_asistenciales_pdf = data.cert_act_academicas_y_asistenciales_pdf;
      this.recertcertificados.act_editor_revisor_pub_cient_pdf = data.act_editor_revisor_pub_cient_pdf;
      this.recertcertificados.cert_asist_simposio_de_especialidad_pdf = data.cert_asist_simposio_de_especialidad_pdf;
      this.recertcertificados.cert_asist_simposio_no_especialidad_pdf = data.cert_asist_simposio_no_especialidad_pdf;
  }


  // preguntas dinamicas

  get cert_act_academicas_y_asistenciales_nombre() { return this.recertificadoForm.get('cert_act_academicas_y_asistenciales_nombre'); }
  get cert_act_academicas_y_asistenciales_cargo() { return this.recertificadoForm.get('cert_act_academicas_y_asistenciales_cargo'); }
  get cert_act_academicas_y_asistenciales_tiempo() { return this.recertificadoForm.get('cert_act_academicas_y_asistenciales_tiempo'); }
  get cert_act_academicas_y_asistenciales_institucion() { return this.recertificadoForm.get('cert_act_academicas_y_asistenciales_institucion'); }



  get preguntas(){
    return this.recertificadoForm.get('preguntas') as FormArray;
  }
  get preguntas2(){
    return this.recertificadoForm.get('preguntas2') as FormArray;
  }
  get preguntas3(){
    return this.recertificadoForm.get('preguntas3') as FormArray;
  }
  get preguntas4(){
    return this.recertificadoForm.get('preguntas4') as FormArray;
  }






  agregarPregunta(){
    const preguntasFormGroup  = this.fb.group({
      trab_esp_y_art_cientificos_nombre: '',
      trab_esp_y_art_cientificos_ano: '',
      trab_esp_y_art_cientificos_revista: '',
      trab_esp_y_art_cientificos_institucion: '',
      trab_esp_y_art_cientificos_encalidad: '',
      trab_esp_y_art_cientificos_pdf: '',
    });
    this.preguntas.push(preguntasFormGroup);
  }

  agregarPregunta2(){
    const preguntasFormGroup2  = this.fb.group({
      act_editor_revisor_pub_cient_nombre: '',
      act_editor_revisor_pub_cient_ano: '',
      act_editor_revisor_pub_cient_revista: '',
      act_editor_revisor_pub_cient_pdf: '',
    });
    this.preguntas2.push(preguntasFormGroup2);
  }
  agregarPregunta3(){
    const preguntasFormGroup3  = this.fb.group({
      cert_asist_simposio_de_especialidad_nombre: '',
      cert_asist_simposio_de_especialidad_modalidad: '',
      cert_asist_simposio_de_especialidad_ano: '',
      cert_asist_simposio_de_especialidad_institucion: '',
      cert_asist_simposio_de_especialidad_horas: '',
      cert_asist_simposio_de_especialidad_encalidade: '',
      cert_asist_simposio_de_especialidad_pdf: '',
    });
    this.preguntas3.push(preguntasFormGroup3);
  }
  agregarPregunta4(){
    const preguntasFormGroup4  = this.fb.group({
      cert_asist_simposio_no_especialidad_nombre: '',
      cert_asist_simposio_no_especialidad_modalidad: '',
      cert_asist_simposio_no_especialidad_ano: '',
      cert_asist_simposio_no_especialidad_institucion: '',
      cert_asist_simposio_no_especialidad_horas: '',
      cert_asist_simposio_no_especialidad_encalidade: '',
      cert_asist_simposio_no_especialidad_pdf: '',
    });
    this.preguntas4.push(preguntasFormGroup4);
  }




  removerPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  removerPregunta2(index: number) {
    this.preguntas2.removeAt(index);
  }

  removerPregunta3(index: number) {
    this.preguntas3.removeAt(index);
  }

  removerPregunta4(index: number) {
    this.preguntas4.removeAt(index);
  }


  recertificadoForm = this.fb.group({
    id: [''],

    cert_act_academicas_y_asistenciales_nombre: [''],
      cert_act_academicas_y_asistenciales_cargo: [''],
      cert_act_academicas_y_asistenciales_tiempo: [''],
      cert_act_academicas_y_asistenciales_institucion: [''],
      cert_act_academicas_y_asistenciales_pdf: [''],
      cert_act_academicas_y_asistenciales_status_id: [''],

    trab_esp_y_art_cientificos_nombre: [''],
    trab_esp_y_art_cientificos_ano: [''],
    trab_esp_y_art_cientificos_revista: [''],
    trab_esp_y_art_cientificos_institucion: [''],
    trab_esp_y_art_cientificos_encalidad: [''],
    trab_esp_y_art_cientificos_pdf: [''],

    act_editor_revisor_pub_cient_nombre: [''],
    act_editor_revisor_pub_cient_ano: [''],
    act_editor_revisor_pub_cient_revista: [''],
    act_editor_revisor_pub_cient_pdf: [''],

    cert_asist_simposio_de_especialidad_nombre: [''],
      cert_asist_simposio_de_especialidad_modalidad: [''],
      cert_asist_simposio_de_especialidad_ano: [''],
      cert_asist_simposio_de_especialidad_institucion: [''],
      cert_asist_simposio_de_especialidad_horas: [''],
      cert_asist_simposio_de_especialidad_encalidade: [''],
      cert_asist_simposio_de_especialidad_pdf: [''],

      cert_asist_simposio_no_especialidad_nombre: [''],
      cert_asist_simposio_no_especialidad_modalidad: [''],
      cert_asist_simposio_no_especialidad_ano: [''],
      cert_asist_simposio_no_especialidad_institucion: [''],
      cert_asist_simposio_no_especialidad_horas: [''],
      cert_asist_simposio_no_especialidad_encalidade: [''],
      cert_asist_simposio_no_especialidad_pdf: [''],

    preguntas: this.fb.array([]),
    preguntas2: this.fb.array([]),
    preguntas3: this.fb.array([]),
    preguntas4: this.fb.array([]),

  });




}
