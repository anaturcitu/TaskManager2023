import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(private router: Router, private auth: AuthService){

  }

  home() {
    this.router.navigate(['user-dashboard']);
  }

  logout() {
    this.router.navigate(['login']);
    this.auth.signOut();
  }

  notification() {
    this.router.navigate(['notification']);
  }
}
