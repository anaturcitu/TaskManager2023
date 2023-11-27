import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  createUserForm!:FormGroup;

  constructor(private fb: FormBuilder, private router: Router){

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
  }

  onCreate() {
    
  }
}
