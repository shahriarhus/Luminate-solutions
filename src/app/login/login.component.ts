import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const loginData = { username: this.username, password: this.password };
    this.http.post<{ success: boolean }>('http://localhost/lws2/login.php', loginData).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid username or password');
      }
    }, error => {
      console.error('Login error', error);
      alert('An error occurred during login');
    });
  }
}