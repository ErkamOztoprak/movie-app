import { Component } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports:[MovieListComponent],
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'movie-app';

  constructor(private movieService: MovieService) {}

  onSearch(term: string){
    
    this.movieService.changeSearchTerm(term);

  }
}
