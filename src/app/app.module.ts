import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminHeaderComponent } from './control-panel/admin-header/admin-header.component';
import { AccountComponent } from './control-panel/account/account.component';
import { UsersComponent } from './control-panel/users/users.component';
import { ArticlesComponent } from './control-panel/articles/articles.component';
import { UsersListComponent } from './control-panel/users/users-list/users-list.component';
import { UserItemComponent } from './control-panel/users/users-list/user-item/user-item.component';
import { UserDetailComponent } from './control-panel/users/user-detail/user-detail.component';
import { UserService } from './control-panel/users/user.service';
import { ArticlesListComponent } from './control-panel/articles/articles-list/articles-list.component';
import { ArticleItemComponent } from './control-panel/articles/articles-list/article-item/article-item.component';
import { ArticleDetailComponent } from './control-panel/articles/article-detail/article-detail.component';
import { ArticleService } from './control-panel/articles/article.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleStartComponent } from './control-panel/articles/article-start/article-start.component';
import { UserStartComponent } from './control-panel/users/user-start/user-start.component';
import { HeaderComponent } from './home/header/header.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './home/footer/footer.component';
import { MainComponent } from './home/main/main.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { MainArticleComponent } from './home/main/main-article/main-article.component';
import { MainArticleDetailComponent } from './home/main/main-article-detail/main-article-detail.component';
import { MainCommentDetailComponent } from './home/main/main-article-detail/main-comment-detail/main-comment-detail.component';
import { AuthGuard } from './auth-guard.service';
import { AgmCoreModule } from '@agm/core';
import { NotFoundComponent } from './home/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    AdminHeaderComponent,
    AccountComponent,
    UsersComponent,
    ArticlesComponent,
    UsersListComponent,
    UserItemComponent,
    UserDetailComponent,
    ArticlesListComponent,
    ArticleItemComponent,
    ArticleDetailComponent,
    LoginComponent,
    HomeComponent,
    ArticleStartComponent,
    UserStartComponent,
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    MainComponent,
    MainArticleComponent,
    MainArticleDetailComponent,
    MainCommentDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCk21v7AIv-TphbzdPutL4o8y_YwX6aZGg'
    })
  ],
  providers: [UserService, ArticleService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
