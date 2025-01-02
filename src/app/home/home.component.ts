import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {
  currentIndex = 0;
  currentContent: string = 'digitalMarketing';
  portfolioProjects = [
    {
      title: 'Skill Development HUB',
      description: 'SD Hub website is a skills development hub aimed at empowering individuals by offering job-oriented training programs .',
      image: 'sdhub.png',
      link: 'https://sdhub.in/',
    },
    {
      title: 'Professional Summit',
      description: 'The Professionals Summit 2024 website for watching live event online.',
      image: 'PSF-Summit.png',
      link: 'https://professionalssummit.com/online/',
    },
    {
      title: 'Luminate Web Solutions',
      description: 'Luminate Web Solutions is a company offering expert web development services and digital transformation for businesses.',
      image: './img.png',
      link: 'https://luminatewebsol.com/',
    },
   
  ];

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.portfolioProjects.length;
  }

  prev() {
    this.currentIndex = this.currentIndex === 0 ? 
      this.portfolioProjects.length - 1 : this.currentIndex - 1;
  }
  showContent(contentType: string) {
    this.currentContent = contentType;
  }
}