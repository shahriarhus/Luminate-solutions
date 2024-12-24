import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  ngOnInit(): void {
    const dropdownMenu = document.querySelector('.dropdown-content');
    const solutionsMenu = document.querySelector('.dropdown');

    if (solutionsMenu) {
      solutionsMenu.addEventListener('mouseover', () => {
        dropdownMenu?.classList.add('open');
      });
    }

    if (dropdownMenu) {
      dropdownMenu.addEventListener('mouseenter', () => {
        dropdownMenu.classList.add('open');
      });

      dropdownMenu.addEventListener('mouseleave', () => {
        dropdownMenu.classList.remove('open');
      });
    }
  }
}
