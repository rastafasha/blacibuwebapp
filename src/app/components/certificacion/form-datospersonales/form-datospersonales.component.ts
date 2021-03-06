import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';


import {User} from '../../../models/users';
import { UserService } from '../../../services/user.service';
import {Pago} from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-datospersonales',
  templateUrl: './form-datospersonales.component.html',
  styleUrls: ['./form-datospersonales.component.css'],
  providers: [UserService, PagoService, TranslateService,]
})
export class FormDatospersonalesComponent implements OnInit, DoCheck {



  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })

  public pagos: Pago;
  public users: User;

  public status;
  public identity;
  public token;
  public url;
  public storage=environment.storage;

  public activeLang = '';
  flag = false;

  pago: any;
  user: any;
  sub: any;

  imagePath: string;


  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'user/upload',
      headers: {
        Authorization: this.userService.getToken(),
       // content-type:'application/x-www-form-urlencoded'

      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
    selectFileBtn: 'Select Files',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar imagen',
      resetBtn: 'Resetear',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastre y suelte aquí',
      attachPinBtn: 'Seleccionar una imagen',
      afterUploadMsg_success: 'Se cargó correctamente el archivo !',
      afterUploadMsg_error: 'Se produjo un error al subir el archivo!',
      sizeLimit: 'Límite de tamaño 2 Megas'
    }
};

  public pagoConfig = {
    multiple: false,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'pago/upload',
      headers: {
        Authorization: this.userService.getToken(),
      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
    selectFileBtn: 'Seleccionar Archivo',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo pdf',
      resetBtn: 'Resetear',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastre y suelte aquí',
      attachPinBtn: 'Seleccionar un archivo',
      afterUploadMsg_success: 'Se cargó correctamente el archivo !',
      afterUploadMsg_error: 'Se produjo un error al subir el archivo!',
      sizeLimit: 'Límite de tamaño 2 Megas'
    }
  };


  constructor(
    private userService: UserService,
    private pagoService: PagoService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,

    ) {
      this.loadUser();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();

    //this.user = new User(1, '', '', 'ROLE_USER', this.identity.tiporegistro_id, 1,'', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', '',   );
    //this.pago = new Pago(1, this.identity.sub, this.identity.tiporegistro_id,1,'','', '','', 1 );

    // rellenar objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.email,
      this.identity.password,
      '',
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.idioma,
      this.identity.pais,
      this.identity.name,
      this.identity.surname,
      this.identity.status_id,
      this.identity.pasaporte,
      this.identity.fecha_nac,
      this.identity.edad,
      this.identity.lugar_nac,
      this.identity.nacionalidad,
      this.identity.telefono,
      this.identity.direccion,
      this.identity.cod_postal,
      this.identity.pais_ejerce,
      this.identity.red_social,
      this.identity.user_red,
      this.identity.image
    );

    // rellenar objeto usuario
    this.pago = new Pago(
      this.identity.id,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.transf_banco,
      this.identity.transf_fecha,
      this.identity.transf_numero,
      this.identity.transf_pdf,
      this.identity.transf_pdf_status_id,
    );
  }




  ngOnInit(): void {
    this.flag = true;
    this.loadUser();
    this.gettodoslosPagos();
    //this.getPagodeUser();
    window.scrollTo(0, 0);
    //console.log(this.identity);
    this.getUserdetail(this.identity.sub);

    this.userService.getUser(this.identity.sub).subscribe(
      res => {
        this.userEditForm.patchValue({
          id: res.id,
          name: res.user.name,
          surname: res.user.surname,
          pasaporte: res.user.pasaporte,
          fecha_nac: res.user.fecha_nac,
          edad: res.user.edad,
          email: res.user.email,
          direccion: res.user.direccion,
          lugar_nac: res.user.lugar_nac,
          nacionalidad: res.user.nacionalidad,
          telefono: res.user.telefono,
          cod_postal: res.user.cod_postal,
          pais_ejerce: res.user.pais_ejerce,
          pais: res.user.pais,
        });

        // preguntas dinamicas
        let redesSociales = res.user.red_social.split([';']);
        let userRedes = res.user.user_red.split([';']);

        for (var i = 0; i < redesSociales.length; i++) {
          if (i==0) {
            this.userEditForm.patchValue({
              red_social : redesSociales[i],
              user_red : userRedes[i],
            })
          }
          else {
            const preguntasFormGroup  = this.fb.group({
                red_social: redesSociales[i],
                user_red: userRedes[i],
             });
            this.preguntas.push(preguntasFormGroup);
          }
        }
        //
        this.imagePath = res.user.image;
      }
    );

    this.getPagodeUser();

    this.userService.getUser(this.identity.sub).subscribe(
      res => {
        this.userEditForm.patchValue({
          id: res.id,
          transf_banco: res.user.pagos[0].transf_banco,
          transf_fecha: res.user.pagos[0].transf_fecha,
          transf_numero: res.user.pagos[0].transf_numero,
        });
        this.imagePath = res.user.pagos[0].transf_pdf;
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

  gettodoslosPagos(){
    this.pagoService.getPagos().subscribe(
      response => {
        if (response.status === 'success'){
          this.pagos = response.pagos;
          //console.log(this.pagos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPagodeUser(){
      this.pagoService.getPago(this.identity.sub).subscribe(
        response => {
            this.pago = response;
          if (response.status === 'success'){
            // Actualizar usuario en sesion
            if (response.pagos[0].transf_banco){
              this.pago.transf_banco = response.pagos[0].transf_banco;
            }

            if (response.pagos[0].transf_fecha){
              this.pago.transf_fecha = response.pagos[0].transf_fecha;
            }

            if (response.pagos[0].transf_numero){
              this.pago.transf_numero = response.pagos[0].transf_numero;
            }

            if (response.pagos[0].transf_pdf){
              this.pago.transf_pdf = response.pagos[0].transf_pdf;
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
   // console.log(this.userEditForm.value,'valores enviados')
    this.userService.update(this.token, this.userEditForm.value, this.identity.sub).subscribe(
      response => {
        //console.log(response.user);
        if (response && response.status){
          //console.log(response);
          this.status = 'success';

          // Actualizar usuario en sesion
          if (response.changes.name){
            this.user.name = response.changes.name;
          }
          if (response.changes.surname){
            this.user.surname = response.changes.surname;
          }
          if (response.changes.email){
            this.user.email = response.changes.email;
          }
          if (response.changes.fecha_nac){
            this.user.fecha_nac = response.changes.fecha_nac;
          }
          if (response.changes.pasaporte){
            this.user.pasaporte = response.changes.pasaporte;
          }
          if (response.changes.edad){
            this.user.edad = response.changes.edad;
          }
          if (response.changes.lugar_nac){
            this.user.lugar_nac = response.changes.lugar_nac;
          }
          if (response.changes.nacionalidad){
            this.user.nacionalidad = response.changes.nacionalidad;
          }
          if (response.changes.telefono){
            this.user.telefono = response.changes.telefono;
          }
          if (response.changes.direccion){
            this.user.direccion = response.changes.direccion;
          }
          if (response.changes.cod_postal){
            this.user.cod_postal = response.changes.cod_postal;
          }
          if (response.changes.pais_ejerce){
            this.user.pais_ejerce = response.changes.pais_ejerce;
          }
          if (response.changes.red_social){
            this.user.red_social = response.changes.red_social;
          }
          if (response.changes.user_red){
            this.user.user_red = response.changes.user_red;
          }
          if (response.changes.image){
            this.user.image = response.changes.image;
          }


          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }
        else{
          this.router.navigate(['/documentos']);
          alert('Información Actualizada');
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
        alert('error');
      }
    );

    this.pagoService.update(this.token, this.pago, this.identity.sub).subscribe(
      response => {
          if (response.status === 'success')
            this.pago.transf_pdf = response.filepdf;

          /*this.identity = response.pago;
          localStorage.setItem('identity', JSON.stringify(this.pago.id));*/
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

     /*if (!this.userEditForm.valid ) {
      alert('Alguna regla de validación no se está cumpliendo');
      console.log(<any>Error);
      return;
    }*/


    console.log(this.userEditForm.value);

  }


  avatarUpload(datos){
    //console.log(datos,'estos son los datos devueltos');


     const data = JSON.parse(datos.response);


//    const data = JSON.parse(JSON.stringify(datos.body));//este es el error
    //console.log(this.storage+'users/'+data.image)

    /* aca comente los consolelog
    console.log(datos);
    console.log(JSON.parse(datos));
    console.log(JSON.stringify(datos));
    console.log(JSON.parse(JSON.stringify(datos.body)));

    this.pagos.transf_pdf = data.transf_pdf;// este va en una funcion distinta para que cuando entre el pdf no lo pise con un null o inversamente
    */
   this.user.image = data.image;//almaceno el nombre de la imagen
  }
  avatarUpload2(datos){
     const data = JSON.parse(datos.response);//la respuesta de la funcion

   // console.log(this.storage+'pago/'+data.transf_pdf)


    this.pago.transf_pdf = data.filepdf;//almaceno el nombre del pdf
   // console.log(this.storage+'pago/'+this.pagos.transf_pdf)
  }

// preguntas dinamicas


get name() { return this.userEditForm.get('name'); }
  get surname() { return this.userEditForm.get('surname'); }
  get pasaporte() { return this.userEditForm.get('pasaporte'); }
  get fecha_nac() { return this.userEditForm.get('fecha_nac'); }
  get edad() { return this.userEditForm.get('edad'); }
  get nacionalidad() { return this.userEditForm.get('nacionalidad'); }
  get lugar_nac() { return this.userEditForm.get('lugar_nac'); }
  get telefono() { return this.userEditForm.get('telefono'); }
  get direccion() { return this.userEditForm.get('direccion'); }
  get cod_postal() { return this.userEditForm.get('cod_postal'); }
  get transf_banco() { return this.userEditForm.get('transf_banco'); }
  get transf_fecha() { return this.userEditForm.get('transf_fecha'); }
  get transf_numero() { return this.userEditForm.get('transf_numero'); }
  get red_social() { return this.userEditForm.get('red_social'); }
  get user_red() { return this.userEditForm.get('user_red'); }


get preguntas(){
  return this.userEditForm.get('preguntas') as FormArray;
}


agregarPregunta(){
  const preguntasFormGroup  = this.fb.group({
    red_social: '',
    user_red: '',
  });
  this.preguntas.push(preguntasFormGroup);
}

removerPregunta(index: number) {
  this.preguntas.removeAt(index);
}


userEditForm = this.fb.group({
  id: [1],
  name: [''],
  surname: [''],
  pasaporte: [''],
  fecha_nac: [''],
  edad: [''],
  lugar_nac: [''],
  nacionalidad: [''],
  telefono: [''],
  email: [''],
  direccion: [''],
  cod_postal: [''],
  pais_ejerce: [''],
  image: [''],
  red_social: [''],
  user_red: [''],
  transf_banco: [''],
  transf_fecha: [''],
  transf_numero: [''],
  transf_pdf: [''],

  preguntas: this.fb.array([]),

});



}
