import { SessionListComponent } from './session-list.component'
import { ISession } from '../shared/event.model'


describe('SessionListComponent', ()=>{
    let component: SessionListComponent;
    let mochAuthService, mockVoterService;

    beforeEach(()=>{
        component = new SessionListComponent(mochAuthService, mockVoterService);

    })

    describe('ngOnChanges', ()=>{
       it('should filter the sessions correctly', ()=>{
           component.sessions = <ISession[]>[
               {name: 'session 1', level: 'intermediate'},
               {name: 'session 2', level: 'advanced'},
               {name: 'session 3', level: 'intermediate'},
               {name: 'session 4', level: 'beginner'}];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 1;

            component.ngOnChanges();

            expect(component.visibleSessions).toContain(<ISession>{name: 'session 1', level: 'intermediate'})
            expect(component.visibleSessions).toContain(<ISession>{name: 'session 3', level: 'intermediate'});
            expect(component.visibleSessions.length).toBe(2);
       }) 

       it('should sort the sessions correctly', ()=>{
        component.sessions = <ISession[]>[
            {name: 'session 4', level: 'intermediate'},
            {name: 'session 2', level: 'advanced'},
            {name: 'session 1', level: 'intermediate'},
            {name: 'session 3', level: 'beginner'}];
         component.filterBy = 'all';
         component.sortBy = 'name';
         component.eventId = 1;

         component.ngOnChanges();

         expect(component.visibleSessions[2].name).toBe('session 3');
    }) 
    });
});