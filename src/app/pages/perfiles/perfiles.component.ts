import { Component, OnInit, DoCheck } from '@angular/core';
import { environment } from '../../../environments/environment';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TipoRegistro } from '../../models/tiporegistro';
import { TipoRegistroService } from '../../services/tiporegistro.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css'],
  providers: [UserService, TipoRegistroService]
})
export class PerfilesComponent implements OnInit {

  public identity;
  public token;
  public url;
  public categories;
  public activeLang = '';

  public user: User;
  public status: string;
  public tiporegistro: TipoRegistro;
  public posts: any;

  flag = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private tiporegistroService: TipoRegistroService,
  ){
    this.loadUser();
    this.url = environment.baseUrl;
    this.identity = this.userService.getIdentity();
  }

  // tslint:disable-next-line: typedef
  ngOnInit(){
    this.flag = true;
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

}
