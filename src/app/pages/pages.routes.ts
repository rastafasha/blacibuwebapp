import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

// Guards
import { IdentityGuard } from '../services/identity.guard';


//pages

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {
  DashboardComponent,
  PerfilesComponent,
  RecertificacionComponent ,
  CertificacionComponent,
  ReglamentosComponent
} from './index.paginas';

import { FormDocumentosComponent } from '../components/certificacion/form-documentos/form-documentos.component';
import { FormDatospersonalesComponent } from '../components/certificacion/form-datospersonales/form-datospersonales.component';
import { FormConferenciasComponent } from '../components/certificacion/form-conferencias/form-conferencias.component';
import { FormCertificadosComponent } from '../components/certificacion/form-certificados/form-certificados.component';
import { FormReccertificadosComponent } from '../components/recertificacion/form-reccertificados/form-reccertificados.component';
import { FormRecconferenciasComponent } from '../components/recertificacion/form-recconferencias/form-recconferencias.component';
import { FormRecconstanciasComponent } from '../components/recertificacion/form-recconstancias/form-recconstancias.component';
import { FormRecdatospersonalesComponent } from '../components/recertificacion/form-recdatospersonales/form-recdatospersonales.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';


const pagesRoutes: Routes = [
    {
        path: 'user',
        component: PagesComponent,
        canActivate: [ IdentityGuard],
        children: [
            {
                path: 'user',
                component: DashboardComponent,
                canActivate: [ IdentityGuard],
                data: { titulo: 'user', }
            },
            {path: 'user', component: DashboardComponent, canActivate: [IdentityGuard]},
            {path: 'home', component: HomeComponent, canActivate: [IdentityGuard]},
            {path: 'certificacion', component: CertificacionComponent, canActivate: [IdentityGuard]},
            {path: 'reglamentos', component: ReglamentosComponent, canActivate: [IdentityGuard]},
            {path: 'recertificacion', component: RecertificacionComponent, canActivate: [IdentityGuard]},
            {path: 'perfil/:sub', component: PerfilesComponent, canActivate: [IdentityGuard]},
            {path: 'perfil', component: PerfilesComponent, canActivate: [IdentityGuard]},

            {path: 'documentos/:sub', component: FormDocumentosComponent, canActivate: [IdentityGuard]},
            {path: 'datos-profesionales/:sub', component: FormDatospersonalesComponent, canActivate: [IdentityGuard]},
            {path: 'conferencia/:sub', component: FormConferenciasComponent, canActivate: [IdentityGuard]},
            {path: 'certificados/:sub', component: FormCertificadosComponent, canActivate: [IdentityGuard]},

            {path: 'form-personal/:sub', component: FormRecdatospersonalesComponent, canActivate: [IdentityGuard]},
            {path: 'form-constancias/:sub', component: FormRecconstanciasComponent, canActivate: [IdentityGuard]},
            {path: 'form-certificados/:sub', component: FormReccertificadosComponent, canActivate: [IdentityGuard]},
            {path: 'form-conferencias/:sub', component: FormRecconferenciasComponent, canActivate: [IdentityGuard]},
        ]

    },

    //{path: '**', component: PageNotFoundComponent},
    {path: 'logut', component: LoginComponent},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
