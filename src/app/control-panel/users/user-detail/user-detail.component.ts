import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  id: string;
  userForm: FormGroup;
  userRole: string;
  editMode = false;
  user;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

  }

  ngOnInit() {
    this.route.params
      .flatMap((params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          return this.userService.getUser(params['id']);
        } else {
          return [{}];
        }
      })
      .subscribe((item) => {
        this.user = item;
        this.userRole = this.user[0].role;
        this.initForm();
      });
  }

  initForm() {
    let userName = '';
    let userImagePath = '';
    let userRole = '';

    if (this.editMode) {
      userName = this.user[0].name;
      userImagePath = this.user[0].profile_picture;
      userRole = this.user[0].role;
    }

    this.userForm = new FormGroup({
      'name': new FormControl(userName, Validators.required),
      'imagePath': new FormControl(userImagePath, Validators.required),
      'role': new FormControl(userRole, Validators.required),
    })
  }

  onSubmit() {
    const newUser = {
      'name': this.userForm.value['name'],
      'profile_picture': this.userForm.value['imagePath'],
      'role': this.userForm.value['role']
    };
    if (this.editMode) {
      this.userService.updateUser(this.id, newUser);
    } else {
      this.userService.addUser(newUser);
    }
    this.clear();
  }

  onDelete() {
    this.userService.deleteUser(this.id);
    this.clear();
  }

  clear() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  }
