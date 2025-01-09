import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { QuoteDetailsService, QuoteDetail } from '../../services/quote-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'project_name',
    'contact_name',
    'contact_email',
    'contact_phone',
    'budget',
    'created_at',
    'actions'
  ];
  dataSource: MatTableDataSource<QuoteDetail>;
  selection = new SelectionModel<QuoteDetail>(true, []);
  loading = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private quoteDetailsService: QuoteDetailsService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<QuoteDetail>();
  }

  ngOnInit() {
    this.loadQuoteDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadQuoteDetails() {
    this.loading = true;
    this.quoteDetailsService.getQuoteDetails().subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data ?? [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading quotes:', error);
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
      this.showMessage('Please select at least one quote to export');
      return;
    }

    const data = selectedData.map(quote => {
      const websiteFocus = Array.isArray(quote.website_focus) 
        ? quote.website_focus.join(', ') 
        : JSON.stringify(quote.website_focus);
        
      const additionalFeatures = Array.isArray(quote.additional_features) 
        ? quote.additional_features.join(', ') 
        : JSON.stringify(quote.additional_features);
        
      const websitePages = Array.isArray(quote.website_pages) 
        ? quote.website_pages.join(', ') 
        : JSON.stringify(quote.website_pages);

      return {
        'Project Name': quote.project_name,
        'Contact Name': quote.contact_name,
        'Email': quote.contact_email,
        'Phone': quote.contact_phone,
        'Budget': quote.budget,
        'Currency': quote.currency,
        'Website Details': quote.website_details,
        'Website Focus': websiteFocus,
        'Additional Features': additionalFeatures,
        'Website Pages': websitePages,
        'Number of Pages': quote.number_of_pages,
        'Reference Websites': quote.reference_websites,
        'Email Accounts': quote.email_accounts,
        'Objective': quote.objective,
        'Website Description': quote.website_description,
        'Discount Coupon': quote.discount_coupon,
        'Reference Person': quote.reference_person,
        'Created At': quote.created_at
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Selected Quotes');
    XLSX.writeFile(wb, 'selected_quotes.xlsx');
  }

  deleteQuote(quote: QuoteDetail) {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.quoteDetailsService.deleteQuote(quote.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage('Quote deleted successfully');
            this.loadQuoteDetails();
          } else {
            this.showMessage('Failed to delete quote');
          }
        },
        error: (error) => {
          console.error('Error deleting quote:', error);
          this.showMessage('Failed to delete quote');
        }
      });
    }
  }

  viewDetails(quote: QuoteDetail) {
    console.log('Quote details:', quote);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}