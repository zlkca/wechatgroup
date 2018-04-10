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
  isLogin:boolean = false;

  constructor(private translate:TranslateService, private router:Router, private authServ: AuthService) {

  }

  ngOnInit() {
    let self = this;

    // check logged in or not
    self.authServ.checkToken().subscribe(
      (r:boolean)=>{
        self.isLogin = r;
        if(r){
          //self.uiServ.emitMsg({name:'OnUpdateHeader'});
          self.toPage("admin/wechatgroups");
        }else{
          self.toPage("admin/login");
        }
      },(err:any)=>{
        self.toPage("admin/login");
      });
  }

  toPage(url:string){
    this.router.navigate([url]);
  }
}
