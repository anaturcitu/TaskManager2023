import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  addTaskForm!:FormGroup;
  constructor(private projectService: ProjectService, private toast: NgToastService, private router: Router, private renderer: Renderer2, private el: ElementRef, private auth: AuthService, private fb: FormBuilder){
  }
  public projects: any = [];
  ngOnInit(){
    this.projectService.getUserProjects()
    .subscribe(res => {
      this.projects = res;
    })
    this.addTaskForm=this.fb.group({
      Name: ['',Validators.required],
      Description: ['',Validators.required],
      EndDate: ['',Validators.required],
      Priority: ['',Validators.required]
    });
  }

  onCreateTask() {
    
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
