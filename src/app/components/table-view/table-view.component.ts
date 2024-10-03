import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';
import { TableModule } from 'primeng/table';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table-view.component.html',
  styles: []
})
export class TableViewComponent implements OnInit {
  @Input() contacts: Contact[] = [];

  constructor(
    public contactService: ContactService
  ) {}


  ngOnInit() {
    // Initialize the map

    // Fetch the contacts
    this.contacts = this.contacts.map(contact => {
      // Assign a random address to each contact
      const randomAddress = this.contactService.getRandomAddress(contact.addresses);
      return { ...contact, randomAddress };
    });
  }


}