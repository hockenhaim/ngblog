import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";

import * as firebase from 'firebase/app';


@Injectable()

export class AuthService {
  private isUserExists: boolean;
  public profilePlaceholder = '../../assets/profile_placeholder.png';
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private _db: AngularFireDatabase) {
    this.authState = _firebaseAuth.authState;

    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getUserId() {
    return this.currentUser.uid;
  }

  getAuthState() {
    return this.authState;
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signIn(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this._firebaseAuth.auth.signOut();
  }

  writeUserData(user, name) {
    if (user != null && user.uid) {
      this._db.object('users').valueChanges().take(1).subscribe(
        (items) => {
          if (items[user.uid]) {
            this.isUserExists = true;
          }
          if (this.isUserExists) {
          } else if (this.isUserExists !== true) {
            return this._db.object('users/' + user.uid).set({
              email: user.email,
              name: user.displayName || name,
              profile_picture: user.photoURL || this.profilePlaceholder,
              role: 'user',
              uid: user.uid
            }).then(r => {
            });
          }
        }
      );
    }
  }

}
