import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  baseUrl = environment.baseUrl;
  user!:User
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  utente!: AuthData;
  user$ = this.authSubj.asObservable();
  timeLogout: any;
  constructor(private http: HttpClient, private router:Router) {}

  login(data: User) {
    return this.http.post<AuthData>(`${this.baseUrl}login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.router.navigate(['/movies'])
        this.authSubj.next(data)
        this.utente = data
        console.log(this.utente)
        localStorage.setItem('user', JSON.stringify(data))
        this.autologout(data)
        this.user = {
          nome: data.user.nome,
          cognome: data.user.cognome,
          email: data.user.email,
          password: data.user.password


        }

      })
    );
  }


  restore(){
    const user = localStorage.getItem('user')
    if(!user){
      return
    }
    const userData:AuthData = JSON.parse(user)
    if(this.jwtHelper.isTokenExpired(userData.accessToken)){
      return
    }
    this.authSubj.next(userData)
    this.autologout(userData)
  }

  signup(data:{nome:string; cognome:string; email:string; password:string}){
    return this.http.post(`${this.baseUrl}register`, data)
  }

  logout(){
    this.authSubj.next(null)
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    if(this.timeLogout){
      clearTimeout(this.timeLogout)
    }
  }
  autologout(data:AuthData){
    const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
    const expirationMilliseconds = expirationDate.getTime() - new Date().getTime()
    this.timeLogout = setTimeout(()=>{
      this.logout()
    }, expirationMilliseconds)
  }

  recuperoUserDati():User{


    return this.user
  }
}
