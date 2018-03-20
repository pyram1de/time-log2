import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {NavBarComponent} from './nav/navbar.component'
import { TOASTR_TOKEN, Toastr } from './common/toastr.service'
import {appRoutes} from './routes'
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component'
import { EventsAppComponent } from './events-app.component'
import {
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    EventsListComponent,
    EventThumbnailComponent,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CollapsibleWellComponent } from './common/collapsible-well.component'


declare let toastr : Toastr

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe
    ],
    bootstrap: [EventsAppComponent],
    providers: [
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        {
            provide: EventRouteActivator,
            useClass: EventRouteActivator // longhand for registering providers
        },
        {   provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventsListResolver,
        AuthService
    ]
})
export class AppModule {}

function checkDirtyState(component: CreateEventComponent) {
    if(component.isDirty){
        return window.confirm('You have not saved your changes, do you really want to cancel? ')

    } else {
        return true;
    }
}