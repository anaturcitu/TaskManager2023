import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl:string="https://localhost:7019/api/Project/"
  constructor(private http:HttpClient, private router: Router) { }

  getUserProjects(){
    return this.http.get<any>(`${this.baseUrl}GetUserProjects`);
  }

  createProject(registerProject:any){
    return this.http.post<any>(`${this.baseUrl}CreateProject`,registerProject);
  }
  assignMemberToProject(newUser:any){
    console.log(newUser);
    return this.http.post<any>(`${this.baseUrl}AssignNewMember`,newUser);
  }
}
