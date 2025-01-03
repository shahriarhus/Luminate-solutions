import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://luminatewebsol.com/db.php';

  constructor(private http: HttpClient) {}

  submitContactForm(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}