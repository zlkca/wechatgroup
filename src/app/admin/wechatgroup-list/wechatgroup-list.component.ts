import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { WechatGroup } from '../../commerce/commerce';

@Component({
    providers:[CommerceService],
    selector: 'admin-wechatgroup-list',
    templateUrl: './wechatgroup-list.component.html',
    styleUrls: ['./wechatgroup-list.component.scss']
})
export class AdminWechatGroupListComponent implements OnInit {
    wechatgroupList:WechatGroup[];

    fields:string[] = [];
    constructor(private router:Router, private wechatgroupServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let wechatgroup = new WechatGroup();
        this.fields = Object.getOwnPropertyNames(wechatgroup);
        this.wechatgroupServ.getWechatGroupList().subscribe(
            (r:WechatGroup[]) => {
                self.wechatgroupList = r;
            },
            (err:any) => {
                self.wechatgroupList = [];
            });
    }

    toDetail(r){}

    toForm(){
        this.router.navigate(["admin/wechatgroup-form"]);
    }

}

