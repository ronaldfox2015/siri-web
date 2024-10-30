import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    // Lógica para manejar el login, por ejemplo, autenticación
    console.log('Formulario enviado');
    this.close();
  }
}
