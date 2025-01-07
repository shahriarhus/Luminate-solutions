import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ContactDetailsService, ContactDetail } from '../../services/contact-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'subject', 'message'];
  dataSource: MatTableDataSource<ContactDetail>;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contactDetailsService: ContactDetailsService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<ContactDetail>();
  }

  ngOnInit() {
    this.loadContactDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadContactDetails() {
    this.loading = true;
    this.contactDetailsService.getContactDetails().subscribe({
      next: (response) => {
        console.log('Response:', response); // Add this line
        if (response.success) {
          this.dataSource.data = response.data;
        } else {
          this.showError(response.error || 'Failed to load contact details');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error details:', error); // Add this line
        this.showError('Failed to load contact details');
        this.loading = false;
      }
    });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}