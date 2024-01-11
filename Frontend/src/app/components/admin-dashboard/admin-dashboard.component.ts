import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgToastService } from 'ng-angular-popup';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  createUserForm!:FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private adminApi: AdminService, private toast: NgToastService, private auth: AuthService){

  }

  public users: any = [];

  ngOnInit():void{
    this.createUserForm=this.fb.group({
      Username: ['',Validators.required],
      Email: ['',Validators.required],
      Password: ['',Validators.required],
      Role: ['',Validators.required]
    });
    this.adminApi.getAllUsers()
    .subscribe(res => {
      this.users = res;
      console.log(this.users);
    })
  }

  onSignup(){
    if(this.createUserForm.valid){
      this.adminApi.signup(this.createUserForm.value, this.createUserForm.value.Role)
      .subscribe({
        next:(res) => {
          console.log(res);
          this.toast.success({detail:"Success", summary:"You created an account!", duration:4000});
        },
        error:(err)=>{
          console.log(err?.error.message);
          this.toast.error({detail:"Error", summary:"Something went wrong!", duration:4000});
        }
      });
    }
    else{
      console.log("Invalid data from user");
    }

  }

  home() {
    this.router.navigate(['admin-dashboard']);
  }

  logout() {
    this.router.navigate(['login']);
    this.auth.signOut();
  }

  onCreate() {
    
  }
}
