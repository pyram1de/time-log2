import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { IUser } from './user.model';
import { Router } from '@angular/router'
import { first } from 'rxjs/operator/first';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

@Component({
  templateUrl: 'profile.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder {color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  private firstName:FormControl;
  private lastName:FormControl;
  
  constructor(private auth: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){
  }
  profileForm: FormGroup;
  ngOnInit(): void {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['user/login']);
    }
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[A-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
    
    this.profileForm = new FormGroup ({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel() {
    this.router.navigate(['events']);
  }

  saveProfile(formValues){
    if(this.profileForm.valid){
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(()=>
      {
        this.toastr.success('This has been saved', 'Great Job ' + formValues.firstName + '!')
      });
    }
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['events']);
  }
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched 
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched 
  }

}