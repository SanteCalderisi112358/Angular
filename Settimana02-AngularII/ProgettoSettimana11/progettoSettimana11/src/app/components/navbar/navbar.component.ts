import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: AuthData|null
  constructor(private autSrv:AuthService) { }

  ngOnInit(): void {
    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      console.log(this.user)
    })
  }

  logout(){
    this.autSrv.logout()
  }
}
