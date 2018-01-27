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
export class ArticlesListComponent implements OnInit, DoCheck {
  articles: any;
  userArticles = [];
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
        return this.userService.getUser(user.uid);
      }).subscribe(
      (item) => {
        this.uid = item;
        this.role = this.uid[0].role;
        this.uid = this.uid[0].uid;
        console.log(this.role);
      }
      );
  }

  ngDoCheck() {
    this.articles = this.articleService.getArticles();
    if (this.uid && this.articles) {
      let count = 0;
      this.articles.forEach(
        (val) => {
          if (this.uid === val.author) {
            count++;
            while (this.userArticles.length < count) {
              this.userArticles.push(val);
              console.log(this.role);
              console.log(this.articles);
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
