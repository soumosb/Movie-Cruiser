import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginValid: boolean = true
  authSource: boolean = false
  notLogged: boolean = false;
  erroeMsg: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.notLogged = route.snapshot.queryParams['notLogged'];
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.authSource = params['from']
    })
    this.authSource = this.route.snapshot.queryParams['notLogged']
  }

  async onSubmit(form: NgForm) {
    const username = form.value.username
    const password = form.value.password
    console.log(this.authService.logIn(username, password));
    this.authService.logIn(username, password);
    console.log(this.authService.loggedIn);
    if (this.authService.loggedIn) {
      this.erroeMsg = null;
      this.router.navigate([this.authService.redirectUrl]);
    }
    else {
      this.isLoginValid = false;
      this.erroeMsg = this.authService.errorMsg;
      console.log(this.authService.errorMsg);
    }
  }



}
