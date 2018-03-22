import { Component, OnInit} from '@angular/core';
import { EventService } from '../shared/event.service'
import { ActivatedRoute} from '@angular/router'
import { IEvent } from '..';

@Component({
    templateUrl: 'event-details.component.html',
    styles: [
        `
        .container {padding-left: 20px; padding-right: 20px; }
        .event-image: {height: 100px; }
        a { cursor: pointer}
        `
    ]
})
export class EventDetailsComponent implements OnInit {
    event: IEvent
    addMode: boolean = false;
    filterBy: string = "all";
    sortBy: string = "name";

    constructor(private eventService: EventService, private route: ActivatedRoute){

    }
    ngOnInit() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

    addSession(){
        this.addMode = true;
    }

    saveNewSession(session){
        const nextId = Math.max.apply(null, this.event.sessions.map(s=>s.id));
        session.id = nextId;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
       // this.eventService.saveEvent(this.event);
        this.addMode = false;
        //console.log('event', this.event);
    }
    cancelNewSession($event){
        this.addMode = false;
    }
}