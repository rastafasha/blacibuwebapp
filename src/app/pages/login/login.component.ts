import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TipoRegistroService } from '../../services/tiporegistro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, TipoRegistroService, TranslateService]
})
export class LoginComponent implements OnInit{

  public pageTitle: string;
  public user: User;
  public status: string;
  public token;
  public identity;
  public tiporegistros;

  public activeLang = '';
  flag = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private translate: TranslateService,
    public tiporegistroService: TipoRegistroService,

    ) {



    this.user = new User(0, '', '', 'ROLE_USER', 1, 1, '', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', ''  );
      }

  ngOnInit(){
    // se ejecuta siempre y cierra sesion solo cuando le llega el parametro user por la url
    this.logout();
    this.getTipoRegistro();
    window.scrollTo(0, 0);
  }

  onSubmit(form){

   this.userService.signup(this.user).subscribe(
     response => {
        // token
        if (response.status != 'error'){
            this.status = 'success';
            this.token = response;
            //console.log(this.token);
           localStorage.setItem('token', this.token);

            // objeto usuario identificado
            this.userService.signup(this.user, true).subscribe(
              res => {
                 this.identity = res;

                 // persistir usuario
                 //console.log(this.identity);
                 console.log(res);

                 localStorage.setItem('identity', JSON.stringify(this.identity));

                 this.router.navigate(['/user/home']);
              },
              error => {
                 this.status = 'error';
                 localStorage.removeItem('token');
                 console.log(error);
              }
            );

        }else{
          this.status = 'error';
        }
     },
     error => {
       this.status = 'error';
       //console.log(error as any);
     }
   );


  }

  logout(){
    this.route.params.subscribe(params => {
      const logout = +params.sure;

      if (logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // redireccion a inio
        this.router.navigate(['/']);

      }
    });
  }
  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  getTipoRegistro(){
    this.tiporegistroService.getTipos().subscribe(
      response => {
        if (response.status === 'success'){
          this.tiporegistros = response.tiporegistros;
        }
      },
      error => {
        //console.log(error);
      }
    );
  }

}
