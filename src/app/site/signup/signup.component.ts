import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/service/user/user-model';
import { AuthService } from 'src/app/service/authService/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  formSubmitted: boolean

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required,]),
      confirmPassword: new FormControl(null, [Validators.required, this.isConfirmPasswordMatched.bind(this)])
    })
  }

  get userName() {
    return this.signUpForm.get('userName');
  }
  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  isUserNameTaken(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === 'John')
          resolve({ 'userNameTaken': true })
        else
          resolve(null)
      }, 1000);
    })

    return promise
  }

  isConfirmPasswordMatched(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value)
        return { 'nomatch': true }
    }
    return null
  }

  onSubmitSignup() {
    if (!this.signUpForm.errors) {
      this.formSubmitted = true;
      const newUser: User = {
        userId: 10,
        userName: this.userName.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        role: 'Customer'
      }
      this.userService.addUser(newUser);
      this.authService.logIn(newUser.userName, newUser.password);
      this.formSubmitted = true
      this.signUpForm.reset();
      // this.router.navigate(['/login']);
    }

  }

}
