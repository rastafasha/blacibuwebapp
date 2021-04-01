import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/users';
import { DocumentoService } from '../../../services/documento.service';
import { Documento } from '../../../models/documento';

import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-documentos',
  templateUrl: './form-documentos.component.html',
  styleUrls: ['./form-documentos.component.css']
})
export class FormDocumentosComponent implements OnInit, DoCheck {

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })


  public user: User;
  public documentos: Documento;

  public status;
  public identity;
  public token;
  public url;

  public activeLang = '';
  flag = false;

  sub: any;
  //user: any;
  documento: any;



  public selectedDocument=0;

  public afuConfig1 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'documento/upload',
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
      url: environment.baseUrl + 'documento/upload',
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
      url: environment.baseUrl + 'documento/upload',
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
      url: environment.baseUrl + 'documento/upload',
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

  public afuConfig5 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'documento/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 5,
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

  public afuConfig6 = {
    multiple: true,
    formatsAllowed: '.pdf',
    method: 'POST',
    maxSize: '2',
    uploadAPI:  {
      url: environment.baseUrl + 'documento/upload',
      headers: {
        Authorization: this.userService.getToken(),
        document: 6,
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
    private documentoService: DocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder
    ) {
      this.loadUser();
      this.gettodoslosDocumentos();
      this.url = environment.baseUrl;
      this.identity = this.userService.getIdentity();
      this.token = this.userService.getToken();
      this.documento = [];


    // rellenar objeto usuario
    this.documentos = new Documento(
      this.identity.sub,
      this.identity.user_id,
      this.identity.tiporegistro_id,
      this.identity.user_post_id,
      this.identity.pdf_titulo_odontologo,
      this.identity.pdf_titulo_odontologo_status_id,
      this.identity.pdf_matricula_odontologo,
      this.identity.pdf_matricula_odontologo_status_id,
      this.identity.pdf_titulo_espec_bucomax,
      this.identity.pdf_titulo_espec_bucomax_status_id,
      this.identity.pdf_matricula_bucomax,
      this.identity.pdf_matricula_bucomax_status_id,
      this.identity.pdf_residencia_especializacion,
      this.identity.pdf_residencia_especializacion_status_id,
      this.identity.pdf_constancia_miembro,
      this.identity.pdf_constancia_miembro_status_id,
    );

  }




  ngOnInit(): void {
    // this.getDocumentoUser();
    this.gettodoslosDocumentos();
    this.getDocumentoporUsuario();
    this.flag = true;
    window.scrollTo(0, 0);
    this.loadUser();
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

  gettodoslosDocumentos(){
    this.documentoService.getDocumentos().subscribe(
      response => {
        if (response.status === 'success'){
          this.documentos = response.documentos[0];
          //console.log('Docccc',this.documentos)
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getDocumentoporUsuario(){
    // sacar el id del post del la url
    this.route.params.subscribe(params => {
      const id = +params.id;

      // peticion ajax para sacar los datos del post
      this.documentoService.getDocumento(this.identity.sub).subscribe(
        response => {
          if (response.status === 'success'){
            this.documento = response.documento;
            //console.log(this.userpost);
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





  onSubmit(form){
    this.documentoService.update(this.token, this.documentosForm.value, this.identity.sub).subscribe(
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



    console.log(this.documentosForm.value);
  }


  documentoUpload(datos){

     //const data = JSON.parse(datos.response);
    const data = JSON.parse(JSON.stringify(datos.body));

    console.log(datos);
    console.log(JSON.parse(datos));
    console.log(JSON.stringify(datos));
    console.log(JSON.parse(JSON.stringify(datos.body)));

    switch (data.selector) {
      case 1:
        this.documento.pdf_titulo_odontologo = data.pdf_titulo_odontologo;
        break;
      case 2:
        this.documento.pdf_matricula_odontologo = data.pdf_matricula_odontologo;
        break;
      case 3:
        this.documento.pdf_titulo_espec_bucomax = data.pdf_titulo_espec_bucomax;
        break;
      case 4:
        this.documento.pdf_matricula_bucomax = data.pdf_matricula_bucomax;
        break;
      case 5:
        this.documento.pdf_residencia_especializacion = data.pdf_residencia_especializacion;
        break;
      case 6:
        this.documento.pdf_constancia_miembro = data.pdf_constancia_miembro;
        break;
    }
  }

  documentosForm = this.fb.group({

    id:[''],
    pdf_titulo_odontologo:[''],
    pdf_matricula_odontologo:[''],
    pdf_titulo_espec_bucomax:[''],
    pdf_matricula_bucomax:[''],
    pdf_residencia_especializacion:[''],
    pdf_constancia_miembro:[''],

});

}
