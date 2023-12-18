import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  createUserForm!:FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService){

  }

  ngOnInit():void{
    this.createUserForm=this.fb.group({
      Username: ['',Validators.required],
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    });
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
