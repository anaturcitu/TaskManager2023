import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService){

  }

  ngOnInit():void{
    this.loginForm=this.fb.group({
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    });
  }
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe({
        next:(res) => {
          console.log("token:");
          console.log(res.token);
          console.log("expiration:");
          console.log(res.expiration);
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
