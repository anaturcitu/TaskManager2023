import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toast: NgToastService, private router: Router){

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
          this.authService.storeToken(res.token);
          console.log("expiration:");
          console.log(res.expiration);
          this.toast.success({detail:"Success", summary:"Welcome!", duration:4000});
          this.router.navigate(['user-dashboard']);
          // this.router.navigate(['admin-dashboard']);
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
