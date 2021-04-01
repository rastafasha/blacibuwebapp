import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users';
import { environment } from '../../../environments/environment';


import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reglamentos',
  templateUrl: './reglamentos.component.html',
  styleUrls: ['./reglamentos.component.css'],
  providers: [UserService]
})
export class ReglamentosComponent implements OnInit, DoCheck {

  public identity;
  public token;
  public url;
  users: User;
  public certificados: Array<User>;
  public activeLang = '';
  flag = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private translate: TranslateService
  ){
    this.loadUser();
    this.url = environment.baseUrl;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {

    this.getTiporegistro();
    //console.log(this.identity);
    this.flag = true;
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



  getTiporegistro(){
    this.certificados = this.identity.tipo_registro;
    //console.log(this.certificados);
  }


}
