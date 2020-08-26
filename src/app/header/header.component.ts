import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() sideNavMenu: MatDrawer;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  goHome() {
    this._router.navigateByUrl('');
  }
}
