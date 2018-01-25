import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user;

  constructor(private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(
      (user) => { this.user = user});
  }

}
