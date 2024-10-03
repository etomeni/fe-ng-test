import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';
import * as L from 'leaflet';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
  // template: '<div id="map" class="w-full" style="height: 500px;"></div>',
  // styles: []
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @Input() contacts: Contact[] = [];
  map!: L.Map;

  constructor(
    public contactService: ContactService
  ) {}


  ngOnInit() {
    // Initialize the map
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([3.3792, 6.5244], 2);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.addMarkers();
  }

  private addMarkers(): void {
    this.contacts.forEach(contact => {
      L.marker([contact.latitude, contact.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${contact.name}</b><br>${contact.email}<br>${ this.contactService.getRandomAddress(contact.addresses)}`);
    });
  }
}