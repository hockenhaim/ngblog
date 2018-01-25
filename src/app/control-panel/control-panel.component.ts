import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  loggedIn = true;
  user = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe(
      (user) => this.user = user);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

}
