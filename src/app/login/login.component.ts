import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {Subscription} from 'rxjs';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<boolean>();
  formGroup: FormGroup;
  private _subUsers: Subscription;
  private _subscriptionList = new Subscription();
  public users: User[];

  constructor(private _router: Router,
              private _formBuilder: FormBuilder,
              private _usersService: UsersService) {
    this.formGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    this.getUsers();
  }

  get f() {
    return this.formGroup.controls;
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

  login() {
    let user: User;
    for (const item of this.users) {
      if (item.email === this.f.email.value) {
        user = item;
        break;
      }
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.loggedIn.emit(true);
    this._router.navigateByUrl('/home');
  }

}
