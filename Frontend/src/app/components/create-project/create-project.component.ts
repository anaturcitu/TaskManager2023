import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  createProjectForm!:FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toast: NgToastService, private router: Router){

  }

  ngOnInit():void{
    this.createProjectForm=this.fb.group({
      Name: ['',Validators.required],
      Description: ['',Validators.required]
    });
  }
  onCreateProject(){
    if(this.createProjectForm.valid){
      console.log(this.createProjectForm.value);
      this.toast.success({detail:"Success", summary:"Project created!", duration:4000});
      this.router.navigate(['user-dashboard']);
    }
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
