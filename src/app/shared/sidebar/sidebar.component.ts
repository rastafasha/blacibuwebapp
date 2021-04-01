import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService,  TranslateService]
})
export class SidebarComponent implements OnInit, DoCheck {

  public identity;
  public identityAdmin;
  public token;
  public url;
  public categories;
  public activeLang = '';

  flag = false;

  constructor(
    private userService: UserService,
    private translate: TranslateService
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
