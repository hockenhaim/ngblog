import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { AuthService } from '../../shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user;
  accountForm: FormGroup;

  constructor(private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuthState().flatMap(
      (user) => {
        this.user = user;
        if (this.user) {
          return this.userService.getUser(this.user.uid);
        } else {
          return [{}];
        }
      }).subscribe(
      (item) => {
        this.user = item;
        if (this.user) {
          this.user = this.user[0];
          this.initForm();
        }
      }
      );
  }


  initForm() {
    if (this.user) {
      let userName = this.user.name;
      let userImagePath = this.user.profile_picture;

      this.accountForm = new FormGroup({
        'name': new FormControl(userName, Validators.required),
        'imagePath': new FormControl(userImagePath, Validators.required)
      });
    }
  }

  onSubmit() {
    const userInfo = {
      'name': this.accountForm.value['name'],
      'profile_picture': this.accountForm.value['imagePath']
    };
    this.userService.updateUser(this.user.uid, userInfo);
  }

}
