import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {PostsComponent} from './posts/posts.component';
import {UsersComponent} from './users/users.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'users', component: UsersComponent},
  // {path: 'login', component: UserLoginComponent, canActivate: [NavigationGuard]},
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  //   canActivate: [AuthGuard, NavigationGuard],
  //   data: { preload: false }
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    // preloadingStrategy: CustomPreloadingStrategyService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
