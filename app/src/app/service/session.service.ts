import { Injectable } from '@angular/core';
import { UserSession } from "./interface/user";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userData: UserSession | null = null; // Cambia any a UserSession o null

  setUser(data: UserSession) {
    this.userData = data;
  }

  getUser(): UserSession | null {
    return this.userData; // Asegúrate de que el tipo sea correcto
  }

  setSession(data: UserSession) {
    if (data) { // Verifica si data no es null o undefined
      const session = JSON.stringify(data);
      localStorage.setItem('session', session);
    }
  }

  clearSession() {
    this.userData = null;
    localStorage.removeItem('session'); // Remueve la sesión del localStorage
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('session'); // Verifica si hay una sesión almacenada
  }

  getSession(): UserSession | null {
    const session: string | null = localStorage.getItem('session');
    if (session) { // Verifica si session no es null
      return JSON.parse(session) as UserSession;
    }
    return null; // Devuelve null si no hay sesión
  }
}
