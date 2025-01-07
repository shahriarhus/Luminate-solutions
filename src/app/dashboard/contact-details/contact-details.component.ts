import { Component, OnInit } from '@angular/core';
import { ContactDetailsService, ContactDetail } from '../../services/contact-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactDetails: ContactDetail[] = [];
  loading = true;
  error = '';

  constructor(
    private contactDetailsService: ContactDetailsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadContactDetails();
  }

  loadContactDetails(): void {
    this.contactDetailsService.getContactDetails().subscribe({
      next: (response) => {
        if (response.success) {
          this.contactDetails = response.data;
        } else {
          this.error = response.error || 'Failed to load contact details';
          this.showError(this.error);
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load contact details';
        this.showError(this.error);
        this.loading = false;
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}