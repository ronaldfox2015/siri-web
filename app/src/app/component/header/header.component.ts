import {Component, EventEmitter, Input, InputFunction, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LoginModalComponent} from "../login-modal/login-modal.component";
import {ApplicantRegisterModalComponent} from "../applicant-register-modal/applicant-register-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {ApplicantService, ApplicantServiceRepository} from "../../service/applicant.service";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    LoginModalComponent,
    ApplicantRegisterModalComponent,
    HttpClientModule

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuActive: boolean = false;
  isModalVisible = false;
  isModalVisibleRegister = false;
  @Output() registerApplicant = new EventEmitter<any>();  // Evento para registrar el postulante

  constructor() {}


  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
  openModal() {
    this.isModalVisible = true;
  }

  openModalRegister() {
    this.isModalVisibleRegister = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  closeModalRegister() {
    this.isModalVisibleRegister = false;
  }
}
