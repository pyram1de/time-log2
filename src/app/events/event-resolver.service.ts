import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Subject, Observable } from 'rxjs/RX'
import { EventService } from './shared/event.service'
import { IEvent } from '.';


@Injectable() 
export class EventResolver implements Resolve<any> {
    constructor(private eventService:EventService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        let params = route.params;
        return this.eventService.getEvent(+params['id']);
    }
}

