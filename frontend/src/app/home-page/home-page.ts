import { Component } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [MovieListComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  
  constructor(private movieService: MovieService,private router:Router) {}

  onSearch(term: string){
    
    this.movieService.changeSearchTerm(term);

  }
  navigateToRegister(){
    this.router.navigate(['/register-page']);
  }
  navigateToLogin(){
    this.router.navigate(['/login-page']);
  }

}
