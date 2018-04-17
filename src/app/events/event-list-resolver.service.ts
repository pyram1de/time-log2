import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router';
import { Subject, Observable } from 'rxjs/RX'
import { EventService } from './shared/event.service'
import { IEvent } from '.';


@Injectable() 
export class EventsListResolver implements Resolve<any> {
    constructor(private eventService:EventService) {

    }

    resolve() {
        return this.eventService.getEvents();
    }
}

