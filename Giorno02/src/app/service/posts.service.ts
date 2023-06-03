import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})


export class PostsService {


  constructor() { }
  async getActive():Promise<any>{
    return fetch('../assets/db.json').then(response => response.json())

    }

  }

