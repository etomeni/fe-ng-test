import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private contactsSubject = new BehaviorSubject<Contact[]>([]);

  constructor() {
    this.loadContacts();
  }

  private loadContacts(): void {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
      this.contactsSubject.next(this.contacts);
    }
  }

  private saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
    this.contactsSubject.next(this.contacts);
  }

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): void {
    contact.id = Date.now().toString();
    this.contacts.push(contact);
    this.saveContacts();
  }


  getRandomAddress(addresses: { address: string }[]): string {
    const randomIndex = Math.floor(Math.random() * addresses.length);
    return addresses[randomIndex].address;
  }
}