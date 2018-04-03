import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    providers: [AuthService],
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private translate:TranslateService, private router:Router, private authServ: AuthService) {

  }

  ngOnInit() {
      if(this.authServ.hasLoggedIn()){
          this.toPage("admin/wechatgroups");
      }else{
          this.toPage("admin/login");
      }
  }

  toPage(url:string){
    this.router.navigate([url]);
  }
}
