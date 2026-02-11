import { Component,signal, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service';
import { Movie } from '../movie.model';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-movie-list',

  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {

  constructor(private movieService:MovieService){}

  movies= signal<Movie[]>([]);
  loading=signal<boolean>(false);
  error=signal<string>('');
  initLoading=signal<boolean>(false);
  
  
  ngOnInit() {
    this.loadMovies();
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
          this.loadMovies();
        }
      });
  }
  loadMovies():void{
    this.initLoading.set(true);
    this.error.set('');
    this.movieService.getdefaultMovies().subscribe({
      next: (movies: Movie[]) => {
        this.movies.set(movies);
        this.initLoading.set(false);
      
      },
      error:(err)=>{
        this.error.set('filmler yuklenirken hata !');
        this.initLoading.set(false);
        console.error('default movies error:',err);
      }
    })

  }

  searchMovies(query: string):void{
    if(!query || query.trim()==='')
      return;
    
    this.loading.set(true);
    this.error.set('');
    this.movieService.searchMovies(query).subscribe({
      next:(results:Movie[]) => {
        console.log('basarili! film sayisi:',results.length);
        this.loading.set(false);
        this.movies.set(results);
      },
      error: (err)=>{
        this.error.set('filmler yuklenirken hata olustu');
        this.loading.set(false);
        console.error('search error:',err);
      }
    })

  }

}
