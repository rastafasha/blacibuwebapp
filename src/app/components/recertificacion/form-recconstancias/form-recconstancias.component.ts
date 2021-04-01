import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

import {User} from '../../../models/users';
import { UserService } from '../../../services/user.service';
import {Constancia} from '../../../models/constancia';
import { ConstanciaService } from '../../../services/constancia.service';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-form-recconstancias',
  templateUrl: './form-recconstancias.component.html',
  styleUrls: ['./form-recconstancias.component.css'],
  providers: [UserService, ConstanciaService, TranslateService ]
})
export class FormRecconstanciasComponent implements OnInit, DoCheck {

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })


  public user: User;
  public recertconstancias: Constancia;
  public status;
  public identity;
  public token;
  public url;

  public selectedDocument=0;

  sub: any;
  recertconstancia: any;

  public activeLang = '';
  flag = false;

  public afuConfig1 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'recertconstancia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 1,
      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
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
      sizeLimit: 'Límite de tamaño 2 Megas',
    }
  };

  public afuConfig2 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'recertconstancia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 2,
      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
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
      sizeLimit: 'Límite de tamaño 2 Megas',
    }
  };

  public afuConfig3 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'recertconstancia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 3,
      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
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
      sizeLimit: 'Límite de tamaño 2 Megas',
    }
  };

  public afuConfig4 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'recertconstancia/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 4,
      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
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
      sizeLimit: 'Límite de tamaño 2 Megas',
    }
  };

  constructor(
    private userService: UserService,
    private constanciaService: ConstanciaService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder
    ) {
      this.loadUser();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();

      //this.recertconstancia = new Constancia(1, this.identity.sub, this.identity.tiporegistro_id, 1, '',1,'',1,'','',1,'',1);


    // rellenar objeto usuario
    this.recertconstancia = new Constancia(
      this.identity.id,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.const_miembro_activo_pdf,
      this.identity.const_miembro_activo_status_id,
      this.identity.curriculum_pdf,
      this.identity.curriculum_status_id,
      this.identity.const_practica_privada_pdf,
      this.identity.const_anos,
      this.identity.const_practica_privada_status_id,
      this.identity.distinciones_premios_pdf,
      this.identity.distinciones_premios_status_id,
    );





  }




  ngOnInit(): void {
    this.flag = true;
    this.loadUser();
    this.gettodoslosCertificados();
    window.scrollTo(0, 0);

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
    this.constanciaService.getRecertconstancias().subscribe(
      response => {
        if (response.status === 'success'){
          this.recertconstancias = response.recertconstancias[0];
          console.log('Docccc',this.recertconstancias)
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  onSubmit(form){



    this.constanciaService.update(this.token, this.recertconstancias, this.recertconstancias.id).subscribe(
      response => {
        if (response.status == 'success'){
          this.status = 'success';
          // redirigir a la pagina del post
          //this.router.navigate(['/entrada', this.documento.id]);
          console.log('actualizado!')
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';

      }
    );


     console.log(this.constanciaForm.value);



  }


  documentoUpload(datos){
    // const data = JSON.parse(datos.response);
    const data = JSON.parse(JSON.stringify(datos.body));

    console.log(datos);
    console.log(JSON.parse(datos));
    console.log(JSON.stringify(datos));
    console.log(JSON.parse(JSON.stringify(datos.body)));

    switch (data.selector) {
      case 1:
        this.recertconstancias.const_miembro_activo_pdf = data.const_miembro_activo_pdf;
        break;
      case 2:
        this.recertconstancias.curriculum_pdf = data.curriculum_pdf;
        break;
      case 3:
        this.recertconstancias.const_practica_privada_pdf = data.const_practica_privada_pdf;
        break;
      case 4:
        this.recertconstancias.distinciones_premios_pdf = data.distinciones_premios_pdf;
        break;
    }
  }

  constanciaForm = this.fb.group({

    id:[''],
    const_miembro_activo_pdf:[''],
    curriculum_pdf:[''],
    const_practica_privada_pdf:[''],
    distinciones_premios_pdf:[''],
    const_anos:[''],

});



}
