import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentContent: string = 'digitalMarketing'; 

  showContent(contentType: string) {
    this.currentContent = contentType;
}
}
