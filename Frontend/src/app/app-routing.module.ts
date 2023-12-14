import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AssignMemberComponent } from './components/assign-member/assign-member.component';

const routes: Routes = [
  {path: '',redirectTo:'/home',pathMatch:'full'},
  {path: 'home',component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'user-dashboard', component: UserDashboardComponent},
  {path:'admin-dashboard', component: AdminDashboardComponent},
  {path:'notification', component: NotificationComponent},
  {path:'create-project', component: CreateProjectComponent},
  {path:'assign-member', component: AssignMemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
