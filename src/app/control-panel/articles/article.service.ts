import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";

@Injectable()
export class ArticleService {
  private articles;
  private comments;

  constructor(private _db: AngularFireDatabase) {
    this._db.list('/articles').valueChanges().subscribe(
      (item ) => {
        this.articles = item;
        this.articles.reverse();
      }
    );
    this._db.list('/comments/').valueChanges().subscribe(
      (item ) =>this.comments = item
    );
  }

  getArticle(aid) {
    return this._db.list('/articles', ref => ref.orderByChild('aid').equalTo(aid)).valueChanges().take(1);
  }

  addArticle(newArticle, author) {
    this._db.list('/articles').push(newArticle).then((item) => { this._db.list('/articles').update(item.key, {aid: item.key}) });
  }

  updateArticle(aid, newArticle) {
    this._db.list('/articles').update(aid, newArticle);
  }

  getComments() {
    return this.comments;
  }

  addComment(newComment) {
    this._db.list('/comments/').push(newComment);
    console.log('done');
  }

  deleteArticle(aid) {
    this._db.list('/articles').remove(aid);
  }

  getArticles() {
    return this.articles;
  }
}