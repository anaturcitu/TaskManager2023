import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(private router: Router){

  }

  home() {
    this.router.navigate(['user-dashboard']);
  }

  logout() {
    this.router.navigate(['login']);
  }

  notification() {
    this.router.navigate(['notification']);
  }

  create_project() {
    this.router.navigate(['create-project']);
  }

  assign_member() {
    this.router.navigate(['assign-member']);
  }
}
