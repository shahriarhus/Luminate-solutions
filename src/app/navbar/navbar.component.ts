import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private dropdownTimeout: any;
  isMenuOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const dropdown = this.el.nativeElement.querySelector('.dropdown');
    const dropdownContent = this.el.nativeElement.querySelector('.dropdown-content');

    this.renderer.listen(dropdown, 'mouseenter', () => {
      clearTimeout(this.dropdownTimeout);
      this.renderer.addClass(dropdownContent, 'show');
    });

    this.renderer.listen(dropdown, 'mouseleave', () => {
      this.dropdownTimeout = setTimeout(() => {
        this.renderer.removeClass(dropdownContent, 'show');
      }, 300); // 300ms delay before hiding the dropdown
    });

    this.renderer.listen(dropdownContent, 'mouseenter', () => {
      clearTimeout(this.dropdownTimeout);
    });

    this.renderer.listen(dropdownContent, 'mouseleave', () => {
      this.dropdownTimeout = setTimeout(() => {
        this.renderer.removeClass(dropdownContent, 'show');
      }, 300); // 300ms delay before hiding the dropdown
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
