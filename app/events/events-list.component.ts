import { Component, OnInit } from '@angular/core'
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, EventService } from './shared/index'
@Component({
    template: `
    <div>
        <h1>Upcoming Angular 2 Events </h1>
        <hr/>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail 
                (click)="handleThumbnailClick(event.name)"
                [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>`
})
export class EventsListComponent implements OnInit {
   events: IEvent[];
   constructor (private eventService: EventService, private toastrService: ToastrService, private route: ActivatedRoute){
      
   }

   handleThumbnailClick(eventName:string){
    this.toastrService.success(eventName, "event clicked!");
    //toastr.success(eventName);
   }

   ngOnInit() {
       this.events = this.route.snapshot.data['events'];
   }
}