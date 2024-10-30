import {Component, EventEmitter, Inject, Output, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./component/header/header.component";
import {FooterComponent} from "./component/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {ApplicantService} from "./service/applicant.service";
import {ApplicantRegisterModalComponent} from "./component/applicant-register-modal/applicant-register-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ApplicantRegisterModalComponent,
    HttpClientModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NgxPaginationModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  isBrowser: boolean;
  public applicantService: ApplicantService
  isModalVisible: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,

    public http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.applicantService = new ApplicantService(this.http)
  }

  closeModal() {
    this.isModalVisible = false;
  }

  registerApplicant(applicantData: any) {
    console.log('Datos del postulante:', applicantData);
    const user = this.applicantService.addUser({
      confirm_password: applicantData['confirm_password'],
      email: applicantData['email'],
      password: applicantData['password'],
      role: applicantData['role']
    })
    console.log(user)
    this.closeModal();
  }
}
