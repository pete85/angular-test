import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {UsersService} from './services/users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chambers';

  @ViewChild('sideNav', { static: false })
  drawer: MatSidenav;
  private _subUser: Subscription;
  private _subscriptionList = new Subscription();

  constructor(private _usersService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
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
