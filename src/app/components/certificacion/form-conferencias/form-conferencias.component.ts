import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

import {User} from '../../../models/users';
import { UserService } from '../../../services/user.service';
import {Conferencia} from '../../../models/conferencia';
import { ConferenciaService } from '../../../services/conferencia.service';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-conferencias',
  templateUrl: './form-conferencias.component.html',
  styleUrls: ['./form-conferencias.component.css'],
  providers: [UserService, ConferenciaService, TranslateService]
})
export class FormConferenciasComponent implements OnInit, DoCheck {

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  });

  public conferencias: Conferencia;
  public users: User;

  public status;
  public identity;
  public token;
  public url;

  public activeLang = '';
  flag = false;

  sub: any;
  user: any;
  conferencia: any;

  imagePath: string;

  public selectedDocument=0;

  public conferenciaConfig = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'conferencia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 1,
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
    sizeLimit: 'Límite de tamaño 2 Megas',
  };

  public conferenciaConfig1 = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'conferencia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 2,
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
    sizeLimit: 'Límite de tamaño 2 Megas',
  };

  public conferenciaConfig2 = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'conferencia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 3,
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
    sizeLimit: 'Límite de tamaño 2 Megas',
  };

  public conferenciaConfig3 = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'conferencia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 4,
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
    sizeLimit: 'Límite de tamaño 2 Megas',
  };

  public conferenciaConfig4 = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'conferencia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 5,
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
    sizeLimit: 'Límite de tamaño 2 Megas',
  };

  constructor(
    private userService: UserService,
    private conferenciaService: ConferenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder
    ) {
      this.loadUser();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();

      this.conferencia = new Conferencia(1, this.identity.sub, this.identity.tiporegistro_id,1, '', '', '', 1, '', '', '', 1, '', '', '', '', 1, '', '', '', '', 1, '', '', '', '', 1);

    // rellenar objeto usuario
    this.conferencia = new Conferencia(
      this.identity.id,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.conf_con_aval_academico_titulo,
      this.identity.conf_con_aval_academico_evento,
      this.identity.conf_con_aval_academico_pdf,
      this.identity.conf_con_aval_academico_status_id,
      this.identity.conf_sin_aval_academico_titulo,
      this.identity.conf_sin_aval_academico_evento,
      this.identity.conf_sin_aval_academico_pdf,
      this.identity.conf_sin_aval_academico_status_id,
      this.identity.trab_pres_con_aval_titulo,
      this.identity.trab_pres_con_aval_evento,
      this.identity.trab_pres_con_aval_modalidad,
      this.identity.trab_pres_con_aval_pdf,
      this.identity.trab_pres_con_aval_status_id,
      this.identity.trab_pres_sin_aval_titulo,
      this.identity.trab_pres_sin_aval_evento,
      this.identity.trab_pres_sin_aval_modalidad,
      this.identity.trab_pres_sin_aval_pdf,
      this.identity.trab_pres_sin_aval_status_id,
      this.identity.trab_publicados_nombre,
      this.identity.trab_publicados_ano,
      this.identity.trab_publicados_revisa,
      this.identity.trab_publicados_pdf,
      this.identity.trab_publicados_status_id,
    );



  }




  ngOnInit(): void {
    this.flag = true;
    this.loadUser();
    this.gettodoslosConferencias();
    window.scrollTo(0, 0);
    this.getUserdetail(this.identity.sub);


    this.getConferenciaUser();

    this.userService.getUser(this.identity.sub).subscribe(
      res => {
        this.conferenciaForm.patchValue({
          id: res.user.conferencias[0].id,
          conf_con_aval_academico_titulo: res.user.conferencias[0].conf_con_aval_academico_titulo,
          conf_con_aval_academico_evento: res.user.conferencias[0].conf_con_aval_academico_evento,
          conf_con_aval_academico_pdf: res.user.conferencias[0].conf_con_aval_academico_pdf,

          conf_sin_aval_academico_titulo: res.user.conferencias[0].conf_sin_aval_academico_titulo,
          conf_sin_aval_academico_evento: res.user.conferencias[0].conf_sin_aval_academico_evento,
          conf_sin_aval_academico_pdf: res.user.conferencias[0].conf_sin_aval_academico_pdf,

          trab_pres_con_aval_titulo: res.user.conferencias[0].trab_pres_con_aval_titulo,
          trab_pres_con_aval_evento: res.user.conferencias[0].trab_pres_con_aval_evento,
          trab_pres_con_aval_modalidad: res.user.conferencias[0].trab_pres_con_aval_modalidad,
          trab_pres_con_aval_pdf: res.user.conferencias[0].trab_pres_con_aval_pdf,

          trab_pres_sin_aval_titulo: res.user.conferencias[0].trab_pres_sin_aval_titulo,
          trab_pres_sin_aval_evento: res.user.conferencias[0].trab_pres_sin_aval_evento,
          trab_pres_sin_aval_modalidad: res.user.conferencias[0].trab_pres_sin_aval_modalidad,
          trab_pres_sin_aval_pdf: res.user.conferencias[0].trab_pres_sin_aval_pdf,

          trab_publicados_nombre: res.user.conferencias[0].trab_publicados_nombre,
          trab_publicados_ano: res.user.conferencias[0].trab_publicados_ano,
          trab_publicados_revisa: res.user.conferencias[0].trab_publicados_revisa,
          trab_publicados_pdf: res.user.conferencias[0].trab_publicados_pdf,
        });

        const confTiulo = res.user.conferencias[0].conf_con_aval_academico_titulo.split([';']);
        const confEvento = res.user.conferencias[0].conf_con_aval_academico_evento.split([';']);
        const confPdf = res.user.conferencias[0].conf_con_aval_academico_pdf.split([';']);

        const confSTiulo = res.user.conferencias[0].conf_sin_aval_academico_titulo.split([';']);
        const confSEvento = res.user.conferencias[0].conf_sin_aval_academico_evento.split([';']);
        const confSpdf = res.user.conferencias[0].conf_sin_aval_academico_pdf.split([';']);

        const trabPrescTitulo = res.user.conferencias[0].trab_pres_con_aval_titulo.split([';']);
        const trabPrescEvento = res.user.conferencias[0].trab_pres_con_aval_evento.split([';']);
        const trabPrescModalidad = res.user.conferencias[0].trab_pres_con_aval_modalidad.split([';']);
        const trabPrescPdf = res.user.conferencias[0].trab_pres_con_aval_pdf.split([';']);

        const trabPressTitulo = res.user.conferencias[0].trab_pres_sin_aval_titulo.split([';']);
        const trabPressEvento = res.user.conferencias[0].trab_pres_sin_aval_evento.split([';']);
        const trabPressModalidad = res.user.conferencias[0].trab_pres_sin_aval_modalidad.split([';']);
        const trabPressPdf = res.user.conferencias[0].trab_pres_sin_aval_pdf.split([';']);

        const trabPublNombre = res.user.conferencias[0].trab_publicados_nombre.split([';']);
        const trabPublAno = res.user.conferencias[0].trab_publicados_ano.split([';']);
        const trabPublRevista = res.user.conferencias[0].trab_publicados_revisa.split([';']);
        const trabPublPdf = res.user.conferencias[0].trab_publicados_pdf.split([';']);


        for (var i = 0; i < confTiulo.length; i++) {
          if (i==0) {
            this.conferenciaForm.patchValue({
              conf_con_aval_academico_titulo : confTiulo[i],
              conf_con_aval_academico_evento : confEvento[i],
              conf_con_aval_academico_pdf : confPdf[i],
            })
          }
          else {
            const preguntasFormGroup  = this.fb.group({
                rconf_con_aval_academico_titulo : confTiulo[i],
                conf_con_aval_academico_evento : confEvento[i],
                conf_con_aval_academico_pdf : confPdf[i],
             });
            this.preguntas.push(preguntasFormGroup);
          }
        };
//
        for (var i = 0; i < confSTiulo.length; i++) {
          if (i==0) {
            this.conferenciaForm.patchValue({
              conf_sin_aval_academico_titulo : confSTiulo[i],
              conf_sin_aval_academico_evento : confSEvento[i],
              conf_sin_aval_academico_pdf : confSpdf[i],
            })
          }
          else {
            const preguntasFormGroup2  = this.fb.group({
              conf_sin_aval_academico_titulo : confSTiulo[i],
              conf_sin_aval_academico_evento : confSEvento[i],
              conf_sin_aval_academico_pdf : confSpdf[i],
             });
            this.preguntas2.push(preguntasFormGroup2);
          }
        }
//

        for (var i = 0; i < trabPrescTitulo.length; i++) {
          if (i==0) {
            this.conferenciaForm.patchValue({
              trab_pres_con_aval_titulo : trabPrescTitulo[i],
              trab_pres_con_aval_evento : trabPrescEvento[i],
              trab_pres_con_aval_modalidad : trabPrescModalidad[i],
              trab_pres_con_aval_pdf : trabPrescPdf[i],
            })
          }
          else {
            const preguntasFormGroup3  = this.fb.group({
              trab_pres_con_aval_titulo : trabPrescTitulo[i],
              trab_pres_con_aval_evento : trabPrescEvento[i],
              trab_pres_con_aval_modalidad : trabPrescModalidad[i],
              trab_pres_con_aval_pdf : trabPrescPdf[i],
             });
            this.preguntas3.push(preguntasFormGroup3);
          }
        }
        //

        for (var i = 0; i < trabPressTitulo.length; i++) {
          if (i==0) {
            this.conferenciaForm.patchValue({
              trab_pres_sin_aval_titulo : trabPressTitulo[i],
              trab_pres_sin_aval_evento : trabPressEvento[i],
              trab_pres_sin_aval_modalidad : trabPressModalidad[i],
              trab_pres_sin_aval_pdf : trabPressPdf[i],
            })
          }
          else {
            const preguntasFormGroup4  = this.fb.group({
              trab_pres_sin_aval_titulo : trabPressTitulo[i],
              trab_pres_sin_aval_evento : trabPressEvento[i],
              trab_pres_sin_aval_modalidad : trabPressModalidad[i],
              trab_pres_sin_aval_pdf : trabPressPdf[i],
             });
            this.preguntas4.push(preguntasFormGroup4);
          }
        }
        //

        for (var i = 0; i < trabPublNombre.length; i++) {
          if (i==0) {
            this.conferenciaForm.patchValue({
              trab_publicados_nombre : trabPublNombre[i],
              trab_publicados_ano : trabPublAno[i],
              trab_publicados_revisa : trabPublRevista[i],
              trab_publicados_pdf : trabPublPdf[i],
            })
          }
          else {
            const preguntasFormGroup5  = this.fb.group({
              trab_publicados_nombre : trabPublNombre[i],
              trab_publicados_ano : trabPublAno[i],
              trab_publicados_revisa : trabPublRevista[i],
              trab_publicados_pdf : trabPublPdf[i],
             });
            this.preguntas5.push(preguntasFormGroup5);
          }
        }
        //

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

  gettodoslosConferencias(){
    this.conferenciaService.getConferencias().subscribe(
      response => {
        if (response.status === 'success'){
          this.conferencias = response.conferencias;
          //console.log(this.conferencias);

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserdetail(sub:number){
    this.userService.getUser(this.identity.sub).subscribe(
      response => {
        if (response.status === 'success'){
          this.user = response.user;
          //console.log(this.user);
        }
      }
    );

  }

  getConferenciaUser(){
    this.conferenciaService.getConferencia(this.identity.sub).subscribe(
      response => {
          this.conferencia = response;
        if (response.status === 'success'){
          // Actualizar usuario en sesion


          if (response.conferencias[0].conf_con_aval_academico_titulo){
            this.conferencia.conf_con_aval_academico_titulo = response.conferencias[0].conf_con_aval_academico_titulo;
          }
          if (response.conferencias[0].conf_con_aval_academico_evento){
            this.conferencia.conf_con_aval_academico_evento = response.conferencias[0].conf_con_aval_academico_evento;
          }
          if (response.conferencias[0].conf_con_aval_academico_pdf){
            this.conferencia.conf_con_aval_academico_pdf = response.conferencias[0].conf_con_aval_academico_pdf;
          }

          if (response.conferencias[0].conf_sin_aval_academico_titulo){
            this.conferencia.conf_sin_aval_academico_titulo = response.conferencias[0].conf_sin_aval_academico_titulo;
          }
          if (response.conferencias[0].conf_sin_aval_academico_evento){
            this.conferencia.conf_sin_aval_academico_evento = response.conferencias[0].conf_sin_aval_academico_evento;
          }
          if (response.conferencias[0].conf_sin_aval_academico_pdf){
            this.conferencia.conf_sin_aval_academico_pdf = response.conferencias[0].conf_sin_aval_academico_pdf;
          }

          if (response.conferencias[0].trab_pres_con_aval_titulo){
            this.conferencia.trab_pres_con_aval_titulo = response.conferencias[0].trab_pres_con_aval_titulo;
          }
          if (response.conferencias[0].trab_pres_con_aval_evento){
            this.conferencia.trab_pres_con_aval_evento = response.conferencias[0].trab_pres_con_aval_evento;
          }
          if (response.conferencias[0].trab_pres_con_aval_modalidad){
            this.conferencia.trab_pres_con_aval_modalidad = response.conferencias[0].trab_pres_con_aval_modalidad;
          }
          if (response.conferencias[0].trab_pres_con_aval_pdf){
            this.conferencia.trab_pres_con_aval_pdf = response.conferencias[0].trab_pres_con_aval_pdf;
          }

          if (response.conferencias[0].trab_pres_sin_aval_titulo){
            this.conferencia.trab_pres_sin_aval_titulo = response.conferencias[0].trab_pres_sin_aval_titulo;
          }
          if (response.conferencias[0].trab_pres_sin_aval_evento){
            this.conferencia.trab_pres_sin_aval_evento = response.conferencias[0].trab_pres_sin_aval_evento;
          }
          if (response.conferencias[0].trab_pres_sin_aval_modalidad){
            this.conferencia.trab_pres_sin_aval_modalidad = response.conferencias[0].trab_pres_sin_aval_modalidad;
          }
          if (response.conferencias[0].trab_pres_sin_aval_pdf){
            this.conferencia.trab_pres_sin_aval_pdf = response.conferencias[0].trab_pres_sin_aval_pdf;
          }

          if (response.conferencias[0].trab_publicados_nombre){
            this.conferencia.trab_publicados_nombre = response.conferencias[0].trab_publicados_nombre;
          }
          if (response.conferencias[0].trab_publicados_ano){
            this.conferencia.trab_publicados_ano = response.conferencias[0].trab_publicados_ano;
          }
          if (response.conferencias[0].trab_publicados_revisa){
            this.conferencia.trab_publicados_revisa = response.conferencias[0].trab_publicados_revisa;
          }
          if (response.conferencias[0].trab_publicados_pdf){
            this.conferencia.trab_publicados_pdf = response.conferencias[0].trab_publicados_pdf;
          }



        }else{
          //this.router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
        //this.router.navigate(['/inicio']);
      }
    );
}

  onSubmit(form){



    this.conferenciaService.update(this.token, this.conferencia, this.identity.sub).subscribe(
      response => {
        if (response && response.status){
          console.log(response);
          this.status = 'success';

          // Actualizar usuario en sesion
          if (response.changes.conf_con_aval_academico_titulo){
            this.conferencia[0].conf_con_aval_academico_titulo = response.changes.conf_con_aval_academico_titulo;
          }
          if (response.changes.conf_con_aval_academico_evento){
            this.conferencia.conf_con_aval_academico_evento = response.changes.conf_con_aval_academico_evento;
          }
          if (response.changes.conf_con_aval_academico_pdf){
            this.conferencia.conf_con_aval_academico_pdf = response.changes.conf_con_aval_academico_pdf;
          }

          if (response.changes.conf_sin_aval_academico_titulo){
            this.conferencia.conf_sin_aval_academico_titulo = response.changes.conf_sin_aval_academico_titulo;
          }
          if (response.changes.conf_sin_aval_academico_evento){
            this.conferencia.conf_sin_aval_academico_evento = response.changes.conf_sin_aval_academico_evento;
          }
          if (response.changes.conf_sin_aval_academico_pdf){
            this.conferencia.conf_sin_aval_academico_pdf = response.changes.conf_sin_aval_academico_pdf;
          }

          if (response.changes.trab_pres_con_aval_titulo){
            this.conferencia.trab_pres_con_aval_titulo = response.changes.trab_pres_con_aval_titulo;
          }
          if (response.changes.trab_pres_con_aval_evento){
            this.conferencia.trab_pres_con_aval_evento = response.changes.trab_pres_con_aval_evento;
          }
          if (response.changes.trab_pres_con_aval_modalidad){
            this.conferencia.trab_pres_con_aval_modalidad = response.changes.trab_pres_con_aval_modalidad;
          }
          if (response.changes.trab_pres_con_aval_pdf){
            this.conferencia.trab_pres_con_aval_pdf = response.changes.trab_pres_con_aval_pdf;
          }

          if (response.changes.trab_pres_sin_aval_titulo){
            this.conferencia.trab_pres_sin_aval_titulo = response.changes.trab_pres_sin_aval_titulo;
          }
          if (response.changes.trab_pres_sin_aval_evento){
            this.conferencia.trab_pres_sin_aval_evento = response.changes.trab_pres_sin_aval_evento;
          }
          if (response.changes.trab_pres_sin_aval_modalidad){
            this.conferencia.trab_pres_sin_aval_modalidad = response.changes.trab_pres_sin_aval_modalidad;
          }
          if (response.changes.trab_pres_sin_aval_pdf){
            this.conferencia.trab_pres_sin_aval_pdf = response.changes.trab_pres_sin_aval_pdf;
          }

          if (response.changes.trab_publicados_nombre){
            this.conferencia.trab_publicados_nombre = response.changes.trab_publicados_nombre;
          }
          if (response.changes.trab_publicados_ano){
            this.conferencia.trab_publicados_ano = response.changes.trab_publicados_ano;
          }
          if (response.changes.trab_publicados_revisa){
            this.conferencia.trab_publicados_revisa = response.changes.trab_publicados_revisa;
          }
          if (response.changes.trab_publicados_pdf){
            this.conferencia.trab_publicados_pdf = response.changes.trab_publicados_pdf;
          }


          this.conferencia = response.conferencia;
          localStorage.setItem('identity', JSON.stringify(this.conferencia.id));

        }else{
          //this.router.navigate(['/certificados']);
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );




    console.log(this.conferenciaForm.value);

  }


  fileUpload(datos){
     const data = JSON.parse(datos.response);
    //const data = JSON.parse(JSON.stringify(datos.body));


      this.conferencias.conf_con_aval_academico_pdf = data.conf_con_aval_academico_pdf;
      this.conferencias.conf_sin_aval_academico_pdf = data.conf_sin_aval_academico_pdf;
      this.conferencias.trab_pres_con_aval_pdf = data.trab_pres_con_aval_pdf;
      this.conferencias.trab_pres_sin_aval_pdf = data.trab_pres_sin_aval_pdf;
      this.conferencias.trab_publicados_pdf = data.trab_publicados_pdf;
  }


  // preguntas dinamicas

  get conf_con_aval_academico_titulo() { return this.conferenciaForm.get('conf_con_aval_academico_titulo'); }
  get conf_con_aval_academico_evento() { return this.conferenciaForm.get('conf_con_aval_academico_evento'); }
  get conf_sin_aval_academico_titulo() { return this.conferenciaForm.get('conf_sin_aval_academico_titulo'); }
  get conf_sin_aval_academico_evento() { return this.conferenciaForm.get('conf_sin_aval_academico_evento'); }

  get trab_pres_con_aval_titulo() { return this.conferenciaForm.get('trab_pres_con_aval_titulo'); }
  get trab_pres_con_aval_evento() { return this.conferenciaForm.get('trab_pres_con_aval_evento'); }
  get trab_pres_con_aval_modalidad() { return this.conferenciaForm.get('trab_pres_con_aval_modalidad'); }

  get trab_pres_sin_aval_titulo() { return this.conferenciaForm.get('trab_pres_sin_aval_titulo'); }
  get trab_pres_sin_aval_evento() { return this.conferenciaForm.get('trab_pres_sin_aval_evento'); }
  get trab_pres_sin_aval_modalidad() { return this.conferenciaForm.get('trab_pres_sin_aval_modalidad'); }

  get trab_publicados_nombre() { return this.conferenciaForm.get('trab_publicados_nombre'); }
  get trab_publicados_ano() { return this.conferenciaForm.get('trab_publicados_ano'); }
  get trab_publicados_revisa() { return this.conferenciaForm.get('trab_publicados_revisa'); }

  get preguntas(){
    return this.conferenciaForm.get('preguntas') as FormArray;
  }
  get preguntas2(){
    return this.conferenciaForm.get('preguntas2') as FormArray;
  }
  get preguntas3(){
    return this.conferenciaForm.get('preguntas3') as FormArray;
  }
  get preguntas4(){
    return this.conferenciaForm.get('preguntas4') as FormArray;
  }
  get preguntas5(){
    return this.conferenciaForm.get('preguntas5') as FormArray;
  }





  agregarPregunta(){
    const preguntasFormGroup  = this.fb.group({
      conf_con_aval_academico_titulo: '',
      conf_con_aval_academico_evento: '',
      conf_con_aval_academico_pdf: '',
    });
    this.preguntas.push(preguntasFormGroup);
  }

  agregarPregunta2(){
    const preguntasFormGroup2  = this.fb.group({
      conf_sin_aval_academico_titulo: '',
      conf_sin_aval_academico_evento: '',
      conf_sin_aval_academico_pdf: '',
    });
    this.preguntas2.push(preguntasFormGroup2);
  }

  agregarPregunta3(){
    const preguntasFormGroup3  = this.fb.group({
      trab_pres_con_aval_titulo: '',
      trab_pres_con_aval_evento: '',
      trab_pres_con_aval_modalidad: '',
      trab_pres_con_aval_pdf: '',
    });
    this.preguntas3.push(preguntasFormGroup3);
  }

  agregarPregunta4(){
    const preguntasFormGroup4  = this.fb.group({
      trab_pres_con_aval_titulo: '',
      trab_pres_con_aval_evento: '',
      trab_pres_con_aval_modalidad: '',
      trab_pres_con_aval_pdf: '',
    });
    this.preguntas4.push(preguntasFormGroup4);
  }

  agregarPregunta5(){
    const preguntasFormGroup5  = this.fb.group({
      trab_publicados_nombre: '',
      trab_publicados_ano: '',
      trab_publicados_revisa: '',
      trab_publicados_pdf: '',
    });
    this.preguntas5.push(preguntasFormGroup5);
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

  removerPregunta5(index: number) {
    this.preguntas5.removeAt(index);
  }


  conferenciaForm = this.fb.group({
    id: [1],

    conf_con_aval_academico_titulo: [''],
      conf_con_aval_academico_evento: [''],
      conf_con_aval_academico_pdf: [''],

      conf_sin_aval_academico_titulo: [''],
      conf_sin_aval_academico_evento: [''],
      conf_sin_aval_academico_pdf: [''],

      trab_pres_con_aval_titulo: [''],
      trab_pres_con_aval_evento: [''],
      trab_pres_con_aval_modalidad: [''],
      trab_pres_con_aval_pdf: [''],

      trab_pres_sin_aval_titulo: [''],
      trab_pres_sin_aval_evento: [''],
      trab_pres_sin_aval_modalidad: [''],
      trab_pres_sin_aval_pdf: [''],

      trab_publicados_nombre: [''],
      trab_publicados_ano: [''],
      trab_publicados_revisa: [''],
      trab_publicados_pdf: [''],

    preguntas: this.fb.array([]),
    preguntas2: this.fb.array([]),
    preguntas3: this.fb.array([]),
    preguntas4: this.fb.array([]),
    preguntas5: this.fb.array([]),

  });





}
