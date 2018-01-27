import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../users/user.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() article;
  author;
  title;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.article.title.length > 38) {
      this.title = this.article.title.slice(0, 37) + '...';
    } else {
      this.title = this.article.title;
    }
    this.userService.getUser(this.article.author).subscribe(
      (item) => {
        if (item.length > 0) {
          this.author = item;
          this.author = this.author[0].name;
        } else {
          this.author = 'deleted user';
        }
      }
    )
  }

}
