import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrls: ['./inactive-posts.component.scss']
})
export class InactivePostsComponent implements OnInit {

  datiPost: Posts[] = []
  constructor(private postSrv:PostsService) {
    this.postSrv.getActive()
    .then(post => {
      this.datiPost = post
      console.log(this.datiPost)
    })



   }

  ngOnInit(): void {
  }

}
