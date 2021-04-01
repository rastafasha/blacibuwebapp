import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

import {User} from '../../../models/users';
import { UserService } from '../../../services/user.service';
import {Recconferencia} from '../../../models/rec-conferencia';
import { RecConferenciaService } from '../../../services/rec-conferencia.service';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-recconferencias',
  templateUrl: './form-recconferencias.component.html',
  styleUrls: ['./form-recconferencias.component.css'],
  providers: [UserService, RecConferenciaService, TranslateService]
})
export class FormRecconferenciasComponent implements OnInit {

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })

  public pageTitle: string;
  public users: User;
  public recconferencias: Recconferencia;
  public status;
  public identity;
  public token;
  public url;
  public activeLang = '';
  flag = false;

  sub: any;
  recconferencia: any;
  user: any;

  public recconferenciaConfig = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'recconferencia/upload',
      headers: {
        Authorization: this.userService.getToken(),
      },
      responseType: 'json',
    },
    theme: 'attachPin',
    selectFileBtn: 'Seleccionar Archivo',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinText: 'Seleccionar archivo pdf',
    afterUploadMsg_success: 'Se cargó correctamente el archivo',
    afterUploadMsg_error: 'Se produjo un error al subir el archivo',
};

  constructor(
    private userService: UserService,
    private reconferenciaService: RecConferenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder
    ) {
      this.loadUser();
      this.gettodoslosConferencias();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();

      this.recconferencia = new Recconferencia(1, this.identity.sub, this.identity.tiporegistro_id, 1,'', '', '', 1, '', '', '', 1, '', '', '', '', '', 1, '', '', '', '', 1);

    // rellenar objeto usuario
    this.recconferencia = new Recconferencia(
      this.identity.id,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.conf_nac_inter_titulo,
       this.identity.conf_nac_inter_evento,
       this.identity.conf_nac_inter_pdf,
       this.identity.conf_nac_inter_status_id,
       this.identity.conf_nac_inter_cialacibu_titulo,
       this.identity.conf_nac_inter_cialacibu_evento,
       this.identity.conf_nac_inter_cialacibu_pdf,
       this.identity.conf_nac_inter_cialacibu_status_id,
       this.identity.afilia_asosc_odont_nac_extran_nombre,
       this.identity.afilia_asosc_odont_nac_extran_cargo,
       this.identity.afilia_asosc_odont_nac_extran_categoria,
       this.identity.afilia_asosc_odont_nac_extran_gremio,
       this.identity.afilia_asosc_odont_nac_extran_pdf,
       this.identity.afilia_asosc_odont_nac_extran_status_id,
       this.identity.colaboracion_acade_para_blacibu_figura,
       this.identity.colaboracion_acade_para_blacibu_ano,
       this.identity.colaboracion_acade_para_blacibu_funcion,
       this.identity.colaboracion_acade_para_blacibu_pdf,
       this.identity.colaboracion_acade_para_blacibu_status_id,
    );



  }






  ngOnInit(): void {
    this.loadUser();
    this.gettodoslosConferencias();
    this.flag = true;
    window.scrollTo(0, 0);
    this.getUserdetail(this.identity.sub);

    this.userService.getUser(this.identity.sub).subscribe(
      res => {
        this.reconferenciaForm.patchValue({
          id: res.id,
          conf_nac_inter_titulo: res.user.recertconferencias[0].conf_nac_inter_titulo,
          conf_nac_inter_evento: res.user.recertconferencias[0].conf_nac_inter_evento,
          conf_nac_inter_pdf: res.user.recertconferencias[0].conf_nac_inter_pdf,
          conf_nac_inter_cialacibu_titulo: res.user.recertconferencias[0].conf_nac_inter_cialacibu_titulo,
          conf_nac_inter_cialacibu_evento: res.user.recertconferencias[0].conf_nac_inter_cialacibu_evento,
          conf_nac_inter_cialacibu_pdf: res.user.recertconferencias[0].conf_nac_inter_cialacibu_pdf,
          afilia_asosc_odont_nac_extran_nombre: res.user.recertconferencias[0].afilia_asosc_odont_nac_extran_nombre,
          afilia_asosc_odont_nac_extran_cargo: res.user.recertconferencias[0].afilia_asosc_odont_nac_extran_cargo,
          afilia_asosc_odont_nac_extran_categoria: res.user.recertconferencias[0].afilia_asosc_odont_nac_extran_categoria,
          afilia_asosc_odont_nac_extran_gremio: res.user.recertconferencias[0].afilia_asosc_odont_nac_extran_gremio,
          afilia_asosc_odont_nac_extran_pdf: res.user.recertconferencias[0].afilia_asosc_odont_nac_extran_pdf,
          colaboracion_acade_para_blacibu_figura: res.user.recertconferencias[0].colaboracion_acade_para_blacibu_figura,
          colaboracion_acade_para_blacibu_ano: res.user.recertconferencias[0].colaboracion_acade_para_blacibu_ano,
          colaboracion_acade_para_blacibu_funcion: res.user.recertconferencias[0].colaboracion_acade_para_blacibu_funcion,
          colaboracion_acade_para_blacibu_pdf: res.user.recertconferencias[0].colaboracion_acade_para_blacibu_pdf,
        });
      }
    );
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

  getUserdetail(sub:number){
    this.userService.getUser(this.identity.sub).subscribe(
      response => {
        if (response.status === 'success'){
          this.user = response.user;
          console.log(this.user);
        }
      }
    );

  }


  gettodoslosConferencias(){
    this.reconferenciaService.getReConferencias().subscribe(
      response => {
        if (response.status === 'success'){
          this.recconferencias = response.recconferencias;
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  onSubmit(form){



    this.reconferenciaService.update(this.token, this.recconferencias, this.identity.sub).subscribe(
      response => {
        if (response && response.status){
          console.log(response);
          this.status = 'success';

          // Actualizar usuario en sesion
          if (response.changes.conf_nac_inter_titulo){
            this.recconferencias.conf_nac_inter_titulo = response.changes.conf_nac_inter_titulo;
          }

          if (response.changes.conf_nac_inter_evento){
            this.recconferencias.conf_nac_inter_evento = response.changes.conf_nac_inter_evento;
          }

          if (response.changes.conf_nac_inter_pdf){
            this.recconferencias.conf_nac_inter_pdf = response.changes.conf_nac_inter_pdf;
          }

          if (response.changes.conf_nac_inter_cialacibu_titulo){
            this.recconferencias.conf_nac_inter_cialacibu_titulo = response.changes.conf_nac_inter_cialacibu_titulo;
          }
          if (response.changes.conf_nac_inter_cialacibu_evento){
            this.recconferencias.conf_nac_inter_cialacibu_evento = response.changes.conf_nac_inter_cialacibu_evento;
          }
          if (response.changes.conf_nac_inter_cialacibu_pdf){
            this.recconferencias.conf_nac_inter_cialacibu_pdf = response.changes.conf_nac_inter_cialacibu_pdf;
          }

          if (response.changes.afilia_asosc_odont_nac_extran_nombre){
            this.recconferencias.afilia_asosc_odont_nac_extran_nombre = response.changes.afilia_asosc_odont_nac_extran_nombre;
          }
          if (response.changes.afilia_asosc_odont_nac_extran_cargo){
            this.recconferencias.afilia_asosc_odont_nac_extran_cargo = response.changes.afilia_asosc_odont_nac_extran_cargo;
          }
          if (response.changes.afilia_asosc_odont_nac_extran_categoria){
            this.recconferencias.afilia_asosc_odont_nac_extran_categoria = response.changes.afilia_asosc_odont_nac_extran_categoria;
          }
          if (response.changes.afilia_asosc_odont_nac_extran_gremio){
            this.recconferencias.afilia_asosc_odont_nac_extran_gremio = response.changes.afilia_asosc_odont_nac_extran_gremio;
          }

          if (response.changes.afilia_asosc_odont_nac_extran_pdf){
            this.recconferencias.afilia_asosc_odont_nac_extran_pdf = response.changes.afilia_asosc_odont_nac_extran_pdf;
          }
          if (response.changes.colaboracion_acade_para_blacibu_figura){
            this.recconferencias.colaboracion_acade_para_blacibu_figura = response.changes.colaboracion_acade_para_blacibu_figura;
          }
          if (response.changes.colaboracion_acade_para_blacibu_ano){
            this.recconferencias.colaboracion_acade_para_blacibu_ano = response.changes.colaboracion_acade_para_blacibu_ano;
          }
          if (response.changes.colaboracion_acade_para_blacibu_funcion){
            this.recconferencias.colaboracion_acade_para_blacibu_funcion = response.changes.colaboracion_acade_para_blacibu_funcion;
          }

          if (response.changes.colaboracion_acade_para_blacibu_pdf){
            this.recconferencias.colaboracion_acade_para_blacibu_pdf = response.changes.colaboracion_acade_para_blacibu_pdf;
          }


          this.recconferencias = response.recconferencias;
          localStorage.setItem('identity', JSON.stringify(this.recconferencias.id));


        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

     console.log(this.recconferencias);

     if (!this.reconferenciaForm.valid ) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }


    console.log(this.reconferenciaForm.value);

  }


  fileUpload(datos){
    // const data = JSON.parse(datos.response);
    const data = JSON.parse(JSON.stringify(datos.body));

    console.log(datos);
    console.log(JSON.parse(datos));
    console.log(JSON.stringify(datos));
    console.log(JSON.parse(JSON.stringify(datos.body)));

      this.recconferencias.conf_nac_inter_pdf = data.conf_nac_inter_pdf;
      this.recconferencias.conf_nac_inter_cialacibu_pdf = data.conf_nac_inter_cialacibu_pdf;
      this.recconferencias.afilia_asosc_odont_nac_extran_pdf = data.afilia_asosc_odont_nac_extran_pdf;
      this.recconferencias.colaboracion_acade_para_blacibu_pdf = data.colaboracion_acade_para_blacibu_pdf;
  }


  // preguntas dinamicas

  get preguntas(){
    return this.reconferenciaForm.get('preguntas') as FormArray;
  }
  get preguntas2(){
    return this.reconferenciaForm.get('preguntas2') as FormArray;
  }
  get preguntas3(){
    return this.reconferenciaForm.get('preguntas3') as FormArray;
  }

  get preguntas4(){
    return this.reconferenciaForm.get('preguntas4') as FormArray;
  }




  agregarPregunta(){
    const preguntasFormGroup  = this.fb.group({
      conf_nac_inter_titulo: '',
      conf_nac_inter_evento: '',
      conf_nac_inter_pdf: '',
    });
    this.preguntas.push(preguntasFormGroup);
  }

  agregarPregunta2(){
    const preguntasFormGroup2  = this.fb.group({
      conf_nac_inter_cialacibu_titulo: '',
      conf_nac_inter_cialacibu_evento: '',
      conf_nac_inter_cialacibu_pdf: '',
    });
    this.preguntas2.push(preguntasFormGroup2);
  }

  agregarPregunta3(){
    const preguntasFormGroup3  = this.fb.group({
      afilia_asosc_odont_nac_extran_nombre: '',
      afilia_asosc_odont_nac_extran_cargo: '',
      afilia_asosc_odont_nac_extran_categoria: '',
      afilia_asosc_odont_nac_extran_gremio: '',
      afilia_asosc_odont_nac_extran_pdf: '',
    });
    this.preguntas3.push(preguntasFormGroup3);
  }

  agregarPregunta4(){
    const preguntasFormGroup4  = this.fb.group({
      colaboracion_acade_para_blacibu_figura: '',
      colaboracion_acade_para_blacibu_ano: '',
      colaboracion_acade_para_blacibu_funcion: '',
      colaboracion_acade_para_blacibu_pdf: '',
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


  reconferenciaForm = this.fb.group({

    id: [''],


    conf_nac_inter_titulo: [''],
      conf_nac_inter_evento: [''],
      conf_nac_inter_pdf: [''],
      conf_nac_inter_cialacibu_titulo: [''],
      conf_nac_inter_cialacibu_evento: [''],
      conf_nac_inter_cialacibu_pdf: [''],
      afilia_asosc_odont_nac_extran_nombre: [''],
      afilia_asosc_odont_nac_extran_cargo: [''],
      afilia_asosc_odont_nac_extran_categoria: [''],
      afilia_asosc_odont_nac_extran_gremio: [''],
      afilia_asosc_odont_nac_extran_pdf: [''],
      colaboracion_acade_para_blacibu_figura: [''],
      colaboracion_acade_para_blacibu_ano: [''],
      colaboracion_acade_para_blacibu_funcion: [''],
      colaboracion_acade_para_blacibu_pdf: [''],

    preguntas: this.fb.array([]),
    preguntas2: this.fb.array([]),
    preguntas3: this.fb.array([]),
    preguntas4: this.fb.array([])

  });




}

