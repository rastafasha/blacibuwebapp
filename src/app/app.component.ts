import { Component, OnInit, DoCheck } from '@angular/core';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';
import { TipoRegistroService } from './services/tiporegistro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, TipoRegistroService]
})
export class AppComponent {
  title = 'blacibuWebApp';
  public identity;
  public identityAdmin;
  public token;
  public url;
  public tiporegistros;


  constructor(
    private userService: UserService,
    private tiporegistroService: TipoRegistroService
    ) {
    this.loadUser();
    this.url = environment.baseUrl;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    this.getTipoRegistro();
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


  // tslint:disable-next-line: typedef
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
