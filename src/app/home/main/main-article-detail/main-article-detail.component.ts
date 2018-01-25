import { ArticleService } from './../../../control-panel/articles/article.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../control-panel/users/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-main-article-detail',
  templateUrl: './main-article-detail.component.html',
  styleUrls: ['./main-article-detail.component.scss']
})
export class MainArticleDetailComponent implements OnInit, DoCheck {
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
    this.authService.getAuthState().subscribe(
      (user) => this.activeUser = user);
    this.route.params.flatMap(
      (params) => this.articleService.getArticle(params['id'])
    ).flatMap(
      (article) => {
        this.article = article;
        this.article = article[0];
        this.initForm();
        return this.userService.getUser(this.activeUser.uid);
      }
      ).subscribe(
      (item) => {
        this.user = item;
        const div = document.getElementById("text");
        div.innerText = this.article.text;
        this.user = this.user[0].name;
      }
      );
  }

  initForm() {
    let comment = '';

    this.commentForm = new FormGroup({
      'comment': new FormControl(comment, Validators.required)
    })
  }

  ngDoCheck() {
    this.articles = this.articleService.getArticles();
  }

  onSubmit() {
    const newComment = {
      'comment': this.commentForm.value['comment'],
      'user': this.user,
      'article': this.article.aid
    };
    this.articleService.addComment(newComment);
  }
}

