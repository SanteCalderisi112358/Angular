import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import { Favorites } from '../models/favorites.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  baseUrl = environment.baseUrl;
  userProfile!: User;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  utente!: AuthData;
  user$ = this.authSubj.asObservable();
  timeLogout: any;
  constructor(private http: HttpClient, private router: Router) {}

  login(data: User) {
    return this.http.post<AuthData>(`${this.baseUrl}login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.router.navigate(['/movies']);
        this.authSubj.next(data);
        this.utente = data;
        console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(data));
        this.autologout(data);
        this.userProfile = data.user;
      })
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    } else {
      const userData: AuthData = JSON.parse(user);
      if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
        return;
      }
      this.authSubj.next(userData);
      this.autologout(userData);
      this.userProfile = userData.user;
    }
  }

  signup(data: {
    nome: string;
    cognome: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.baseUrl}register`, data);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('registrationDate')
    this.router.navigate(['/']);
    if (this.timeLogout) {
      clearTimeout(this.timeLogout);
    }
  }
  autologout(data: AuthData) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(
      data.accessToken
    ) as Date;
    const expirationMilliseconds =
      expirationDate.getTime() - new Date().getTime();
    this.timeLogout = setTimeout(() => {
      this.logout();
    }, expirationMilliseconds);
  }

  getUserData(): User {
    return this.userProfile;
  }
}
