import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
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
  // Update to use the correct path relative to the domain root
  private apiUrl = 'http://localhost/lws2/contact-details.php';

  constructor(private http: HttpClient) {}

  getContactDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}