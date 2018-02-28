import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IEvent } from '.'

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2>
        <div>Date: {{event.date}}</div>
        <div [ngClass]="getStartTimeClass()" [class.green]="event?.time === '8:00 am'" [ngSwitch]="event?.time">Time: {{event.time}}
            <span *ngSwitchCase="'8:00 am'" >(early start)</span>
            <span [style.color]="event.time === '10:00 am' ? '#ff0000' : '#bbb'" *ngSwitchCase="'10:00 am'">(late start)</span>
            <span [ngStyle]="getStartTimeStyle()" *ngSwitchDefault>(normal start)</span>
        </div>
        <div>Price: \${{event.price}}</div>
        <div *ngIf="event.location">
            <span>Location: {{event.location?.address}}</span>
            <span class="pad-left">{{event.location?.city}}, {{event.location?.country}} </span>
        </div>
        <div *ngIf="event.onlineUrl">
            Online Url: {{event.onlineUrl}}
        </div>
    </div>
    `,
    styles: [`
        .green { color: #4ead4e !Important;}
        .bold { font-weight: bold;}
        .pad-left { margin-left: 10px; }
        .thumbnail { min-height: 210px; }
    `]
})
export class EventThumbnailComponent {
    @Input() event: IEvent

    getStartTimeClass() {
        const isEarlyStart = this.event && this.event && this.event.time === '8:00 am';
        return {green: isEarlyStart, bold: isEarlyStart}
    }
    getStartTimeStyle(): any {
        const isEarlyStart = this.event && this.event && this.event.time === '9:00 am';
        if(isEarlyStart){
            return {color: '#ff33ff', 'font-weight': 'bold'}
        }
        return {};
    }
}