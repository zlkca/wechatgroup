import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { UiService } from '../../ui/ui.service';
import { CommerceService } from '../../commerce/commerce.service';
import { Wechat } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';

@Component({
    providers:[CommerceService],
    selector: 'admin-wechat-form',
    templateUrl: './wechat-form.component.html',
    styleUrls: ['./wechat-form.component.scss']
})
export class AdminWechatFormComponent implements OnInit {
    MEDIA_URL = environment.APP_URL + '/media/';
    wechat:Wechat = new Wechat();
    logo:any = environment.APP_URL + '/media/empty.png';

    constructor(private translate:TranslateService, private commerceServ:CommerceService, private router: Router, 
      private uiServ: UiService ){
    }

    ngOnInit() {
        let self = this;

        self.commerceServ.getWechat(1).subscribe(
          (r:Wechat) => {
              self.logo = self.MEDIA_URL + r.logo;
              self.wechat = r;
          },
          (err:any) => {
              self.wechat = new Wechat();
          });
    }

    save() {
        let self = this;

        self.commerceServ.saveWechat(self.wechat).subscribe(
            (r:any) => {
                //self.wechatgroup = new WechatGroup(r.data[0]);
                self.uiServ.emitMsg({name:'OnUpdateHeader'});
                self.router.navigate(["home"]);
            },
            (err:any) => {
                //self.wechatgroup = new WechatGroup();
                self.uiServ.emitMsg({name:'OnUpdateHeader'});
                self.router.navigate(["home"]);
            });
    }

    onFileChange(event) {
        let self = this;
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
              self.logo = reader.result;//.split(',')[1];
              self.wechat.logo = event.target.files[0];
          //   this.form.get('avatar').setValue({
          //     filename: file.name,
          //     filetype: file.type,
          //     value: reader.result.split(',')[1]
          //   })
          }
        }
    }
}

