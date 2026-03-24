import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  
  username:string='';
  email:string='';
  password:string='';
  message:string='';
  
  private baseUrl:string='https://localhost:4200/auth';
  
  constructor(private http:HttpClient ){  }
  
  register(username:string, email:string){}

}
