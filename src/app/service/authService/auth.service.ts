import { Injectable } from '@angular/core';
import { User } from '../user/user-model';
import { UserService } from '../user/user.service';
import { Observable, observable, Observer } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  isAdmin = false;
  accessToken: string;
  redirectUrl = '/';
  userAuthenticated: User;
  errorMsg : string = "";

  constructor(private userService : UserService) { }
  
  logIn(username: string, password: string) {
    
    var returnValue = false;

     this.userService.authenticate(username, password).subscribe((user: User[]) => {
      user.forEach((singleUser, index)=>{
        if(singleUser.userName.match(username)){
          if(singleUser.password==(password)){
            this.loggedIn = true;
            this.userAuthenticated = singleUser;
            this.isAdmin = singleUser.role == 'Admin'
            this.errorMsg = "";
            returnValue = true;
          }
          else{
             this.errorMsg = "Password is incorrect.";
          }
        }
        else{
          this.errorMsg = "User name does not exist."
        }
      });
    });
    return returnValue;
}

logOut() {
    this.redirectUrl = '/'
    this.loggedIn = false
}

isAdminUser()
{
    return this.isAdmin
}


}
