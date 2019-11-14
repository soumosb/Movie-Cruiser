import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from './user-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  configUrl: string = "assets/user.json"

  constructor(private http:HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
        return this.http.get(this.configUrl);
    // return Observable.create((observer: Observer<any>) => {

    //     if (username !== 'admin') {

    //         observer.next({ username, firstName: 'John', lastName: '', role: 'Customer' })
    //     } else {
    //         observer.next({ username, firstName: 'Admin', lastName: 'User', role: 'Admin' })
    //     }
    //     return null
    // })
}

addUser(user: User) {
  if(user) {
    this.http.post(this.configUrl, user)
  }
}

}
