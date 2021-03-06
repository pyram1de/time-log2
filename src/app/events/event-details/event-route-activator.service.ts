import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventService } from '../shared/event.service'

@Injectable() 
export class EventRouteActivator implements CanActivate {
    constructor(private eventService: EventService, private router: Router){
            // no longer useed
    }

    canActivate(route: ActivatedRouteSnapshot) : boolean {
        const eventExists = !!this.eventService.getEvent(+route.params['id'])
        console.log(eventExists, route.params['id']);
        if(!eventExists) {
            this.router.navigate(["404"])
        } else {
            return true;
        }
    }
}
