import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {MyPostsComponent} from "./my-posts/my-posts.component";
import {FollowingComponent} from "./following/following.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { RouteGuard } from './auth/route-guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'myposts', component: MyPostsComponent, canActivate: [RouteGuard]},
  {path: 'following', component: FollowingComponent, canActivate: [RouteGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
