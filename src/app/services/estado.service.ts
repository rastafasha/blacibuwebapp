import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estado} from '../models/estado';
import { environment } from '../../environments/environment';
import { Params } from '@angular/router';

@Injectable()
export class EstadoService{

  public serverUrl: string;
  public identityAdmin;
  public token;

   constructor(
     // tslint:disable-next-line: variable-name
     private _http: HttpClient
   ){
      this.serverUrl = environment.baseUrl;
    }

    create(token, estados): Observable<any>{
      const json = JSON.stringify(estados);
      const params = 'json=' + json;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

      return this._http.put(this.serverUrl + 'estado', params, {headers});
    }

    getEstados(): Observable<any>{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.serverUrl + 'estado', {headers});

    }

    getEstado(id): Observable<any>{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.serverUrl + 'estado/' + id, {headers});

    }

    update(token, estado, id): Observable<any>{
      // limpiar campo content  pasa htmlentity a utf8
      //pago.content = environment.htmlEntities(pago.content);

      const json = JSON.stringify(estado);
      const params = 'json=' + json;

      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

      return this._http.put(this.serverUrl + 'estado/update/' + id, params, {headers});
    }




    getUserPostbyEstado(id): Observable<any>{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.serverUrl + 'userpost/estadouser/' + id, {headers});

    }



  }

