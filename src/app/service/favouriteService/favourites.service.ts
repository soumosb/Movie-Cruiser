import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { MovieService } from '../movieService/movie.service';
import { Favorites } from 'src/app/favourites/favourites-model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favorites: Favorites = {
    items: null,
    noOfFavorites: 0
}


  constructor(private movieService: MovieService) { }

  addToFavorites(movieId: number) {
    this.movieService.getMovie(movieId).subscribe((movieToBeAdded) => {
        const uid = UUID.UUID()
        if (this.favorites.items === null) {
            this.favorites.items = [{ itemId: uid, movie: movieToBeAdded }]
            this.favorites.noOfFavorites = 1
        } else {
            const index = this.favorites.items.findIndex(m => m.movie.movieId === movieId)
            if (index == -1) {
                this.favorites.items.push({ itemId: uid, movie: movieToBeAdded })
                this.favorites.noOfFavorites++
            }
        }
    })
}

removeFromFavorites(itemId: string) {
    const index = this.favorites.items.findIndex(movieItem => movieItem.itemId === itemId)
    this.favorites.items.splice(index, 1)
    this.favorites.noOfFavorites--
}

clearFavorites() {
    this.favorites.items = null
    this.favorites.noOfFavorites = 0
}

}
