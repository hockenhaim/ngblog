import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../control-panel/articles/article.service';
import { UserService } from '../../../control-panel/users/user.service';

@Component({
  selector: 'app-main-article',
  templateUrl: './main-article.component.html',
  styleUrls: ['./main-article.component.scss']
})
export class MainArticleComponent implements OnInit {
  @Input() article;
  authorName;

  constructor(
    private articleService: ArticleService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(this.article.author).subscribe(
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
}

