import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesService } from 'src/app/service/favouriteService/favourites.service';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private favouriteService:FavouritesService, private authService:AuthService) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.authService.loggedIn;
  }

  isAdmin(){
    return this.authService.isAdmin;
  }

  getUser(){
    return this.authService.userAuthenticated;
  }

  onSignOut(){
    // this.favouriteService.clearCart();
    this.authService.logOut();
    this.router.navigate([this.authService.redirectUrl]);
  }

}
