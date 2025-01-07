import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactDetail {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  data: ContactDetail[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {
  private apiUrl = 'http://localhost/lws2/contact-details.php';

  constructor(private http: HttpClient) {}

  getContactDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
