import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from '../../../shared/auth.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  id: string;
  articleForm: FormGroup;
  editMode = false;
  article;
  author;
  authorName;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private userService: UserService) {

  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(
      (user) => this.author = user
    );


    this.route.params
      .flatMap((params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          return this.articleService.getArticle(params['id']);
        } else {
          return [{}];
        }
      })
      .subscribe((item) => {
        this.article = item;
        this.initForm();
      });

  }

  initForm() {

    let articleTitle = '';
    let articleImagePath = '';
    let articleText = '';

    if (this.editMode) {
      articleTitle = this.article[0].title;
      articleImagePath = this.article[0].profile_picture;
      articleText = this.article[0].text;
      this.authorName = this.article[0].author;

      this.userService.getUser(this.authorName).subscribe(
        (item) => {
          if (item.length > 0) {
            this.authorName = item;
            this.authorName = this.authorName[0].name;
          } else {
            this.authorName = 'deleted user';
          }
        }
      );
    }

    this.articleForm = new FormGroup({
      'title': new FormControl(articleTitle, Validators.required),
      'imagePath': new FormControl(articleImagePath, Validators.required),
      'text': new FormControl(articleText, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.author);
    const updatedArticle = {
      'title': this.articleForm.value['title'],
      'profile_picture': this.articleForm.value['imagePath'],
      'text': this.articleForm.value['text']
    };
    const newArticle = {
      'title': this.articleForm.value['title'],
      'profile_picture': this.articleForm.value['imagePath'],
      'text': this.articleForm.value['text'],
      'author': this.author.uid,
      'added' : new Date().toISOString().slice(0,10)
    };
    if (this.editMode) {
      this.articleService.updateArticle(this.id, updatedArticle);
    } else {
      this.articleService.addArticle(newArticle, this.author);
    }
    this.clear();
  }

  onDelete() {
    this.articleService.deleteArticle(this.id);
    this.clear();
  }

  clear() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
