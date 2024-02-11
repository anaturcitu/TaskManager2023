import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
      this.authService.login(this.loginForm.value)
      .subscribe({
        next:(res) => { // res contine token, data de expirare a token-ului, rol, user-id
          const helper = new JwtHelperService();

          const decodedToken = helper.decodeToken(res.token);

          this.authService.storeToken(res.token);
          this.authService.storeUserId(res.user_id);
          this.toast.success({detail:"Success", summary:"Welcome!", duration:4000});
          if (res.role=='User')
          {
            this.router.navigate(['user-dashboard']);
          }
          if (res.role=='Admin')
          {
            this.router.navigate(['admin-dashboard']);
          }
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
