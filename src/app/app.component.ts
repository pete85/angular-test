import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {UsersService} from './services/users.service';
import {Subscription} from 'rxjs';
import {User} from './models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'chambers';
  public currentUser: User;
  private _subUser: Subscription;
  private _subscriptionList = new Subscription();

  @ViewChild('sideNav', { static: false })
  drawer: MatSidenav;

  constructor(private _usersService: UsersService,
              private _router: Router) {
  }

  ngOnInit() {
    this.setCurrentUser();
    this.getUsers();
  }

  setCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this._router.navigateByUrl('login');
    }
  }

  getUsers() {
    this._subUser = this._usersService.getUsers(null).subscribe(
      response => {
        if (response) {
          this._usersService.setUsers(response);
        }
      },
      error => {},
      () => {
        this._subscriptionList.add(this._subUser);
      }
    )
  }

  ngOnDestroy() {
    this._subscriptionList.unsubscribe();
  }
}
