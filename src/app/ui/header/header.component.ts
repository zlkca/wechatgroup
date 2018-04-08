import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../account/auth.service';
import { UiService } from '../ui.service';
import { CommerceService } from '../../commerce/commerce.service';
import { CategoryListComponent } from '../../commerce/category-list/category-list.component';
import { Wechat } from '../../commerce/commerce';

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../environments/environment';
declare var $: any;

@Component({
    providers:[AuthService, CommerceService],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogin:boolean = false;
    user:any;
    keyword:string;
    term$ = new Subject<string>();
    wechat:any = new Wechat();

    constructor(private router:Router, private authServ:AuthService, private commerceServ:CommerceService, 
        private uiServ:UiService, private translateServ:TranslateService) {

        let self = this;

        this.term$.debounceTime(800)
            .distinctUntilChanged()
            .subscribe((keyword:any) => {
                self.search(keyword);
            });
    }

    ngOnInit() {
        let self = this;
        this.uiServ.getMsg().subscribe(msg => {
            if('OnUpdateHeader' === msg.name){
                self.isLogin = self.authServ.hasLoggedIn();
                self.updateWechat();
            }
        });

        self.isLogin = self.authServ.hasLoggedIn();
        self.updateWechat();
    }

    updateWechat(){
        let self = this;
        self.commerceServ.getWechat(1).subscribe(
          (r:Wechat) => {
              r.logo = self.commerceServ.getImage(r.logo);
              self.wechat = r;
          },
          (err:any) => {
              self.wechat = new Wechat();
              self.wechat.logo = self.commerceServ.getImage(self.wechat.logo);
          });
    }

    search(keyword){
        let self = this;
        self.uiServ.emitMsg({name:'OnSearch', query:{'keyword':keyword}})
    }

    closeNavMenu(){
      $('.navbar-collapse').removeClass('show');
    }

    toPage(url){
      this.closeNavMenu();
      this.router.navigate([url]);
    }

    changeLanguage(code){
      this.closeNavMenu();
      this.translateServ.use(code);
    }

    logout(){
        let self = this;
        let flag = self.authServ.hasLoggedIn();

        this.closeNavMenu();
        if(flag){
          self.authServ.setLogoutStorage();
          self.isLogin = false;
          this.router.navigate(['home'])
        }
    }
}
