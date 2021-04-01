import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

//certificacion
import { FormDatospersonalesComponent } from './certificacion/form-datospersonales/form-datospersonales.component';
import { FormCertificadosComponent } from './certificacion/form-certificados/form-certificados.component';
import { FormConferenciasComponent } from './certificacion/form-conferencias/form-conferencias.component';
import { FormDocumentosComponent } from './certificacion/form-documentos/form-documentos.component';

// recertificacion
import { FormRecdatospersonalesComponent } from './recertificacion/form-recdatospersonales/form-recdatospersonales.component';
import { FormRecconstanciasComponent } from './recertificacion/form-recconstancias/form-recconstancias.component';
import { FormReccertificadosComponent } from './recertificacion/form-reccertificados/form-reccertificados.component';
import { FormRecconferenciasComponent } from './recertificacion/form-recconferencias/form-recconferencias.component';


//traductor
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule, HttpHeaders, HttpClient} from '@angular/common/http';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      PipesModule,
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
    declarations: [
      FormDatospersonalesComponent,
      FormCertificadosComponent,
      FormConferenciasComponent,
      FormDocumentosComponent,
      FormRecdatospersonalesComponent,
    FormRecconstanciasComponent,
    FormReccertificadosComponent,
    FormRecconferenciasComponent,
    ],
    exports: [
      FormDatospersonalesComponent,
      FormCertificadosComponent,
      FormConferenciasComponent,
      FormDocumentosComponent,
      FormRecdatospersonalesComponent,
    FormRecconstanciasComponent,
    FormReccertificadosComponent,
    FormRecconferenciasComponent,
    ]
})

export class ComponentModule {}
