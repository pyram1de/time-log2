import { Component } from '@angular/core'

@Component({
    selector: 'events-list',
    templateUrl: 'events-list.component.html'
})
export class EventsListComponent {
    event = {
        id: 1,
        name: 'Angular Connect',
        date: '9/9/2020',
        time: '10:00',
        price: 100.00,
        imageUrl: '/app/assets/images/angularconnect-shield.png',
        location: {
            address: '1075 DY',
            city: 'London',
            country: 'England'
        }
    }
}