import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { TipoRegistroService } from '../../services/tiporegistro.service';
import { TranslateService } from '@ngx-translate/core';
import { TipoRegistro } from '../../models/tiporegistro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, TipoRegistroService, TranslateService]
})
export class HomeComponent implements OnInit {


  public identity;
  public token;
  public url;
  public activeLang = '';
  public tiporegistros;

  flag = false;

  constructor(
    private userService: UserService,
    private tiporegistroService: TipoRegistroService,
    private translate: TranslateService,
  ){
    this.loadUser();
    this.url = environment.baseUrl;
    this.identity = this.userService.getIdentity();
  }

  // tslint:disable-next-line: typedef
  ngOnInit(){
    this.flag = true;
    this.getTipoRegistro();
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

}
