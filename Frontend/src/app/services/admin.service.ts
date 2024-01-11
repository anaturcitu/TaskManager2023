import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl:string="https://localhost:7019/api/Admin/"
  private authUrl:string="https://localhost:7019/api/Authentication/"
  constructor(private http:HttpClient, private router: Router) { }

  getAllUsers(){
    return this.http.get<any>(`${this.baseUrl}GetUsers`);
  }

  signup(registerUser:any, role:string){
    return this.http.post<any>(`${this.authUrl}Register?role=${role}`,registerUser);
  }
  
}
