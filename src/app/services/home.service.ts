import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http : HttpClient
  ) { }

  getMarketingCards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/marketing-cards`);
  }  
}
