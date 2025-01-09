import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailsService, ContactDetail } from '../../services/contact-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditContactDialogComponent  } from '././edit-contact-dialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'subject', 'message', 'actions', 'created_at'];
  dataSource: MatTableDataSource<ContactDetail>;
  selection = new SelectionModel<ContactDetail>(true, []);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contactDetailsService: ContactDetailsService,
    private dialog: MatDialog,
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
        if (response.success) {
          this.dataSource.data = response.data;
        } else {
          this.showError(response.error || 'Failed to load contact details');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error details:', error);
        this.showError('Failed to load contact details');
        this.loading = false;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  exportSelected(): void {
    const selectedData = this.selection.selected;
    if (selectedData.length === 0) {
      this.showError('Please select at least one row to export');
      return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Selected Contacts');
    XLSX.writeFile(wb, 'selected_contacts.xlsx');
  }

  editContact(contact: ContactDetail): void {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '500px',
      data: { ...contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactDetailsService.updateContact(result).subscribe({
          next: (response) => {
            if (response.success) {
              this.showSuccess('Contact updated successfully');
              this.loadContactDetails();
            } else {
              this.showError(response.error || 'Failed to update contact');
            }
          },
          error: (error) => {
            this.showError('Failed to update contact');
          }
        });
      }
    });
  }

  deleteContact(contact: ContactDetail): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactDetailsService.deleteContact(contact.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccess('Contact deleted successfully');
            this.loadContactDetails();
          } else {
            this.showError(response.error || 'Failed to delete contact');
          }
        },
        error: (error) => {
          this.showError('Failed to delete contact');
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
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