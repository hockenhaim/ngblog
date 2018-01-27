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
        return this.userService.getUser(user.uid);
      }).subscribe(
        (item) => {
          this.role = item;
          this.role = this.role[0].role;
        }
      );
  }

  ngDoCheck() {
    
  }

  logout() {
    this.authService.logout();
  }

}
