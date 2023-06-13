import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.component.html',
  styleUrls: ['./not-found404.component.scss']
})
export class NotFound404Component implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  comeBack(){
    this.router.navigate(['/movies'])
  }
}
