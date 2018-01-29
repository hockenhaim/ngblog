import { UserDetailComponent } from './../users/user-detail/user-detail.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  user = null;
  role;

  constructor(private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.authService.getAuthState().flatMap(
      (user) => {
        this.user = user;
        if (this.user) {
          return this.userService.getUser(user.uid);
        } else {
          return [{}];
        }
      }).subscribe(
        (item) => {
          this.role = item;
          if (this.role[0]) {
            this.role = this.role[0].role;
          }
        }
      );
  }

  logout() {
    this.authService.logout();
  }

}
