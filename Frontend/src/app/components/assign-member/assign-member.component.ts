import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrls: ['./assign-member.component.css']
})
export class AssignMemberComponent {
  addByEmailForm!:FormGroup;
  addByUsernameForm!:FormGroup;
  constructor(private projectService: ProjectService, private toast: NgToastService, private router: Router, private renderer: Renderer2, private el: ElementRef, private auth: AuthService, private fb: FormBuilder){
  }
  public projects: any = [];
  ngOnInit(){
    this.renderer.listen(this.el.nativeElement.querySelector('#option1'),'click',()=>{
      this.showEmailOption();
    });
    this.renderer.listen(this.el.nativeElement.querySelector('#option2'),'click',()=>{
      this.showUsernameOption();
    });
    this.projectService.getUserProjects()
    .subscribe(res => {
      this.projects = res;
    })
    this.addByEmailForm=this.fb.group({
      Email: ['',Validators.required],
      ProjectName: ['',Validators.required]
    });
    this.addByUsernameForm=this.fb.group({
      Username: ['',Validators.required],
      ProjectName: ['',Validators.required]
    });
  }
  onCreateByEmail(){
    if(this.addByEmailForm.valid){
      this.projectService.assignMemberToProject(this.addByEmailForm.value)
      .subscribe({
        next:(res) => {
          this.toast.success({detail:"Success", summary:"You added the user to project!", duration:4000});
        },
        error:(err)=>{
          console.log(err?.error.message);
          this.toast.error({detail:"Error", summary:"Invalid user!", duration:4000});
        }
      });
    }
    else{
      console.log("Invalid data from user");
    }

  }

  onCreateByUsername(){
    if(this.addByUsernameForm.valid){
      this.projectService.assignMemberToProject(this.addByUsernameForm.value)
      .subscribe({
        next:(res) => {
          this.toast.success({detail:"Success", summary:"You added the user to project!", duration:4000});
        },
        error:(err)=>{
          console.log(err?.error.message);
          this.toast.error({detail:"Error", summary:"Invalid user!", duration:4000});
        }
      });
    }
    else{
      console.log("Invalid data from user");
    }

  }

  showEmailOption(){
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_email'),'display','block');
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_username'),'display','none');
  }

  showUsernameOption(){
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_email'),'display','none');
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_username'),'display','block');
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
