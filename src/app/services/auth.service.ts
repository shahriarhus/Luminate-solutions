import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/lws2/login.php';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password })
      .pipe(
        tap((response: LoginResponse) => {
          if (response.success) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem(this.tokenKey, 'logged_in');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true' && 
           localStorage.getItem(this.tokenKey) === 'logged_in';
  }
}