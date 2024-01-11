import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7019/api/Authentication/"
  private userPayload:any;
  constructor(private http:HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  login(loginUser:any){
    return this.http.post<any>(`${this.baseUrl}Login`,loginUser);
  }
  signup(registerUser:any){
    return this.http.post<any>(`${this.baseUrl}Register?role=User`,registerUser);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeUserId(idValue:string){
    localStorage.setItem('user_id', idValue)
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
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
}
