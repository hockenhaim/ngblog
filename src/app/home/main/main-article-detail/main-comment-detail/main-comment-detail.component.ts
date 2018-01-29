import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../../../control-panel/articles/article.service';

@Component({
  selector: 'app-main-comment-detail',
  templateUrl: './main-comment-detail.component.html',
  styleUrls: ['./main-comment-detail.component.scss']
})
export class MainCommentDetailComponent implements OnInit {
  @Input() article;
  comments;
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getComments().subscribe(
      (item) => {
        this.comments = item;
        this.comments.reverse();
      }
    );
  }
}