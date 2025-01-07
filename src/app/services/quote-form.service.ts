import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuoteFormData {
  projectName: string;
  websiteDetails: string;
  websiteFocus: any;
  additionalFeatures: any;
  websitePages: any;
  numberOfPages: string;
  referenceWebsites: string;
  emailAccounts: string;
  objective: string;
  websiteDescription: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  currency: string;
  budget: string;
  discountCoupon: string;
  referencePerson: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteFormService {
  private apiUrl = 'http://localhost/lws2/quote.php';

  constructor(private http: HttpClient) {}

  submitQuoteForm(formData: QuoteFormData): Observable<any> {
    console.log('Submitting form data to server:', formData);
    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}