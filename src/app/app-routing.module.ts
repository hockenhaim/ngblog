import { ArticleStartComponent } from './control-panel/articles/article-start/article-start.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, CanActivateChild } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AccountComponent } from './control-panel/account/account.component';
import { UsersComponent } from './control-panel/users/users.component';
import { ArticlesComponent } from './control-panel/articles/articles.component';
import { UserDetailComponent } from './control-panel/users/user-detail/user-detail.component';
import { ArticleDetailComponent } from './control-panel/articles/article-detail/article-detail.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserStartComponent } from './control-panel/users/user-start/user-start.component';
import { ContactComponent } from './home/contact/contact.component';
import { MainComponent } from './home/main/main.component';
import { MainArticleComponent } from './home/main/main-article/main-article.component';
import { MainArticleDetailComponent } from './home/main/main-article-detail/main-article-detail.component';
import { MainCommentDetailComponent } from './home/main/main-article-detail/main-comment-detail/main-comment-detail.component';
import { AuthGuard } from './auth-guard.service';
import { NotFoundComponent } from './home/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: MainComponent, children: [
      { path: '', component: MainArticleComponent },
    ]},
    { path: 'article/:id', component: MainArticleDetailComponent},
    { path: 'article/:id', component: MainCommentDetailComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'not-found', component: NotFoundComponent},
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'control-panel', canActivateChild: [AuthGuard], component: ControlPanelComponent, children: [
    { path: 'account', component: AccountComponent},
    { path: 'users', component: UsersComponent, children: [
      { path: '', component: UserStartComponent},
      { path: 'new', component: UserDetailComponent},
      { path: ':id', component: UserDetailComponent},
    ]},
    { path: 'articles', component: ArticlesComponent, children: [
      { path: '', component: ArticleStartComponent},
      { path: 'new', component: ArticleDetailComponent},
      { path: ':id', component: ArticleDetailComponent},
    ]},
  ]},
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}