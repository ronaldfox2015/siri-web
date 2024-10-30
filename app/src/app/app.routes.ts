import { RouterModule, Routes} from '@angular/router'
import { RegisterCompanyComponent } from './register-company/register-company.component'
import { NgModule } from '@angular/core'
import { HomeComponent } from './page/home/home.component'
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";
import {BuscarComponent} from "./page/buscar/buscar.component";
import { HttpClientModule } from '@angular/common/http';
import {ApplicantRegisterModalComponent} from "./component/applicant-register-modal/applicant-register-modal.component";
export const routes: Routes = [
  { path: 'registro-empresa', component: RegisterCompanyComponent },
  { path: '', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ApplicantRegisterModalComponent
  ],
  providers: [
    provideHttpClient(withFetch()),  // Habilita la API fetch aquí
  ],
  exports: [RouterModule, ApplicantRegisterModalComponent, HttpClientModule]
})
export class AppRoutingModule { }
