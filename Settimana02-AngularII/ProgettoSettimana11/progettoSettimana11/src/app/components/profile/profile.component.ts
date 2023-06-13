import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  registrationDate!: Date;

  constructor(private authSrv: AuthService) {}

  ngOnInit() {
    this.user = this.authSrv.recuperoUserDati();
    console.log(this.user);

    const storedRegistrationDate = localStorage.getItem('registrationDate');
    if (storedRegistrationDate) {
      this.registrationDate = new Date(storedRegistrationDate);
    } else {
      this.registrationDate = this.generateRandomDate();
      localStorage.setItem('registrationDate', this.registrationDate.toString());
    }
  }

  generateRandomDate(): Date {
    const today = new Date();
    const pastDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
    const randomTimestamp =
      Math.random() * (today.getTime() - pastDate.getTime()) +
      pastDate.getTime();
    return new Date(randomTimestamp);
  }
}
