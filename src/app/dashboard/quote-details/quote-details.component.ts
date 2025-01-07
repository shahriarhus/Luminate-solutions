import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuoteDetailsService, QuoteDetail } from '../../services/quote-details.service'

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'project_name',
    'contact_name',
    'contact_email',
    'contact_phone',
    'budget',
    'created_at',
    'actions'
  ];
  dataSource: MatTableDataSource<QuoteDetail>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private quoteDetailsService: QuoteDetailsService) {
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
    this.quoteDetailsService.getQuoteDetails().subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data;
        }
      },
      error: (error) => console.error('Error loading quotes:', error)
    });
  }

  viewDetails(quote: QuoteDetail) {
    // Implement view details logic
    console.log('Quote details:', quote);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
