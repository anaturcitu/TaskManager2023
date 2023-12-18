import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7019/api/Authentication/"
  constructor(private http:HttpClient, private router: Router) { }

  login(loginUser:any){
    return this.http.post<any>(`${this.baseUrl}Login`,loginUser);
  }
  signup(registerUser:any){
    return this.http.post<any>(`${this.baseUrl}Register?role=User`,registerUser);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
