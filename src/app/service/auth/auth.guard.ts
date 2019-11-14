import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.redirectUrl = state.url

    console.log('URL', state.url)

    return Observable.create((observer: Observer<boolean>) => {
      if (this.authService.loggedIn) {
        observer.next(true)
      } else {
        this.router.navigate(['login'], { queryParams: { from: state.url.substr(1) } })
      }
    })

  }
}
