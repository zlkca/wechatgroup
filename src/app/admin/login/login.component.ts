import { Component, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '@ngx-translate/core';

import { User } from '../../account/account';
import { AuthService } from '../../account/auth.service';
import { AccountService } from '../../account/account.service';
import { UiService } from '../../ui/ui.service';

@Component({
  providers: [AuthService, AccountService],
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public user = new User();
  public account = '';
  public password = '';

  subscription:any;
  token = '';
  errMsg = '';
  auth2:any;

  constructor(private translate:TranslateService, public authServ:AuthService, 
    private router:Router, private uiServ:UiService) { 
  }

  ngOnInit() {
    // let self = this;

    // self.authServ.getUser({'email':r.email}).subscribe(
    //   (user:any)=>{
    //     if(user){
    //       self.authServ.setLogin(user);
    //       self.pageServ.emitMsg({name:'OnUpdateHeader'});
    //       self.user = user;
    //       self.toHome();
    //     }else{

    //       self.authServ.signup(r.username, r.email, '', 'member', 'm', r.firstname, r.lastname, r.portrait)
    //         .subscribe(function(user){
    //           self.authServ.setLogin(user);
    //           self.msgServ.emit({name:'OnUpdateHeader'});
    //           self.user = user;
    //           self.toHome();
    //         }, function(err){
    //           let e = err;
    //         })
    //     }
    //   },
    //   (error:any)=>{

    //   });
    //   }

  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onLogin(form: NgForm) {
    let self = this;
    let account = this.account;
    let password = this.password;
    
    if (form.valid) {
      this.subscription = this.authServ.login(account, password).subscribe(
          (user) => {
              if(user && user.username){
                //if(user.active){
                  // user.source = 'main';
                  self.authServ.setLoginStorage(user);
                  self.uiServ.emitMsg({name:'OnUpdateHeader'});
                  self.user = user;
                  self.toAdminHome();
                // }else{
                //   self.errMsg = "ACTIVE_ACCOUNT_MSG"; 
                // }
              }else{
                self.errMsg = "INVALID_ACCOUNT_OR_PASSOWRD";          
              }
          }, 
          (error) => {
            console.error('An error occurred', error);
            return Observable.throw(error.message || error);
          },
          () => {
            // completed event
          });
      }else{
        self.errMsg = "INVALID_ACCOUNT_OR_PASSOWRD";
      }
  }


  onForgetPassword(){
    // this.router.navigate(["/forget-password"]);;
    // return false;
  }

  onChangeAccount(){
    this.errMsg = "";
  }

  onChangePassword(){
    this.errMsg = "";
  }

  toAdminHome(){
    //this.router.navigateByUrl("/");
    this.router.navigate(["admin"]);
  }

}
