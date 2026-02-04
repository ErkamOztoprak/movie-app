import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../movie.model';
import { BehaviorSubject } from 'rxjs';

interface MovieApiResponse {
  ok: boolean;
  description: any[];
}


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  
  constructor(private http: HttpClient) { } 

  private apiUrl='https://imdb.iamidiotareyoutoo.com/search';
  private searchTerm = new BehaviorSubject<string>('');
  searchQuery =signal<string>('');

  updateSearchTerm(term:string){
    this.searchQuery.set(term);
  }

  
  changeSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  
  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  searchMovies(query:string):Observable<Movie[]>{
  return this.http.get<MovieApiResponse>(`${this.apiUrl}?q=${query}`).pipe(map(response=>{
    if(!response.ok || !response.description){
      return[];
    }
    return response.description.map((item: any)=>({
      imdb_id: item['#IMDB_ID'],
      title: item['#TITLE'],
      year: item['#YEAR'],
      rank: item['#RANK'],
      actors: item['#ACTORS'],
      poster: item['#IMG_POSTER'],
      imdb_url: item['#IMDB_URL']


    }));
  }),
  catchError(error=>{
    console.error('Search error:',error);
    return throwError(()=>error)
  })
  );
  }
}