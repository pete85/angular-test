import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {PostsService} from '../services/posts.service';
import {UsersService} from '../services/users.service';
import {Post} from '../models/post';
import {User} from '../models/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  public posts: Post[];
  public users: User[];
  private _subPost: Subscription;
  private _subUser: Subscription;
  private _subscriptionList = new Subscription();

  constructor(private _postsService: PostsService,
              private _usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getPosts() {
    this.posts = [];
    this._subPost = this._postsService.getPosts(null, null).subscribe(
      response => {
        if (response) {
          this.posts = response;
          this.posts.forEach((post) => {
            console.log(post.userId);
            for (const user of this.users) {
              if (user.id === post.userId) {
                post.name = user.name;
              }
            }
          });
        }
      },
      error => {
      },
      () => {
        this._subscriptionList.add(this._subPost);
      }
    );
  }

  getUsers() {
    this._subUser = this._usersService.getUsers(null).subscribe(
      response => {
        if (response) {
          this.users = response;
        }
      },
      error => {},
      () => {
        this._subscriptionList.add(this._subUser);
        this.getPosts();
      }
    )
  }

  addName() {
  }

  ngOnDestroy() {
    this._subscriptionList.unsubscribe();
  }

}
