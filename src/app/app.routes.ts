import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    // { path: '', component: AddContactComponent },
    // { path: 'dashboard', component: HomeComponent },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-contact', component: AddContactComponent },
    
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];