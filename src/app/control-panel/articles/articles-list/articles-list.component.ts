import { AuthService } from './../../../shared/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: any;
  userArticles = [];
  articlesAmount: number;
  userArticlesAmount: number;
  user;
  role;
  uid;

  constructor(private articleService: ArticleService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.getAuthState().flatMap(
      (user) => {
        this.user = user;
        if (this.user) {
          return this.userService.getUser(user.uid);
        } else {
          return [{}];
        }
      }).subscribe(
      (item) => {
        this.uid = item;
        if (this.uid[0]) {
          this.role = this.uid[0].role;
          this.uid = this.uid[0].uid;
        }
      }
      );
  }

  ngDoCheck() {
    this.articles = this.articleService.getArticles();
    if (this.articles) {
      this.articlesAmount = this.articles.length;
    }
    this.userArticles = [];
    if (this.uid && this.articles) {
      let count = 0;
      this.articles.forEach(
        (val) => {
          if (this.uid === val.author) {
            count++;
            while (this.userArticles.length < count) {
              this.userArticles.push(val);
              this.userArticlesAmount = this.userArticles.length;
            }
          }
        }
      )
    }
  }

  addNewArticle() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
