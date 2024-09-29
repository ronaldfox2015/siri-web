import { RouterModule, Routes } from '@angular/router'
import { RegisterCompanyComponent } from './register-company/register-company.component'
import { NgModule } from '@angular/core'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  { path: 'registro-empresa', component: RegisterCompanyComponent },
  { path: '', component: HomeComponent },

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
