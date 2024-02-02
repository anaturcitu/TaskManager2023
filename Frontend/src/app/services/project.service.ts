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

  createNewTask(newTask:any, project_id:any){
    if(newTask.Priority=="low"){
      newTask.Priority=0;
    }
    else if(newTask.Priority=="medium"){
      newTask.Priority=1;
    }
    else if(newTask.Priority=="high"){
      newTask.Priority=2;
    }
    const param={...newTask, project_id}; // incapsulam cele 2 obiecte intr-unul singur
    console.log(param);
    return this.http.post<any>(`${this.baseUrl}CreateNewTask`,param);
  }

  getUserTasks(){
    return this.http.get<any>(`${this.baseUrl}GetUserTasks`);
  }
}
