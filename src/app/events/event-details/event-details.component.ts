import { Component, OnInit} from '@angular/core';
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params, Router} from '@angular/router'
import { IEvent } from '..';
import { AuthService } from '../../user/auth.service';

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

    constructor(private eventService: EventService, private route: ActivatedRoute, private auth: AuthService, private router : Router){

    }
    ngOnInit() {


        if(!this.auth.isAuthenticated()){
            console.log('is not  authenticated')
            this.router.navigateByUrl('user/login')
        } else {
            console.log('is auithed', this.auth);
        }
        this.route.data.forEach((data) => {
            this.event = data['event'];
            this.addMode = false;
        })
        
/*
        this.route.params.forEach((params: Params) => {
            this.eventService.getEvent(+params['id']).subscribe(event=>{
                this.event = event;
                this.addMode = false;
            });
        });*/
        //this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

    addSession(){
        this.addMode = true;
    }

    saveNewSession(session){
        const nextId = Math.max.apply(null, this.event.sessions.map(s=>s.id));
        session.id = nextId;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
       // this.eventService.saveEvent(this.event);
        this.addMode = false;
        //console.log('event', this.event);
    }
    cancelNewSession($event){
        this.addMode = false;
    }
}