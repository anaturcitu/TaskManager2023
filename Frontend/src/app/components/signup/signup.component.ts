import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toast: NgToastService, private router: Router){
  }

  ngOnInit():void{
    this.signupForm=this.fb.group({
      Username: ['',Validators.required],
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    });
  }
  onSignup(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
      .subscribe({
        next:(res) => {
          console.log(res);
          this.toast.success({detail:"Success", summary:"Your account has been created!", duration:4000});
          this.router.navigate(['login']);
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
}

