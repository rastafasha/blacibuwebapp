import { Component, OnInit,  DoCheck  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

import {User} from '../../../models/users';
import { UserService } from '../../../services/user.service';
import {Certificado} from '../../../models/certificado';
import { CertificadoService } from '../../../services/certificado.service';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-form-certificados',
  templateUrl: './form-certificados.component.html',
  styleUrls: ['./form-certificados.component.css'],
  providers: [UserService, CertificadoService, TranslateService]
})
export class FormCertificadosComponent implements OnInit, DoCheck {

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  });

  public certificados: Certificado;
  public users: User;


  public status;
  public identity;
  public token;
  public url;
  public storage=environment.storage;

  public activeLang = '';
  flag = false;


  sub: any;
  user: any;
  certificado:any;

  imagePath: string;


  public certificadoConfig = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'certificado/upload',
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
    sizeLimit: 'Límite de tamaño 2 Megas',

  };


  constructor(
    private userService: UserService,
    private certificadoService: CertificadoService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder
    ) {
      this.loadUser();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();

      this.certificado = new Certificado(1, this.identity.sub, this.identity.tiporegistro_id, 1,'', '', '', '', '', 1, '', '', '', '', '', 1, '', '', '', '', '', 1, '', '', '', '', '', 1);

    // rellenar objeto usuario
    this.certificado = new Certificado(
      this.identity.id,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.cert_asist_avalados_nombre,
       this.identity.cert_asist_avalados_ano,
       this.identity.cert_asist_avalados_otrasinst,
       this.identity.cert_asist_avalados_horas,
       this.identity.cert_asist_avalados_pdf,
       this.identity.cert_asist_avalados_status_id,
       this.identity.cert_asist_no_avalados_nombre,
       this.identity.cert_asist_no_avalados_ano,
       this.identity.cert_asist_no_avalados_otrasinst,
       this.identity.cert_asist_no_avalados_horas,
       this.identity.cert_asist_no_avalados_pdf,
       this.identity.cert_asist_no_avalados_status_id,
       this.identity.cert_o_diploma_academico_nombre,
       this.identity.cert_o_diploma_academico_cargo,
       this.identity.cert_o_diploma_academico_tiempo,
       this.identity.cert_o_diploma_academico_otrasinst,
       this.identity.cert_o_diploma_academico_pdf,
       this.identity.cert_o_diploma_academico_status_id,
       this.identity.cert_o_diploma_asistencial_nombre,
       this.identity.cert_o_diploma_asistencial_cargo,
       this.identity.cert_o_diploma_asistencial_tiempo,
       this.identity.cert_o_diploma_asistencial_otrasinst,
       this.identity.cert_o_diploma_asistencial_pdf,
       this.identity.cert_o_diploma_asistencial_status_id,
    );



  }




  ngOnInit(): void {
    this.flag = true;
    this.loadUser();
    window.scrollTo(0, 0);
    this.gettodoslosCertificados();

    this.getUserdetail(this.identity.sub);



    this.userService.getUser(this.identity.sub).subscribe(
      res => {
        this.certificadoForm.patchValue({
          id: res.id,
          cert_asist_avalados_nombre: res.user.certificados.cert_asist_avalados_nombre,
          cert_asist_avalados_ano: res.user.certificados.cert_asist_avalados_ano,
          cert_asist_avalados_otrasinst: res.user.certificados.cert_asist_avalados_otrasinst,
          cert_asist_avalados_horas: res.user.certificados.cert_asist_avalados_horas,
          cert_asist_avalados_pdf: res.user.certificados.cert_asist_avalados_pdf,

          cert_asist_no_avalados_nombre: res.user.certificados.cert_asist_no_avalados_nombre,
          cert_asist_no_avalados_ano: res.user.certificados.cert_asist_no_avalados_ano,
          cert_asist_no_avalados_otrasinst: res.user.certificados.cert_asist_no_avalados_otrasinst,
          cert_asist_no_avalados_horas: res.user.certificados.cert_asist_no_avalados_horas,
          cert_asist_no_avalados_pdf: res.user.certificados.cert_asist_no_avalados_pdf,

          cert_o_diploma_academico_nombre: res.user.certificados.cert_o_diploma_academico_nombre,
          cert_o_diploma_academico_cargo: res.user.certificados.cert_o_diploma_academico_cargo,
          cert_o_diploma_academico_tiempo: res.user.certificados.cert_o_diploma_academico_tiempo,
          cert_o_diploma_academico_otrasinst: res.user.certificados.cert_o_diploma_academico_otrasinst,
          cert_o_diploma_academico_pdf: res.user.certificados.cert_o_diploma_academico_pdf,

          cert_o_diploma_asistencial_nombre: res.user.certificados.cert_o_diploma_asistencial_nombre,
          cert_o_diploma_asistencial_cargo: res.user.certificados.cert_o_diploma_asistencial_cargo,
          cert_o_diploma_asistencial_tiempo: res.user.certificados.cert_o_diploma_asistencial_tiempo,
          cert_o_diploma_asistencial_otrasinst: res.user.certificados.cert_o_diploma_asistencial_otrasinst,
          cert_o_diploma_asistencial_pdf: res.user.certificados.cert_o_diploma_asistencial_pdf,
        });

        let certNombres = res.user.certificados.cert_asist_avalados_nombre.split([';']);
        let certAnos = res.user.certificados.cert_asist_avalados_ano.split([';']);
        let certOtras = res.user.certificados.cert_asist_avalados_otrasinst.split([';']);
        let certHoras = res.user.certificados.cert_asist_avalados_horas.split([';']);
        //let certPdfs = res.user.certificados.cert_asist_avalados_pdf.split([';']);

        let certAsistnoNombres = res.certificados.cert_asist_no_avalados_nombre.split([';']);
        let certAsistnoAnos = res.certificados.cert_asist_no_avalados_ano.split([';']);
        let certAsistnoOtras = res.certificados.cert_asist_no_avalados_otrasinst.split([';']);
        let certAsistnoHoras = res.certificados.cert_asist_no_avalados_horas.split([';']);
        //let certAsistnoPdfs = res.certificados.cert_asist_no_avalados_pdf.split([';']);

        for (var i = 0; i < certNombres.length; i++) {
          if (i==0) {
            this.certificadoForm.patchValue({
              cert_asist_avalados_nombre : certNombres[i],
              cert_asist_avalados_ano : certAnos[i],
              cert_asist_avalados_otrasinst : certOtras[i],
              cert_asist_avalados_horas : certHoras[i],
              //cert_asist_avalados_pdf : certPdfs[i],
            })
          }
          else {
            const preguntasFormGroup  = this.fb.group({
              cert_asist_avalados_nombre : certNombres[i],
              cert_asist_avalados_ano : certAnos[i],
              cert_asist_avalados_otrasinst : certOtras[i],
              cert_asist_avalados_horas : certHoras[i],
              //cert_asist_avalados_pdf : certPdfs[i],
             });
            this.preguntas.push(preguntasFormGroup);
          }
        }



        for (var i = 0; i < certAsistnoNombres.length; i++) {
          if (i==0) {
            this.certificadoForm.patchValue({
              cert_asist_no_avalados_nombre : certAsistnoNombres[i],
              cert_asist_no_avalados_ano : certAsistnoAnos[i],
              cert_asist_no_avalados_otrasinst : certAsistnoOtras[i],
              cert_asist_no_avalados_horas : certAsistnoHoras[i],
              //cert_asist_no_avalados_pdf : certAsistnoPdfs[i],
            })
          }
          else {
            const preguntasFormGroup1  = this.fb.group({
              cert_asist_no_avalados_nombre : certAsistnoNombres[i],
              cert_asist_no_avalados_ano : certAsistnoAnos[i],
              cert_asist_no_avalados_otrasinst : certAsistnoOtras[i],
              cert_asist_no_avalados_horas : certAsistnoHoras[i],
              //cert_asist_no_avalados_pdf : certAsistnoPdfs[i],
             });
            this.preguntas1.push(preguntasFormGroup1);
          }
        }
      }
    );
    this.getCertificadoporUsuario();
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

  gettodoslosCertificados(){
    this.certificadoService.getCertificados().subscribe(
      response => {
        if (response.status === 'success'){
          this.certificados = response.certificados;
          //console.log(this.certificados);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  getCertificadoporUsuario(){
    // sacar el id del post del la url
    this.route.params.subscribe(params => {
      const id = +params.id;

      // peticion ajax para sacar los datos del post
      this.certificadoService.getCertificado(this.identity.sub).subscribe(
        response => {
          if (response.status === 'success'){
            this.certificado = response.certificado;
            console.log(this.certificado);
          }
        },
        error => {
          console.log(error);
        }
      );

    });
  }


  getCertificadoUser(){
    this.certificadoService.getCertificado(this.identity.sub).subscribe(
      response => {
          this.certificado = response;
        if (response.status === 'success'){
          // Actualizar usuario en sesion


          if (response.certificados.cert_asist_avalados_nombre){
            this.certificado.cert_asist_avalados_nombre = response.certificados.cert_asist_avalados_nombre;
          }

          if (response.certificados.cert_asist_avalados_ano){
            this.certificado.cert_asist_avalados_ano = response.certificados.cert_asist_avalados_ano;
          }

          if (response.certificados.cert_asist_avalados_otrasinst){
            this.certificado.cert_asist_avalados_otrasinst = response.certificados.cert_asist_avalados_otrasinst;
          }

          if (response.certificados.cert_asist_avalados_horas){
            this.certificado.cert_asist_avalados_horas = response.certificados.cert_asist_avalados_horas;
          }
          if (response.certificados.cert_asist_no_avalados_nombre){
            this.certificado.cert_asist_no_avalados_nombre = response.certificados.cert_asist_no_avalados_nombre;
          }
          if (response.certificados.cert_asist_no_avalados_ano){
            this.certificado.cert_asist_no_avalados_ano = response.certificados.cert_asist_no_avalados_ano;
          }
          if (response.certificados.cert_asist_no_avalados_otrasinst){
            this.certificado.cert_asist_no_avalados_otrasinst = response.certificados.cert_asist_no_avalados_otrasinst;
          }
          if (response.certificados.cert_asist_no_avalados_horas){
            this.certificado.cert_asist_no_avalados_horas = response.certificados.cert_asist_no_avalados_horas;
          }
          if (response.certificados.cert_o_diploma_academico_nombre){
            this.certificado.cert_o_diploma_academico_nombre = response.certificados.cert_o_diploma_academico_nombre;
          }
          if (response.certificados.cert_o_diploma_academico_cargo){
            this.certificado.cert_o_diploma_academico_cargo = response.certificados.cert_o_diploma_academico_cargo;
          }
          if (response.certificados.cert_o_diploma_academico_tiempo){
            this.certificado.cert_o_diploma_academico_tiempo = response.certificados.cert_o_diploma_academico_tiempo;
          }
          if (response.certificados.cert_o_diploma_academico_otrasinst){
            this.certificado.cert_o_diploma_academico_otrasinst = response.certificados.cert_o_diploma_academico_otrasinst;
          }
          if (response.certificados.cert_o_diploma_asistencial_nombre){
            this.certificado.cert_o_diploma_asistencial_nombre = response.certificados.cert_o_diploma_asistencial_nombre;
          }
          if (response.certificados.cert_o_diploma_asistencial_cargo){
            this.certificado.cert_o_diploma_asistencial_cargo = response.certificados.cert_o_diploma_asistencial_cargo;
          }
          if (response.certificados.cert_o_diploma_asistencial_tiempo){
            this.certificado.cert_o_diploma_asistencial_tiempo = response.certificados.cert_o_diploma_asistencial_tiempo;
          }
          if (response.certificados.cert_o_diploma_asistencial_otrasinst){
            this.certificado.cert_o_diploma_asistencial_otrasinst = response.certificados.cert_o_diploma_asistencial_otrasinst;
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



  onSubmit(form){

    //console.log(this.certificadoForm.value,'valores enviados')

    this.certificadoService.update(this.token, this.certificadoForm.value, this.identity.sub).subscribe(
      response => {
        if (response && response.status){
          //console.log(response);
          this.status = 'success';
          this.certificado.cert_asist_avalados_pdf = response.filepdf;
          this.certificado.cert_asist_no_avalados_pdf = response.filepdf;
          this.certificado.cert_o_diploma_academico_pdf = response.filepdf;
          this.certificado.cert_o_diploma_asistencial_pdf = response.filepdf;

          // Actualizar usuario en sesion
          if (response.changes.cert_asist_avalados_nombre){
            this.certificado.cert_asist_avalados_nombre = response.changes.cert_asist_avalados_nombre;
          }

          if (response.changes.cert_asist_avalados_ano){
            this.certificado.cert_asist_avalados_ano = response.changes.cert_asist_avalados_ano;
          }

          if (response.changes.cert_asist_avalados_otrasinst){
            this.certificado.cert_asist_avalados_otrasinst = response.changes.cert_asist_avalados_otrasinst;
          }

          if (response.changes.cert_asist_avalados_horas){
            this.certificado.cert_asist_avalados_horas = response.changes.cert_asist_avalados_horas;
          }
          if (response.changes.cert_asist_no_avalados_nombre){
            this.certificado.cert_asist_no_avalados_nombre = response.changes.cert_asist_no_avalados_nombre;
          }
          if (response.changes.cert_asist_no_avalados_ano){
            this.certificado.cert_asist_no_avalados_ano = response.changes.cert_asist_no_avalados_ano;
          }
          if (response.changes.cert_asist_no_avalados_otrasinst){
            this.certificado.cert_asist_no_avalados_otrasinst = response.changes.cert_asist_no_avalados_otrasinst;
          }
          if (response.changes.cert_asist_no_avalados_horas){
            this.certificado.cert_asist_no_avalados_horas = response.changes.cert_asist_no_avalados_horas;
          }
          if (response.changes.cert_o_diploma_academico_nombre){
            this.certificado.cert_o_diploma_academico_nombre = response.changes.cert_o_diploma_academico_nombre;
          }
          if (response.changes.cert_o_diploma_academico_cargo){
            this.certificado.cert_o_diploma_academico_cargo = response.changes.cert_o_diploma_academico_cargo;
          }
          if (response.changes.cert_o_diploma_academico_tiempo){
            this.certificado.cert_o_diploma_academico_tiempo = response.changes.cert_o_diploma_academico_tiempo;
          }
          if (response.changes.cert_o_diploma_academico_otrasinst){
            this.certificado.cert_o_diploma_academico_otrasinst = response.changes.cert_o_diploma_academico_otrasinst;
          }
          if (response.changes.cert_o_diploma_asistencial_nombre){
            this.certificado.cert_o_diploma_asistencial_nombre = response.changes.cert_o_diploma_asistencial_nombre;
          }
          if (response.changes.cert_o_diploma_asistencial_cargo){
            this.certificado.cert_o_diploma_asistencial_cargo = response.changes.cert_o_diploma_asistencial_cargo;
          }
          if (response.changes.cert_o_diploma_asistencial_tiempo){
            this.certificado.cert_o_diploma_asistencial_tiempo = response.changes.cert_o_diploma_asistencial_tiempo;
          }
          if (response.changes.cert_o_diploma_asistencial_otrasinst){
            this.certificado.cert_o_diploma_asistencial_otrasinst = response.changes.cert_o_diploma_asistencial_otrasinst;
          }


          this.certificado = response.certificado;
          localStorage.setItem('identity', JSON.stringify(this.certificado.id));

        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
     //console.log(this.certificados);



    console.log(this.certificadoForm.value);

  }


  fileUpload(datos){
    const data = JSON.parse(datos.response);
    //const data = JSON.parse(JSON.stringify(datos.body));

    /*console.log(datos);
    console.log(JSON.parse(datos));
    console.log(JSON.stringify(datos));
    console.log(JSON.parse(JSON.stringify(datos.body)));*/

    this.certificado.cert_asist_avalados_pdf = data.filepdf;
    this.certificado.cert_asist_no_avalados_pdf = data.filepdf;
    this.certificado.cert_o_diploma_academico_pdf = data.filepdf;
    this.certificado.cert_o_diploma_asistencial_pdf = data.filepdf;

    switch (data.selector) {
      case 1:
        this.certificado.cert_asist_avalados_pdf = data.cert_asist_avalados_pdf;
        break;
      case 2:
        this.certificado.cert_asist_no_avalados_pdf = data.cert_asist_no_avalados_pdf;
        break;
      case 3:
        this.certificado.cert_o_diploma_academico_pdf = data.cert_o_diploma_academico_pdf;
        break;
      case 4:
        this.certificado.cert_o_diploma_asistencial_pdf = data.cert_o_diploma_asistencial_pdf;
        break;

    }
  }



  // preguntas dinamicas
  get cert_asist_avalados_nombre() { return this.certificadoForm.get('cert_asist_avalados_nombre'); }
  get cert_asist_avalados_ano() { return this.certificadoForm.get('cert_asist_avalados_ano'); }
  get cert_asist_avalados_otrasinst() { return this.certificadoForm.get('cert_asist_avalados_otrasinst'); }
  get cert_asist_avalados_horas() { return this.certificadoForm.get('cert_asist_avalados_horas'); }
  get cert_asist_no_avalados_nombre() { return this.certificadoForm.get('cert_asist_no_avalados_nombre'); }
  get cert_asist_no_avalados_ano() { return this.certificadoForm.get('cert_asist_no_avalados_ano'); }
  get cert_asist_no_avalados_otrasinst() { return this.certificadoForm.get('cert_asist_no_avalados_otrasinst'); }
  get cert_asist_no_avalados_horas() { return this.certificadoForm.get('cert_asist_no_avalados_horas'); }
  get cert_o_diploma_academico_nombre() { return this.certificadoForm.get('cert_o_diploma_academico_nombre'); }
  get cert_o_diploma_academico_cargo() { return this.certificadoForm.get('cert_o_diploma_academico_cargo'); }
  get cert_o_diploma_academico_tiempo() { return this.certificadoForm.get('cert_o_diploma_academico_tiempo'); }
  get cert_o_diploma_academico_otrasinst() { return this.certificadoForm.get('cert_o_diploma_academico_otrasinst'); }
  get cert_o_diploma_asistencial_nombre() { return this.certificadoForm.get('cert_o_diploma_asistencial_nombre'); }
  get cert_o_diploma_asistencial_cargo() { return this.certificadoForm.get('cert_o_diploma_asistencial_cargo'); }
  get cert_o_diploma_asistencial_tiempo() { return this.certificadoForm.get('cert_o_diploma_asistencial_tiempo'); }
  get cert_o_diploma_asistencial_otrasinst() { return this.certificadoForm.get('cert_o_diploma_asistencial_otrasinst'); }



  get preguntas(){
    return this.certificadoForm.get('preguntas') as FormArray;
  }
  get preguntas1(){
    return this.certificadoForm.get('preguntas1') as FormArray;
  }




  agregarPregunta(){
    const preguntasFormGroup  = this.fb.group({
      cert_asist_avalados_nombre: '',
      cert_asist_avalados_ano: '',
      cert_asist_avalados_otrasinst: '',
      cert_asist_avalados_horas: '',
    });
    this.preguntas.push(preguntasFormGroup);
  }
  agregarPregunta1(){
    const preguntasFormGroup1 = this.fb.group({
      cert_asist_no_avalados_nombre: '',
      cert_asist_no_avalados_ano: '',
      cert_asist_no_avalados_otrasinst: '',
      cert_asist_no_avalados_horas: '',
    });
    this.preguntas1.push(preguntasFormGroup1);
  }

  removerPregunta(index: number) {
    this.preguntas.removeAt(index);
  }
  removerPregunta1(index: number) {
    this.preguntas1.removeAt(index);
  }

  certificadoForm = this.fb.group({
    id: [1],
    cert_asist_avalados_nombre: [''],
      cert_asist_avalados_ano: [''],
      cert_asist_avalados_otrasinst: [''],
      cert_asist_avalados_horas: [''],
    cert_asist_no_avalados_nombre: [''],
      cert_asist_no_avalados_ano: [''],
      cert_asist_no_avalados_otrasinst: [''],
      cert_asist_no_avalados_horas: [''],
      cert_o_diploma_academico_nombre: [''],
      cert_o_diploma_academico_cargo: [''],
      cert_o_diploma_academico_tiempo: [''],
      cert_o_diploma_academico_otrasinst: [''],
      cert_o_diploma_asistencial_nombre: [''],
      cert_o_diploma_asistencial_cargo: [''],
      cert_o_diploma_asistencial_tiempo: [''],
      cert_o_diploma_asistencial_otrasinst: [''],
      cert_asist_avalados_pdf: [''],

      preguntas: this.fb.array([]),
      preguntas1: this.fb.array([]),
  });







}
