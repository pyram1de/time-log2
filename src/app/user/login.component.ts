import { Component } from '@angular/core'
import { AuthService } from './auth.service';
import { Router } from '@angular/router'
@Component({
    templateUrl: 'login.component.html',
    styles: [`
        em { float:right; color:#e05C65; padding-left:10;}
    `]
})
export class LoginComponent {

    constructor(private authService:AuthService, private router: Router){

    }

    login(formValues) {
        console.log('logging in');
        this.authService.loginUser(formValues.userName, formValues.password);
        //this.router.navigate(['events'])
        // or this.router.navigateByUrl('events');
    }

    cancel() {
        this.router.navigate(['events']);
    }
}