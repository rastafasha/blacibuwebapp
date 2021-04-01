import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.modulo';
import { ComponentModule } from '../components/component.modulo';

import { PagesComponent } from './pages.component';


// paginas

import {
  CertificacionComponent,
  RecertificacionComponent,
  DashboardComponent,
  ReglamentosComponent,
  HomeComponent,
  PerfilComponent,
  PerfilRecertificacionComponent,
  PerfilesComponent
} from './index.paginas';


// pipes module
import { PipesModule } from '../pipes/pipes.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';

//traductor
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpHeaders, HttpClient} from '@angular/common/http';

import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        CertificacionComponent,
        RecertificacionComponent,
        ReglamentosComponent,
        HomeComponent,
        PerfilComponent,
        PerfilRecertificacionComponent,
        PerfilesComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        CertificacionComponent,
        RecertificacionComponent,
        ReglamentosComponent,
        HomeComponent,
        PerfilComponent,
        PerfilRecertificacionComponent,
        PerfilesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ComponentModule,
        PipesModule,
        CarouselModule,
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
    ]
})

export class PagesModule {}
