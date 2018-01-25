import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, DoCheck {
  users: any;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  ngDoCheck() {
    this.users = this.userService.getUsers();
  }

  addNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
