import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {User} from '../models/user';
import {UsersService} from '../services/users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  gridCols: number;
  innerWidth: number;
  tileHeight: string;
  private _subUsers: Subscription;
  private _subscriptionList = new Subscription();
  public users: User[];

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    if ($event.target) {
      this.innerWidth = $event.target.innerWidth;
    } else {
      this.innerWidth = window.innerWidth;
    }
    this.setGrid(this.innerWidth);
  };

  constructor(private _usersService: UsersService) {
  }

  ngOnInit(): void {
    this.onResize(Event);
    this.getUsers();
  }

  setGrid(width) {
    this.tileHeight = '2:1.3';
    if (width < 467) {
      this.gridCols = 1;
    } else if (width >= 468 && width < 959) {
      this.gridCols = 2;
    } else if (width >= 960 && width < 1200) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  getUsers() {
    this._subUsers = this._usersService.users.subscribe(
      response => {
        if (response) {
          this.users = response;
        }
      },
      error => {
      },
      () => {
        this._subscriptionList.add(this._subUsers);
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionList.unsubscribe();
  }

}
