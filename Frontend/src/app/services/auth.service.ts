import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7019/api/Authentication/"
  constructor(private http:HttpClient) { }

  login(loginUser:any){
    return this.http.post<any>(`${this.baseUrl}Login`,loginUser);
  }
  signup(registerUser:any){
    return this.http.post<any>(`${this.baseUrl}Register?role=User`,registerUser);
  }
}
