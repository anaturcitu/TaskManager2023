import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(private projectService: ProjectService, private router: Router, private auth: AuthService){

  }

  public projects: any = [];
  ngOnInit(){ // prima functie care se apeleaza cand se incarca pagina
    this.projectService.getUserProjects()
    .subscribe(res => { // lista cu proiectele utilizatorului
      this.projects = res; // se pune in tabelul din html
    })
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

  create_project() {
    this.router.navigate(['create-project']);
  }

  create_task() {
    this.router.navigate(['create-task']);
  }

  assign_member() {
    this.router.navigate(['assign-member']);
  }

  view_tasks() {
    this.router.navigate(['view-tasks']);
  }
}
