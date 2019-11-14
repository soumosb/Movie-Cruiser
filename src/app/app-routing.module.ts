import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites/favourites.component';
import { MovieComponent } from './movie/movie/movie.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { NotFoundComponent } from './site/not-found/not-found.component';




const routes: Routes = [
  {
    path: "favourites",
    component: FavouritesComponent
  },
  {
    path: "movie",
    component: MovieComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "favourites",
    component: FavouritesComponent
  },
  {
    path: "",
    redirectTo: "movie",
    pathMatch: "full"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
