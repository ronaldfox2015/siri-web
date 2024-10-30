import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, ApplicantProfile, User} from "./interface/user";

export interface ApplicantServiceRepository {
  addUser(data: User): Promise<ApiResponse | undefined>
  addApplicant(data: ApplicantProfile): Promise<ApiResponse | undefined>
}

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private apiUrl = 'http://balancer'; // Usa la URL del entorno

  constructor(private http: HttpClient) {}

  addUser(data: User): Promise<ApiResponse | undefined> {
    return this.http.post<ApiResponse>(`/v1/user`, data).toPromise();
  }

  addApplicant(data: ApplicantProfile): Promise<ApiResponse | undefined> {
    return this.http.post<ApiResponse>(`/v1/applicant`, data).toPromise();
  }
}
