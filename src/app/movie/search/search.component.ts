import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movieService/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private movieservice : MovieService) { }

  ngOnInit() {

  }

  onSearchText(event:any){
    this.movieservice.search.next({title:event.target.value})
  }

}
