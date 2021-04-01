import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/users';

import { TipoRegistro } from '../../models/tiporegistro';
import { TipoRegistroService } from '../../services/tiporegistro.service';


import { UserPost } from '../../models/userpost';
import { UserPostService } from '../../services/userpost.service';

import { Estado } from '../../models/estado';
import { EstadoService } from '../../services/estado.service';
import { Reccertificado } from '../../models/rec-certificado';

import { Observable, combineLatest, of } from 'rxjs';

@Component({
  selector: 'app-perfil-recertificacion',
  templateUrl: './perfil-recertificacion.component.html',
  styleUrls: ['./perfil-recertificacion.component.css'],
  providers: [
    UserService,
    TipoRegistroService,
    TranslateService,
    EstadoService,
    UserPostService
  ]
})
export class PerfilRecertificacionComponent implements OnInit, DoCheck {



  // colores iconos dinamicos
  color = [
    {
      Content: {
        level: 'green'
      }
    },
    {
      Content: {
        level: 'blue'
      }
    },
    {
      Content: {
        level: 'orange'
      }
    },
    {
      Content: {
        level: 'red'
      }
    }
  ];

  activeSlideIndex = 0;



  tiporegistro: TipoRegistro;

  public recertcertificados: Reccertificado;

  public identity;
  public token;
  public url;
  public status: string;
  public storage=environment.storage;

  public activeLang = '';
  flag = false;

  user: User;
  users:any;

  public userposts: Array<UserPost[]>;
  public userpost: any;

  public isEdit: true;
  public estados;




  constructor(
    private userService: UserService,
    private tiporegistroService: TipoRegistroService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private userpostService: UserPostService,
    private estadoService: EstadoService,

  ){
    this.loadUser();
    this.isEdit = true;
    this.url = environment.baseUrl;
    this.identity = this.userService.getIdentity();
    this.userpost = new UserPost(1, 1, 1, 'ROLE_USER', '', '', 1, '', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', ''  );

  }

  // tslint:disable-next-line: typedef
  ngOnInit(){
    // console.log('Webapp cargada correctamente');

    this.getPost();
    this.getUserdetail(this.identity.sub);
    this.getEstados();
    //console.log(this.identity);
    this.flag = true;
    window.scrollTo(0, 0);
    this.getEstados();


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
          //console.log(this.user);
        }
      }
    );

  }




  getPost(){
    // sacar el id del post del la url
    this.route.params.subscribe(params => {
      const id = +params.id;

      // peticion ajax para sacar los datos del post
      this.userpostService.getPost(this.identity.sub).subscribe(
        response => {
          if (response.status === 'success'){
            this.userpost = response.userpost;
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

  getEstados(){
    this.estadoService.getEstados().subscribe(
      response => {
        if (response.status === 'success'){
          this.estados = response.estados;
          //console.log(this.estados);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  onSubmit(form){
    this.userService.update(this.token, this.user, this.identity.sub).subscribe(
      response => {
        if (response.status == 'success'){
          this.status = 'success';
          // redirigir a la pagina del post
          //this.router.navigate(['admin/editar-usuario/', this.userpost.id, this.userpost.tiporegistro_id]);
          alert('Usuario editado con exito!');
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';

      }
    );
  }




}
