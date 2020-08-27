import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;

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

  openUserDialog(): void {

    let maxWidth: string;

    if (this.innerWidth > 600) {
      maxWidth = '50%';
    } else {
      maxWidth = '95%';
    }

    const dialogRef = this.dialog.open(UserDialogComponent, {
      maxWidth: maxWidth,
      maxHeight: '95%',
      data: this.user
    });
  }

}
