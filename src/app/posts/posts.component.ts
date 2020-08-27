import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PostsService} from '../services/posts.service';
import {UsersService} from '../services/users.service';
import {Post} from '../models/post';
import {User} from '../models/user';
import {NewPostDialogComponent} from './new-post-dialog/new-post-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  public posts: Post[];
  public users: User[];
  public currentUser: User;
  public innerWidth: number;
  private _subPost: Subscription;
  private _subUsers: Subscription;
  private _subscriptionList = new Subscription();

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    if ($event.target) {
      this.innerWidth = $event.target.innerWidth;
    } else {
      this.innerWidth = window.innerWidth;
    }
  };

  constructor(private _postsService: PostsService,
              private _usersService: UsersService,
              private _router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.onResize(Event);
    this.getUsers();
  }

  setCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this._router.navigateByUrl('login');
    }
  }

  getPosts() {
    this.posts = [];
    this._subPost = this._postsService.getPosts(null, null).subscribe(
      response => {
        if (response) {
          this.posts = response;
          this.posts.forEach((post) => {
            for (const user of this.users) {
              if (user.id === post.userId) {
                post.name = user.name;
              }
            }
          });
        }
      },
      error => {
        // Method to deal with error, i.e. Snack bar. Not implemented for this test.
      },
      () => {
        this._subscriptionList.add(this._subPost);
      }
    );
  }

  getUsers() {
    this._subUsers = this._usersService.users.subscribe(
      response => {
        if (response) {
          this.users = response;
          this.getPosts();
        }
      },
      error => {
      },
      () => {
        this._subscriptionList.add(this._subUsers);
      }
    );
  }

  openNewPostDialog(): void {

    let maxWidth: string;

    if (this.innerWidth > 600) {
      maxWidth = '60%';
    } else {
      maxWidth = '95%';
    }

    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      width: maxWidth,
      maxWidth: maxWidth,
      maxHeight: '95%',
      data: this.currentUser
    });
  }

  ngOnDestroy() {
    this._subscriptionList.unsubscribe();
  }

}
