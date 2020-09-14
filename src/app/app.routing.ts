import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {PostsComponent} from './posts/posts.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';

export const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'users', component: UsersComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
