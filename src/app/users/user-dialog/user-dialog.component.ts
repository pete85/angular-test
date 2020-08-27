import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {Subscription} from 'rxjs';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  public posts: Post[];
  private _subPost: Subscription;
  private _subscriptionList = new Subscription();
  postsToShow: number = 3;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private _postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts(null, this.data.id);
  }

  getPosts(post_id, user_id) {
    this.posts = [];
    this._subPost = this._postsService.getPosts(post_id, user_id).subscribe(
      response => {
        if (response) {
          this.posts = response;
        }
      },
      error => {},
      () => {
        this._subscriptionList.add(this._subPost);
      }
    );
  }

  showMorePosts() {
    this.postsToShow += 3;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
