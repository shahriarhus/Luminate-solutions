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

export interface ApiResponse {
  success: boolean;
  data?: QuoteDetail[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteDetailsService {
  private apiUrl = './';

  constructor(private http: HttpClient) {}

  getQuoteDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/get-quotes.php`);
  }

  deleteQuote(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete-quote.php?id=${id}`);
  }
}