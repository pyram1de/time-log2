import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'upvote',
    template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
        <div class="well votingWidget">
            <div class="votingButton">
                <i class="glyphicon glyphicon-heart" [style.color]="iconColour"></i>
            </div>
        </div>
        <div class="badge badge-inverse votingCount">
            <div>{{count}}</div>
        </div>
    </div>
    `,
    styleUrls: ['upvote.component.css']
}) export class UpvoteComponent {
    @Input() count : number;
    @Input() set voted(val) {
        this.iconColour = val ? 'red' : 'white';
    }
    @Output() vote = new EventEmitter();
    iconColour: string;

    onClick() {
        console.log('CLICKED! now emitting....');
        this.vote.emit({});
    }



}