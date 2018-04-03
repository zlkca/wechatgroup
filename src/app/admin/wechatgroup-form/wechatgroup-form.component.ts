import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CommerceService } from '../../commerce/commerce.service';
import { Category, WechatGroup } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';

@Component({
    providers:[CommerceService],
    selector: 'admin-wechatgroup-form',
    templateUrl: './wechatgroup-form.component.html',
    styleUrls: ['./wechatgroup-form.component.scss']
})
export class AdminWechatGroupFormComponent implements OnInit {
    MEDIA_URL = environment.MEDIA_URL;
    categoryList:Category[] = [];
    wechatgroup:WechatGroup = new WechatGroup();
    logo:any = environment.MEDIA_URL + 'empty.png';
    id:any;

    constructor(private translate:TranslateService, private commerceServ:CommerceService, private router: Router, private route: ActivatedRoute){

    }

    ngOnInit() {
        let self = this;
        self.commerceServ.getCategoryList().subscribe(
            (r:Category[]) => {
                self.categoryList = r;
            },
            (err:any) => {
                self.categoryList = [];
            });

        self.route.params.subscribe((params:any)=>{
            self.id = params.id;
            if(params.id){
              self.commerceServ.getWechatGroup(params.id).subscribe(
                (r:WechatGroup) => {
                    self.logo = self.MEDIA_URL + '/' + r.logo;
                    self.wechatgroup = r;
                },
                (err:any) => {
                    self.wechatgroup = new WechatGroup();
                    self.wechatgroup.category = {'id':1};
                });
            }else{
              self.wechatgroup = new WechatGroup();
              self.wechatgroup.category = {'id':1};
            }
        });
    }

    save() {
        let self = this;
        self.wechatgroup.user = {'id':1, 'name':'admin'};
        self.wechatgroup.id = self.id;

        self.commerceServ.saveWechatGroup(self.wechatgroup).subscribe(
            (r:any) => {
                //self.wechatgroup = new WechatGroup(r.data[0]);
                self.router.navigate(["admin/wechatgroups"]);
            },
            (err:any) => {
                //self.wechatgroup = new WechatGroup();
                self.router.navigate(["admin/wechatgroups"]);
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
              self.wechatgroup.logo = event.target.files[0];
          //   this.form.get('avatar').setValue({
          //     filename: file.name,
          //     filetype: file.type,
          //     value: reader.result.split(',')[1]
          //   })
          }
        }
    }
}

