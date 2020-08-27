import {Component, OnInit, Input, HostListener} from '@angular/core';
import {Post} from '../../models/post';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  innerWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    if ($event.target) {
      this.innerWidth = $event.target.innerWidth;
    } else {
      this.innerWidth = window.innerWidth;
    }
  };

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onResize(Event);
  }

  openPostDialog(): void {

    let maxWidth: string;

    if (this.innerWidth > 600) {
      maxWidth = '50%';
    } else {
      maxWidth = '95%';
    }

    const dialogRef = this.dialog.open(PostDialogComponent, {
      maxWidth: maxWidth,
      maxHeight: '95%',
      data: this.post
    });
  }

}
