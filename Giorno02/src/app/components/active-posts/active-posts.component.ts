import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrls: ['./active-posts.component.scss']
})
export class ActivePostsComponent implements OnInit {

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
