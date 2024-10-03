import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './add-contact.component.html',
  styles: []
})
export class AddContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      // address: ['', Validators.required],
      addresses: this.fb.array([this.createAddressGroup()], Validators.maxLength(5)),

      longitude: [{ value: '3.3792', disabled: false }, Validators.required],
      latitude: [{ value: '6.5244', disabled: false }, Validators.required]
    });
  }


  createAddressGroup(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
    });
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    if (this.addresses.length < 5) {
      this.addresses.push(this.createAddressGroup());
    }
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value);
      this.contactForm.reset();
    }
  }

  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.contactForm.patchValue({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
      });
    }
  }
}