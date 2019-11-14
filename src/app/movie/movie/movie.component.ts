import { Component, OnInit } from '@angular/core';
import { movie } from '../movie-model';
import { MovieService } from 'src/app/service/movieService/movie.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import { FavouritesService } from 'src/app/service/favouriteService/favourites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieList: movie[];
  filterMovieList: movie[];
  constructor(private movieservice : MovieService, private authService : AuthService, private favoriteService: FavouritesService, private router: Router) { }

  ngOnInit() {

    // this.authService.logIn("arijit04", "123456");

    this.movieservice.getMovies().subscribe((data)=>{
      this.movieList = [...data];
      this.filterMovieList = [...data];
    });

    this.movieservice.search.subscribe((obj: { title: string }) => {
      if (obj.title !== '') {
          const result = this.movieList.filter(movie => movie.name.toLowerCase().includes(obj.title.toLowerCase()))
          this.filterMovieList = result ? result : []
      } else {
          this.filterMovieList = [...this.movieList];
      }
  })

  }

  addedToFavourite(movieId: number) {
    if (!this.authService.loggedIn) {
        this.router.navigate(['/login'],{queryParams:{notLogged:true}})
    } else {
        this.favoriteService.addToFavorites(movieId)
    }
}

}
