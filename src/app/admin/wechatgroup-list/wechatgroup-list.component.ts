import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CommerceService } from '../../commerce/commerce.service';
import { WechatGroup } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
@Component({
    providers:[CommerceService],
    selector: 'admin-wechatgroup-list',
    templateUrl: './wechatgroup-list.component.html',
    styleUrls: ['./wechatgroup-list.component.scss']
})
export class AdminWechatGroupListComponent implements OnInit {
    wechatgroupList:WechatGroup[];
    MEDIA_URL = environment.APP_URL+'/media/';
    fields:string[] = [];
    constructor(private translate:TranslateService, private router:Router, private commerceServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let wechatgroup = new WechatGroup();
        this.fields = Object.getOwnPropertyNames(wechatgroup);
        this.commerceServ.getWechatGroupList().subscribe(
            (r:WechatGroup[]) => {
                self.wechatgroupList = r;
                if(r.length){
                    self.fields = Object.keys(r[0]);
                }else{
                    self.router.navigate(["admin/wechatgroup"]);
                }
            },
            (err:any) => {
                self.wechatgroupList = [];
            });
    }

    toForm(r:any){
        if(r){
            this.router.navigate(["admin/wechatgroup/" + r.id]);
        }else{
            this.router.navigate(["admin/wechatgroup"]);
        }
    }

    change(r){
        this.router.navigate(["admin/wechatgroup/" + r.id]);
    }

    add(){
        this.router.navigate(["admin/wechatgroup"]);
    }

    delete(r){
        let self = this;
        this.commerceServ.rmWechatGroup(r.id).subscribe(
            (r:WechatGroup[]) => {
                self.wechatgroupList = r;
                if(r.length){
                    self.fields = Object.keys(r[0]);
                }else{
                    self.router.navigate(["admin/wechatgroup"]);
                }
            },
            (err)=>{}
        )}
}

