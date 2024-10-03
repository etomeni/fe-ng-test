import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { TableViewComponent } from './../../components/table-view/table-view.component';
import { MapViewComponent } from './../../components/map-view/map-view.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableViewComponent, MapViewComponent, ButtonModule, CardModule],
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  viewMode: 'table' | 'map' = 'table';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  toggleView(): void {
    this.viewMode = this.viewMode === 'table' ? 'map' : 'table';
  }
}