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
      End_date: ['',Validators.required],
      Priority: ['',Validators.required]
    });
  }

  onCreateTask(project_id:any) {
    if(this.addTaskForm.valid){
      this.projectService.createNewTask(this.addTaskForm.value, project_id)
      .subscribe({
        next:(res) => {
          this.toast.success({detail:"Success", summary:"You added a new task!", duration:4000});
        },
        error:(err)=>{
          console.log(err?.error.message);
          this.toast.error({detail:"Error", summary:"Invalid task data!", duration:4000});
        }
      });
    }
    else{
      console.log("Invalid data from user");
    }
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

  showAddTask(project_id:any){
    const element = document.getElementById(project_id);
    if (element){
      element.style.display = 'block';
    }
  }

  closeShowAddTask(project_id:any){
    const element = document.getElementById(project_id);
    if (element){
      element.style.display = 'none';
    }
  }
}
