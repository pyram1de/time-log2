import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module'
import {
    EventResolver,
    EventsListResolver,
    EventRouteActivator,
    CreateEventComponent,
    EventDetailsComponent,
    EventsListComponent,
    CreateSessionComponent
} from './events/index';

export const appRoutes: Routes = [
    {
        path: 'events',  component: EventsListComponent, resolve: { events: EventsListResolver}
    },
    {
        path:'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']
    },
    {
        path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver }
    },
    {   path: 'events/session/new', component: CreateSessionComponent },
    {
        path: '404', component: Error404Component
    },
    {
        path:'', redirectTo: '/events', pathMatch: 'full'
    },
    {   path: 'user', 
        loadChildren: () => UserModule
    }
]