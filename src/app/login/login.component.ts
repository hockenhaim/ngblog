import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AfterContentInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './password.validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
  title = 'log in';
  newUser = {
    'display_name': '',
    'email': '',
    'password': ''
  };
  authUser;
  user;
  signUpForm: FormGroup;
  signInForm: FormGroup;


  constructor(private router: Router,
    private authService: AuthService,
    private fb: FormBuilder) {
       this.signUpForm = fb.group({
           name: ['', Validators.required],
           signUpEmail: ['', Validators.required],
           password: ['', Validators.required],
           confirmPassword: ['', Validators.required]
         }, {
          validator: PasswordValidation.MatchPassword
         }
       );
       this.signInForm = fb.group({
        signInEmail: ['', Validators.required],
        signInPassword: ['', Validators.required]
       });
    }

  ngOnInit() {
    this.authService.getAuthState().subscribe(
      (user) => this.user = user);
  }

  ngDoCheck() {
    if (this.user) {
      this.authService.writeUserData(this.user, this.newUser.display_name);
      this.router.navigate(['/control-panel/articles']);
    }
  }


  preview(e){
    e.preventDefault();
    console.log('preview')
  }

  toggleForm(title) {
    this.title = title;
    
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  onSignUp(email, password) {
    this.newUser = {
      'display_name': this.signUpForm.value['name'],
      'email': this.signUpForm.value['signUpEmail'],
      'password': this.signUpForm.value['password']
    };
    this.authService.signUp(this.newUser.email, this.newUser.password);
  }

  onSignIn(email, password) {
    this.authUser = {
      'email': this.signInForm.value['signInEmail'],
      'password': this.signInForm.value['signInPassword'],
    }
    this.authService.signIn(this.authUser.email, this.authUser.password);
  }

}
