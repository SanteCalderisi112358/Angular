import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false
  constructor(private authServ:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  accedi(form:NgForm){
    this.isLoading = true
    console.log(form.value)
    try {
      this.authServ.login(form.value).subscribe(
        () => {
          this.router.navigate(['/movies']);
          this.isLoading = false;
        },
        (error) => {
          console.error(error.error);
          if (error.error === 'Incorrect password') {
            alert('Occhio, pirata! Hai sbagliato password!');
          }
          this.isLoading = false;
        }
      );
    } catch (error: any) {
      console.error(error);
      this.isLoading = false;
    }



  }
}
