import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.phone && this.contactForm.message) {
      console.log('Form Submitted', this.contactForm);
      alert('Thank you for contacting us!');
      this.contactForm = { name: '', email: '', phone: '', message: '' };
    } else {
      alert('Please fill in all the fields.');
    }
  }
}
