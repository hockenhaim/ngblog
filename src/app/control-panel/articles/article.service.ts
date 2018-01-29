import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";

@Injectable()
export class ArticleService {

  constructor(private _db: AngularFireDatabase) {}

  getArticle(aid) {
    return this._db.list('/articles', ref => ref.orderByChild('aid').equalTo(aid)).valueChanges().take(1);
  }

  getAllArticles() {
    return this._db.list('/articles').valueChanges();
  }

  getArticlesByCategory(category) {
    return this._db.list('/articles', ref => ref.orderByChild('category').equalTo(category)).valueChanges();
  } 

  addArticle(newArticle, author) {
    this._db.list('/articles').push(newArticle).then((item) => { this._db.list('/articles').update(item.key, {aid: item.key}) });
  }

  updateArticle(aid, newArticle) {
    this._db.list('/articles').update(aid, newArticle);
  }

  getComments() {
    return this._db.list('/comments/').valueChanges();
  }

  addComment(newComment) {
    this._db.list('/comments/').push(newComment);
  }

  deleteArticle(aid) {
    this._db.list('/articles').remove(aid);
  }
}