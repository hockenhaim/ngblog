import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, DoCheck {
  articles: any;

  constructor(private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  ngDoCheck() {
    this.articles = this.articleService.getArticles();
  }

  addNewArticle() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
