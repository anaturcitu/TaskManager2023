import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService){
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
        },
        error:(err)=>{
          console.log(err?.error.message);
        }
      });
    }
    else{
      console.log("Invalid data from user");
    }

  }
}

