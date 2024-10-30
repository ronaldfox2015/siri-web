import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {User} from "../../service/interface/user";
import {ApplicantService} from "../../service/applicant.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: ApplicantService
    },
    {
      provide: HttpClient
    }
  ],
  selector: 'app-applicant-register-modal',
  standalone: true,
  styleUrls: ['./applicant-register-modal.component.css'],
  templateUrl: './applicant-register-modal.component.html'
})
export class ApplicantRegisterModalComponent {
  @Input() isVisible = false;  // Para controlar la visibilidad del modal
  @Output() closeModal = new EventEmitter<void>();  // Evento para cerrar el modal
  @Output() registerApplicant = new EventEmitter<any>();  // Evento para registrar el postulante
  constructor(public applicantService: ApplicantService) {
  }
  applicant = {
    first_name: '',
    last_name_father: '',
    last_name_mother: '',
    age: null,
    date_of_birth: '',
    status: 1,  // Estado por defecto (activo)
    mail: '',
    password: '',
    confirm_password: ''
  };

  close() {
    this.closeModal.emit();  // Emitir el evento para cerrar el modal
  }

  async onSubmit() {
    const user = this.applicantService.addUser({
      confirm_password: this.applicant.confirm_password,
      email: this.applicant.mail,
      password: this.applicant.password,
      role: 'postulante'
    })
    console.log(user)
    // const applicant = this.applicantService.addApplicant({
    //   confirm_password: this.applicant.confirm_password,
    //   email: this.applicant.mail,
    //   password: this.applicant.password,
    //   role: 'postulante'
    // })
    this.close();  // Cerrar el modal después de enviar el formulario
  }
}
