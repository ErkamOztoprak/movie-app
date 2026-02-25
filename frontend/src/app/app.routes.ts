import { Routes } from "@angular/router"; 
import { HomePage } from "./home-page/home-page";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { RegisterPage } from "./register-page/register-page";
import { LoginPage } from "./login-page/login-page";

export const routes: Routes=[
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'register-page',
        component: RegisterPage,
    },
    {
        path:'login-page',
        component:LoginPage,
    }
];