import {Injectable} from '@angular/core';
import {HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private baseUrl='http://localhost:5063/auth';

    constructor(private http:HttpClient){ }

    login(username:string,password:string):Observable<string>{
        const params={username,password};
        return this.http.post(this.baseUrl+'/login',{},{params,responseType:'text'});
    }
    register(username:string,email:string,password:string):Observable<string>{
        const params={username,email,password};
        return this.http.post(this.baseUrl+'/register',{},{params,responseType:'text'});
    }
}