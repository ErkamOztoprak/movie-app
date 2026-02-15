import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../movie.model';
import { BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';


interface MovieApiResponse {
  ok: boolean;
  description: any[];
  short:any;
  imdbId:number;
  name:string;
  datePublished:Date;
  aggregateRating:number;
  actors:string;
  posters:string;
  imdb_url:string;
}


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  
  constructor(private http: HttpClient) { } 

  private apiUrl = 'https://imdb.iamidiotareyoutoo.com/search';
  private searchTerm = new BehaviorSubject<string>('');
  private artHouseMovies = [
    // Rus Sineması
    'tt0079944', // Stalker (1979) - Tarkovsky
    'tt0069293', // Solaris (1972) - Tarkovsky
    'tt0060107', // Andrei Rublev (1966) - Tarkovsky
    'tt0050808', // The Cranes Are Flying (1957)
    'tt0387564', // The Return (2003) - Zvyagintsev
    'tt2802144', // Leviathan (2014) - Zvyagintsev
    'tt0071411', // The Mirror (1975) - Tarkovsky
    'tt0094809', // Come and See (1985)
    
    // Türk Sineması
    'tt0770828', // Uzak (2002) - Ceylan
    'tt1827487', // Bir Zamanlar Anadolu'da (2011) - Ceylan
    'tt2758880', // Kış Uykusu (2014) - Ceylan ⭐ Altın Palmiye
    'tt6628102', // Ahlat Ağacı (2018) - Ceylan
    'tt0436254', // İklimler (2006) - Ceylan
    'tt0456100', // Üç Maymun (2008) - Ceylan
    'tt3181776', // Mustang (2015)
    'tt0323965', // Yazgı (2001) - Demirkubuz
    'tt1171701', // Bal (2010) - Kaplanoğlu ⭐ Altın Ayı
    
    // İran Sineması
    'tt1302011', // A Separation (2011) - Farhadi ⭐ Oscar
    'tt2576852', // The Salesman (2016) - Farhadi ⭐ Oscar
    'tt2404225', // The Past (2013) - Farhadi
    'tt0118849', // Taste of Cherry (1997) - Kiarostami ⭐ Altın Palmiye
    'tt0101636', // Close-Up (1990) - Kiarostami
    'tt0093341', // Where Is the Friend's House? (1987) - Kiarostami
    'tt6108122', // Taxi Tehran (2015) - Panahi ⭐ Altın Ayı
    'tt0107666', // The White Balloon (1995) - Panahi
    'tt0156461', // The Circle (2000) - Panahi
    'tt0118843', // Children of Heaven (1997) - Majidi
    'tt0191043'  // The Color of Paradise (1999) - Majidi
  ];
  searchQuery =signal<string>('');

  updateSearchTerm(term:string){
    this.searchQuery.set(term);
  }
 
  changeSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  getdefaultMovies():Observable<Movie[]>{
    const urls = this.artHouseMovies.map(id => `${this.apiUrl}?tt=${id}`);
    const request = urls.map(url => this.http.get<MovieApiResponse>(url));
    
    return forkJoin(request).pipe(
      map(response=>{
        return response
        .map(r=>r.short)
        .filter(Boolean)
        .map(s=>({
          imdb_id: s.imdbId,
          title: s.name,
          year: s.datePublished?.slice(0,4),
          rank: s.aggregateRating?.ratingValue,
          actors:(s.actor || []).map((a:any)=>a.name).join(','),
          poster: s.image,
          imdb_url:s.url
        }));
      })
    )
  }
 
  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  searchMovies(query: string): Observable<Movie[]> {
  const params = new HttpParams().set('q', query);
  return this.http.get<MovieApiResponse>(this.apiUrl, { params }).pipe(map(response=>{
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