import { movie } from '../movie/movie-model';

export interface Favorites{
    items:[{
        itemId:string
        movie: movie
    }]
    noOfFavorites:number
}
