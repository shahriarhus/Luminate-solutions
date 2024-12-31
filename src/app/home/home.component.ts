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
      description: 'Leading news website of India with over 10000+ visitors everyday.',
      image: 'sdhub.png',
      link: 'https://sdhub.in/',
    },
    {
      title: 'Professional Summit',
      description: 'Advanced healthcare management system for patient records.',
      image: 'PSF-Summit.png',
      link: 'https://professionalssummit.com/',
    },
    {
      title: 'Luminate Web Solutions',
      description: 'Comprehensive learning management system with interactive courses.',
      image: './Luminate Web Solutions.svg',
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