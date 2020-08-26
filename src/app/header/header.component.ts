import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDrawer} from '@angular/material/sidenav';
import {User} from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() sideNavMenu: MatDrawer;
  currentUser: User;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  goHome() {
    this._router.navigateByUrl('');
  }
}
