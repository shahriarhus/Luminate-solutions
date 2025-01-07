import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteFormService } from '../services/quote-form.service';
import { QuoteFormData } from '../services/quote-form.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit  {
  quoteForm: FormGroup;
  currencies = ['USD', 'EUR', 'GBP', 'INR'];
  maxFileSize = 64; // MB

  constructor(private fb: FormBuilder, private quoteFormService: QuoteFormService) {
    this.quoteForm = this.fb.group({
      projectName: ['', Validators.required],
      websiteDetails: [''],
      websiteFocus: this.fb.group({
        business: [false],
        news: [false],
        ecommerce: [false],
        portfolio: [false],
        blog: [false],
        forum: [false],
        personal: [false]
      }),
      additionalFeatures: this.fb.group({
        additionalLanguages: [false],
        companyEmails: [false],
        mobileResponsive: [false],
        seo: [false],
        sem: [false],
        facebookMarketing: [false],
        googleAnalytics: [false],
        liveChat: [false]
      }),
      websitePages: this.fb.group({
        home: [false],
        aboutUs: [false],
        missionVision: [false],
        clients: [false],
        testimonials: [false],
        photoGallery: [false],
        videoGallery: [false],
        audioGallery: [false],
        products: [false],
        services: [false],
        contactUs: [false]
      }),
      numberOfPages: ['1-10'],
      referenceWebsites: [''],
      emailAccounts: [''],
      objective: [''],
      websiteDescription: [''],
      contact: this.fb.group({
        name: ['', Validators.required],
        phone: [''],
        email: ['', [Validators.required, Validators.email]]
      }),
      currency: ['', Validators.required],
      budget: ['', Validators.required],
      discountCoupon: [''],
      referencePerson: ['']
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileSize = Math.round(file.size / 1024 / 1024); // Convert to MB
      if (fileSize > this.maxFileSize) {
        alert(`File size cannot exceed ${this.maxFileSize}MB`);
        event.target.value = '';
      }
    }
  }
  onSubmit() {
    console.log('Submit button clicked');
    const formData: QuoteFormData = this.quoteForm.value;
    this.quoteFormService.submitQuoteForm(formData).subscribe(response => {
      console.log('Form submitted successfully', response);
      this.quoteForm.reset(); // Add this line to reset the form
      Object.keys(this.quoteForm.controls).forEach(key => {
        const control = this.quoteForm.get(key);
        if (control) {
          control.setValue(null);
        }
      });
    }, error => {
      console.error('Error submitting form', error);
    });
  }
}