import { ArticleService } from './../../../control-panel/articles/article.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../control-panel/users/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-main-article-detail',
  templateUrl: './main-article-detail.component.html',
  styleUrls: ['./main-article-detail.component.scss']
})
export class MainArticleDetailComponent implements OnInit {
  textSection;
  activeUser;
  articles;
  article;
  user;
  comments;
  commentForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState().flatMap(
      (user) => {
        this.activeUser = user;
        if (this.activeUser) {
          return this.userService.getUser(this.activeUser.uid);
        } else {
          return [{}];
        }
      }).subscribe(
      (item) => {
        this.activeUser = item;
        if (this.activeUser.length > 0) {
          this.activeUser = this.activeUser[0].name;
        }
      }
      );
    this.route.params.flatMap(
      (params) => this.articleService.getArticle(params['id'])
    ).flatMap(
      (article) => {
        this.article = article;
        this.article = article[0];
        this.initForm();
        return this.userService.getUser(this.article.author);
      }
      ).subscribe(
      (item) => {
        this.user = item;
        this.user = this.user[0].name;
      }
      );
    this.articleService.getAllArticles().subscribe(
      (item) => {
        this.articles = item;
        this.articles.reverse();
      }
    )
  }

  ngAfterViewChecked() {
    this.textSection = document.getElementById("text");
    if (this.article) {
      this.textSection.innerText = this.article.text;
    }
  }

  initForm() {
    let comment = '';

    this.commentForm = new FormGroup({
      'comment': new FormControl(comment, Validators.required)
    })
  }

  onSubmit() {
    const newComment = {
      'comment': this.commentForm.value['comment'],
      'user': this.activeUser,
      'article': this.article.aid,
      'time': new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };
    this.articleService.addComment(newComment);
    this.commentForm.reset();
  }
}

