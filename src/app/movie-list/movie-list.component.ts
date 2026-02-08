import { Component,signal, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service';
import { Movie } from '../movie.model';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {

  constructor(private movieService:MovieService){}

  movies= signal<Movie[]>([]);
  searchQuery= signal<string>('');
  loading=signal<boolean>(false);
  messages=signal<string>('');
  error=signal<string>('');
  
  
  ngOnInit() {
    this.movieService.getSearchTerm()
      .pipe(
        debounceTime(500),              
        distinctUntilChanged()           
      )
      .subscribe((term: string) => {
        if (term && term.trim() !== '') {
          this.searchMovies(term);
        } else {
        
          this.movies.set([]);
        }
      });
  }

  searchMovies(query: string):void{
    if(!query || query.trim()==='')
      return;
    
    this.loading.set(true);
    this.error.set('');
    this.movieService.searchMovies(query).subscribe({
      next:(results:Movie[]) => {
        console.log('basarili! film sayisi:',results.length);
        this.movies.set(results);
        this.loading.set(false);
      },

      error: (err)=>{
        this.error.set('filmler yuklenirken hata olustu');
        this.loading.set(false);
        console.error('search error:',err);
      }
    })

  }

}
