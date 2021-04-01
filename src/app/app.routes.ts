import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


// pages
import {
  LoginComponent,
  RegistroComponent,
} from './pages/index.paginas';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', component: PageNotFoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
