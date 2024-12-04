import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  marketingCards: any[] = [];
  currentContent: string = 'digitalMarketing'; 

  constructor (
    private HomeService: HomeService
  ) {}

  ngOnInit(): void {
    this.getMcards();
  }

  getMcards(): void {
    this.HomeService.getMarketingCards().subscribe({
      next: (response) => {
        console.log(response);
        this.marketingCards = response;
        console.log(this.marketingCards)
      },
      error(err) {
        console.log(err)
      },
    })
  }

  showContent(contentType: string) {
    this.currentContent = contentType;
  }
}
