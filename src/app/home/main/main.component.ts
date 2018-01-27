import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../control-panel/users/user.service';
import { ArticleService } from '../../control-panel/articles/article.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  articles;
  user;
  storage;
  photo;

  constructor(private authService: AuthService,
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAuthState().flatMap(
      (item) => {
        this.user = item;
        if (this.user) {
          return [this.user];
        } else {
          return [{}];
        }
      }).flatMap(
        (thing) =>{
          this.storage = thing;
          if (this.storage.uid) {
            return this.userService.getUser(this.storage.uid);
          } else {
            return [{}];
          }
        }
      ).subscribe(
        (param) => {
          this.photo = param;
          if (this.photo[0]) {
            this.photo = this.photo[0].profile_picture;
          }
          if (this.photo === null) {
            this.photo = this.authService.profilePlaceholder;
          }
        }
      );
  }

  reverse() {
    this.articles.reverse();
  }

  ngDoCheck() {
    this.articles = this.articleService.getArticles();
  }

  onShare() {
    if (this.user) {
      this.router.navigate(['/control-panel/articles/new']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
