import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";


@Injectable()
export class UserService {

  constructor(private _db: AngularFireDatabase) {}

  getUser(uid) {
    return this._db.list('/users', ref => ref.orderByChild('uid').equalTo(uid)).valueChanges().take(1);
  }

  addUser(newUser) {
    this._db.list('/users').push(newUser).then((item) => { this._db.list('/users').update(item.key, {uid: item.key}) });
  }

  updateUser(uid, newUser) {
    this._db.list('/users').update(uid, newUser);
  }

  deleteUser(uid) {
    this._db.list('/users').remove(uid);
  }

  getUsers() {
    return this._db.list('/users').valueChanges();
  }
}