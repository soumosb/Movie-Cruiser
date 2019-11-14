import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { movie } from 'src/app/movie/movie-model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  configUrl: string = "assets/movie-list.json"

  search = new Subject();

  constructor(private http:HttpClient) { }

  getMovies() : Observable<any>{
    return this.http.get(this.configUrl);
  }

  getMovie(id:number):Observable<any>{
    return Observable.create((observer:Observer<movie>)=>{
        this.getMovies().subscribe((movies:movie[])=>{
            const m=movies.find(movie=>movie.movieId==id)
            observer.next(m)
        })
    })
}

}
