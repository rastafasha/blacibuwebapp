import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { routing, appRoutingProviders } from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpHeaders, HttpClient} from '@angular/common/http';



//servicios
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { PagoService } from './services/pago.service';
import { CertificadoService } from './services/certificado.service';
import { ConferenciaService } from './services/conferencia.service';
import { DocumentoService } from './services/documento.service';
import { TipoRegistroService } from './services/tiporegistro.service';
import { MiembroService } from './services/miembro.service';
import {ConstanciaService} from './services/constancia.service';
import {ReccertificadoService} from './services/rec-certificado.service';
import {RecConferenciaService} from './services/rec-conferencia.service';

// Rutas
import {APP_ROUTES} from './app.routes';


//traductor
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';

//shared
import { SharedModule } from './shared/shared.modulo';

import { PagesModule } from './pages/pages.modulo';

//pagenotfound
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// pages
import {
  LoginComponent,
  RegistroComponent,
} from './pages/index.paginas';

import { ComponentModule } from './components/component.modulo';
import { UserPostService } from './services/userpost.service';
import { EstadoService } from './services/estado.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule,
    ComponentModule,
    APP_ROUTES,
    routing,
    AngularFileUploaderModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService,
    PagoService,
    DocumentoService,
    CertificadoService,
    ConferenciaService,
    TipoRegistroService,
    MiembroService,
    ConstanciaService,
    ReccertificadoService,
    RecConferenciaService,
    UserPostService,
    EstadoService
  ],
  exports:[
    LoginComponent,
    RegistroComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
