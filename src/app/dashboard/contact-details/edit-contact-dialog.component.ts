import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactDetail } from '../../services/contact-details.service';

@Component({
  selector: 'app-edit-contact-dialog',
  template: `
    <h2 mat-dialog-title>Edit Contact</h2>
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Subject</mat-label>
          <input matInput formControlName="subject">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="message" rows="4"></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!editForm.valid">Save</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [
    '.full-width { width: 100%; margin-bottom: 15px; }'
  ]
})
export class EditContactDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactDetail
  ) {
    this.editForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      subject: [data.subject, Validators.required],
      message: [data.message, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}