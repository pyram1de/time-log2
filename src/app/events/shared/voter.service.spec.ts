import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of';

describe('VoterService', () => {
    let voterService : VoterService,
        mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete','post']);
        voterService = new VoterService(mockHttp);
        
    });
     
    describe('deleteVoter', ()=>{
        it('should remove the voter from the list of voters',()=>{
            mockHttp.delete.and.returnValue(of(false));
            
            var session = {id:6, voters: ["joe","john"]};
            voterService.deleteVoter(3, <ISession>session, "joe")
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        });

        it('should call http.delete with the right URL', ()=>{
            mockHttp.delete.and.returnValue(of(false));
            
            var session = {id:6, voters: ["joe","john"]};
            voterService.deleteVoter(3, <ISession>session, "joe")

            expect(mockHttp.delete).toHaveBeenCalledWith('http://localhost:3000/api/events/3/sessions/6/voters/joe')
        })
    })

    describe('addVoter', () => {
        it('should call http.post with the right URL', () => {
            mockHttp.post.and.returnValue(of(false));
            
            var session = {id:6, voters: ["john"]};
            voterService.addVoter(3, <ISession>session, "joe")

            expect(mockHttp.post).toHaveBeenCalledWith('http://localhost:3000/api/events/3/sessions/6/voters/joe',{}, jasmine.any(Object));       
        })
    })
    
})

