import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  @Input() movie;
  @Output() addedToFavourite: EventEmitter<number> = new EventEmitter<number>();
  favouriteAdded : boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isAdmin(){
    this.authService.isAdminUser() && this.authService.loggedIn;
  }

  onFavourite(movieId: number) {
    this.addedToFavourite.emit(movieId)
    this.favouriteAdded = true;
    setTimeout(() => {
      this.favouriteAdded = false;
    }, 1000)
    return false;
  }



}
