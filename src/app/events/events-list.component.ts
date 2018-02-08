import { Component } from '@angular/core'

@Component({
    selector: 'events-list',
    template: `
    <div>
        <h1>Upcoming Angular 2 Events </h1>
        <hr>
        <h2>{{event.name}}</h2>
        <hr/>
    </div>
    `
})
export class EventsListComponent {
    event = {
        id: 1,
        name: 'name',
        date: '9/9/2020',
        time: '10:00',
        price: 100.00,
        imageUrl: '/app/assets/images/angularconnect-shield.png'
    }
}