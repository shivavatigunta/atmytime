import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getPost().subscribe(
      response => {
        this.posts = response;
      }
    );
  }

  createPost(input: HTMLInputElement) {
    const post: any = {
      title: input.value
    };
    input.value = '';
    this.service.createPost(post).subscribe(
      response => {
        post['id'] = response[0];
        this.posts.splice(0, 0, post);
      }
    );
  }

  updatePost(post) {
    this.service.updatePost(post).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  deletePost(post) {
    this.service.deletePost(post.id).subscribe(
      response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }
    );
  }
}
