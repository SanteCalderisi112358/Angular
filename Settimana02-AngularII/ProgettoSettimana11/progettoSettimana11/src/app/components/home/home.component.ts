import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: AuthData|null
  constructor(private autSrv:AuthService) { }

  ngOnInit(): void {
    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      console.log(this.user)
    })
  }

}
