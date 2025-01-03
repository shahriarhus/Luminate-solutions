import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    const formData = this.contactForm.value;
    this.http.post('http://localhost/lws2/submit_form.php', formData)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log('Form data submitted successfully');
          // You can add additional logic here, such as resetting the form
        } else {
          console.error('Error submitting form data:', response.message);
        }
        this.loading = false;
      }, (error) => {
        console.error('Error:', error);
        this.loading = false;
      });
  }
}