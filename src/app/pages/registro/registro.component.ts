import { Component, OnInit } from '@angular/core';
import {User} from '../../models/users';
import { UserService } from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TipoRegistroService } from '../../services/tiporegistro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UserService, TipoRegistroService, TranslateService]
})
export class RegistroComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public identity;
  public tiporegistros;

  public activeLang = 'es';
  flag = false;



  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
     private translate: TranslateService,
     public tiporegistroService: TipoRegistroService
     ) {
    this.pageTitle = 'Register';
    this.translate.setDefaultLang(this.activeLang);
    this.user = new User(1, '', '', 'ROLE_USER', 1, 1, '', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', '',  );

  }

  ngOnInit(): void {
    this.flag = true;
    this.getTipoRegistro();
    window.scrollTo(0, 0);
  }

  onSubmit(form){

    this.userService.register(this.user).subscribe(
      response => {

        if (response.status == 'success'){
          this.status =  response.status;
          form.reset();

          this.router.navigate(['/login']);

        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log( error as any);
      }
    );

  }


  getTipoRegistro(){
    this.tiporegistroService.getTipos().subscribe(
      response => {
        if (response.status === 'success'){
          this.tiporegistros = response.tiporegistros;
          //console.log(this.tiporegistros);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    //this.identity.idioma = lang;
    this.translate.use(lang);
    this.flag = !this.flag;

  }

}
