import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuoteDetail {
  id: number;
  project_name: string;
  website_details: string;
  website_focus: any;
  additional_features: any;
  website_pages: any;
  number_of_pages: string;
  reference_websites: string;
  email_accounts: string;
  objective: string;
  website_description: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  currency: string;
  budget: string;
  discount_coupon: string;
  reference_person: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteDetailsService {
  private apiUrl = 'http://localhost/lws2/get-quotes.php';

  constructor(private http: HttpClient) {}

  getQuoteDetails(): Observable<{ success: boolean; data: QuoteDetail[] }> {
    return this.http.get<{ success: boolean; data: QuoteDetail[] }>(this.apiUrl);
  }
}
