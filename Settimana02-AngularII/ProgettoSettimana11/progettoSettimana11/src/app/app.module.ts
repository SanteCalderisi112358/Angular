import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms'
import { AuthGuard } from './auth/auth.guard';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes =[
  {
    path: '',
    component: HomeComponent,

  },
  {
    path:'login',
    component:LoginComponent,

  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'register',
    component: RegisterComponent,

  },

  {
    path:'movie-detail/:id',
    component: MovieDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'favorite',
    component:FavoriteComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component:NotFound404Component,
  //  canActivate: [AuthGuard]
  }




]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviesComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    MovieDetailComponent,
    FooterComponent,
    FavoriteComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule

  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
