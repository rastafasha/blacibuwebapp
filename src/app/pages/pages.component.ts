import { Component, OnInit, Input } from '@angular/core';


import { UserService } from '../services/user.service';
import { PagoService } from '../services/pago.service';
import { DocumentoService } from '../services/documento.service';
import { EstadoService } from '../services/estado.service';
import { ConferenciaService } from '../services/conferencia.service';
import { ConstanciaService } from '../services/constancia.service';
import { ReccertificadoService } from '../services/rec-certificado.service';
import { RecConferenciaService } from '../services/rec-conferencia.service';
import { CertificadoService } from '../services/certificado.service';
import { MiembroService } from '../services/miembro.service';
import {UserPostService} from '../services/userpost.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  providers: [
    UserService,
    UserPostService,
    PagoService,
    DocumentoService,
    EstadoService,
    ConferenciaService,
    ConstanciaService,
    ReccertificadoService,
    RecConferenciaService,
  ]
})
export class PagesComponent implements OnInit {

  public identity;
  public identityAdmin;
  public token;
  public url;

  @Input() pagos;
  @Input() documentos;
  @Input() estado;
  @Input() conferencias;
  @Input() certificados;
  @Input() recconferencias;
  @Input() recertificados;
  @Input() miembros;
  @Input() recertconferencias;
  @Input() recertconstancias;

  public activeLang = 'es';
  flag = false;

  es = true;
  pt = false;

  constructor(
    // certificado
    private certificadoService: CertificadoService,
    private conferenciaService: ConferenciaService,
    private documentoService: DocumentoService,
    private estadosService: EstadoService,
    // recerticiado
    private miembroService: MiembroService,
    private reccertificadoService: ReccertificadoService,
    private reconferenciaService: RecConferenciaService,
    private recconstanciaService: ConstanciaService,
    //ambos
    private userService: UserService,
    private pagoService: PagoService,
  ){
    this.loadUser();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(){
    this.flag = true;
    this.activeLang = this.identity.idioma;
    this.gettodosEstados();
    this.gettodoslosPagos();
    this.gettodoslosDocumentos();
    this.gettodoslosCertificados();
    this.gettodoslosConferencias();
    this.gettodosMiembros();
    this.gettodoslosRecertificados();
    this.gettodoslosReconferencias();

  }

  ngDoCheck(){
    this.loadUser();
  }


  loadUser(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }




  gettodoslosPagos(){
    this.pagoService.getPagos().subscribe(
      response => {
        if (response.status === 'success'){
          this.pagos = response.pagos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  gettodoslosDocumentos(){
    this.documentoService.getDocumentos().subscribe(
      response => {
        if (response.status === 'success'){
          this.documentos = response.documentos;
          //console.log(this.documentos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  gettodoslosCertificados(){
    this.certificadoService.getCertificados().subscribe(
      response => {
        if (response.status === 'success'){
          this.certificados = response.certificados;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  gettodoslosConferencias(){
    this.conferenciaService.getConferencias().subscribe(
      response => {
        if (response.status === 'success'){
          this.conferencias = response.conferencias;
          //console.log(this.conferencias)
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  gettodosEstados(){
    this.estadosService.getEstados().subscribe(
      response => {
        if (response.status === 'success'){
          this.estado = response.estado;
          //console.log(this.conferencias)
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  gettodosMiembros(){
    this.miembroService.getMiembros().subscribe(
      response => {
        if (response.status === 'success'){
          this.miembros = response.miembros;
          //console.log(this.conferencias)
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  gettodoslosRecertificados(){
    this.reccertificadoService.getReCertificados().subscribe(
      response => {
        if (response.status === 'success'){
          this.recertificados = response.recertificados;
          //console.log(this.recertificados);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  gettodoslosReconferencias(){
    this.reconferenciaService.getReConferencias().subscribe(
      response => {
        if (response.status === 'success'){
          this.recertconferencias = response.recertconferencias;
          //console.log(this.recertconferencias)
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  gettodoslosReconstancias(){
    this.recconstanciaService.getRecertconstancias().subscribe(
      response => {
        if (response.status === 'success'){
          this.recertconstancias = response.recertconstancias;
          //console.log(this.recertconstancias)
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
