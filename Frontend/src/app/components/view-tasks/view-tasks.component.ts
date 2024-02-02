import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent {
  constructor(private projectService: ProjectService, private authService: AuthService, private toast: NgToastService, private router: Router){

  }

  public userTasks: any = [];
  ngOnInit(){
    this.projectService.getUserTasks()
    .subscribe(res => {
      this.userTasks = res;
    })
  }
  
  home() {
    this.router.navigate(['user-dashboard']);
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.signOut();
  }

  notification() {
    this.router.navigate(['notification']);
  }

}
