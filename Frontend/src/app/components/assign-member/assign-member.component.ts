import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrls: ['./assign-member.component.css']
})
export class AssignMemberComponent {
  constructor(private toast: NgToastService, private router: Router, private renderer: Renderer2, private el: ElementRef, private auth: AuthService){
  }

  ngOnInit(){
    this.renderer.listen(this.el.nativeElement.querySelector('#option1'),'click',()=>{
      this.showEmailOption();
    });
    this.renderer.listen(this.el.nativeElement.querySelector('#option2'),'click',()=>{
      this.showUsernameOption();
    });
  }

  showEmailOption(){
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_email'),'display','block');
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_username'),'display','none');
  }

  showUsernameOption(){
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_email'),'display','none');
    this.renderer.setStyle(this.el.nativeElement.querySelector('#add_by_username'),'display','block');
  }

  home() {
    this.router.navigate(['user-dashboard']);
  }

  logout() {
    this.router.navigate(['login']);
    this.auth.signOut();
  }

  notification() {
    this.router.navigate(['notification']);
  }
}
