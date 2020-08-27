import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {PostsService} from '../../services/posts.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.css']
})
export class NewPostDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  formPayload: Post;
  subNewPost: Subscription;
  sending: boolean;
  sentOK: boolean;

  constructor(private _postsService: PostsService,
              private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<NewPostDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) {
    this.formGroup = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      body: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.formGroup.controls;
  }

  constructPayload() {
    this.formPayload = {
      title: this.f.title.value,
      body: this.f.body.value,
      userId: this.data.id
    }
    return this.formPayload;
  }

  createPost() {
    this.sending = true;
    this.subNewPost = this._postsService.createPost(this.constructPayload()).subscribe(
      response => {
        if (response) {
          this.snackBar.open(response.response.title + ' was created successfully.', null, {duration: 5000});
        }
      },
      error => {},
      () => {
        this.sending = false;
        this.sentOK = true;
        this.closeDialog();
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subNewPost.unsubscribe();
  }
}
