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
  private apiUrl = './';

  constructor(private http: HttpClient) {}

  getContactDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/contact-details.php`);
  }

  updateContact(contact: ContactDetail): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-contact.php`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-contact.php?id=${id}`);
  }
}