import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  navItems = [
    // { icon: 'dashboard', label: 'Dashboard', link: '/' },
    { icon: 'person', label: 'Contact Details', link: '/contactdt' },
    { icon: 'groups', label: 'Quote', link: '/quotedt' },
    // { icon: 'account_circle', label: 'Profile', link: '/' },
  ];

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }
}
