import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx'
import { Http, RequestOptions, Response, Headers, BaseRequestOptions } from '@angular/http'

@Injectable()
export class AuthService {
    currentUser:IUser;
    headers :Headers;
    options :RequestOptions;
    private server: string = "http://localhost:3000";

    constructor(private http:Http) {
        this.headers = new Headers({'Content-Type':'application/json'});
        this.options = new RequestOptions({headers:this.headers, withCredentials: true});
    }

    loginUser(username: string, password: string){
        return this.http.post(this.server + "/api/signin", JSON.stringify({username, password}), this.options)
        .map((response:any)=>{
            if(response._body){
                console.log('body', response._body);
                return response.json();
            } else {
                return {};
            }
        }).do((currentUser : IUser) => {
            if(!!currentUser.userName){
                console.log('user-is-authenticated...');
                this.currentUser = currentUser;
            }
        }).catch(this.handleError).subscribe();
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    logout() {
        this.currentUser = null;
        return this.http.get(this.server + '/api/logout', this.options).subscribe();
    }

    checkAuthenticationStatus() {
        return this.http.get(this.server + '/api/currentIdentity', this.options).map((response:any)=>{
            if(response._body){
                console.log('body', response._body);
                return response.json();
            } else {
                return {};
            }
        }).do((currentUser : IUser) => {
            if(!!currentUser.userName){
                console.log('user-is-authenticated...');
                this.currentUser = currentUser;
            }
        }).subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }

    private handleError(error: Response){
        console.log('Error!');
        return Observable.throw(error.statusText);
    }
}