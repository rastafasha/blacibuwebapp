import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/users';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [
    UserService, TranslateService
  ]
})
export class HeaderComponent implements OnInit {

  public identity;
  public token;
  public url;
  public categories;
  public storage=environment.storage;

  users: User;

  public activeLang = 'es';
  flag = false;

  es = true;
  pt = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private translate: TranslateService
  ){
    this.loadUser();
    this.url = environment.baseUrl;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit(){
    this.flag = true;
    this.activeLang = this.identity.idioma;

  }

  ngDoCheck(){
    this.loadUser();
  }


  loadUser(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }


  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    //this.identity.idioma = lang;
    this.translate.use(lang);
    this.flag = !this.flag;

  }



}
