import { Component } from '@angular/core';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
})
export class SolutionsComponent {
  openPopup(event: any): void {
    const card = event.target.closest('.solution-card');
    const title = card.querySelector('.solution-title').textContent;
    const description = card.querySelector('.solution-description').textContent;
    const image = (card.querySelector('.solution-image') as HTMLImageElement).src;

    const popupOverlay = document.getElementById('popup-overlay')!;
    const popupTitle = document.getElementById('popup-title')!;
    const popupDescription = document.getElementById('popup-description')!;
    const popupImage = document.getElementById('popup-image') as HTMLImageElement;

    // Update popup content
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupImage.src = image;

    // Show the popup
    popupOverlay.classList.remove('hidden');
  }

  closePopup(): void {
    const popupOverlay = document.getElementById('popup-overlay')!;
    // Hide the popup
    popupOverlay.classList.add('hidden');
  }

  closePopupOnOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'popup-overlay') {
      this.closePopup();
    }
  }
}
