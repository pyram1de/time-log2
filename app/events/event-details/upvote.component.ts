import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'upvote',
    template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
        <div class="well votingWidget">
            <div class="votingButton">
                <i *ngIf="voted" class="glyphicon glyphicon-heart"></i>
                <i *ngIf="!voted" class="glyphicon glyphicon-heart-empty"></i>
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
    @Input() voted: boolean;
    @Output() vote = new EventEmitter();

    onClick() {
        console.log('CLICKED! now emitting....');
        this.vote.emit({});
    }
}