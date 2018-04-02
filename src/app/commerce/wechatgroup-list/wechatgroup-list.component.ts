import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { WechatGroup } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
@Component({
    providers:[CommerceService],
    selector: 'wechatgroup-list',
    templateUrl: './wechatgroup-list.component.html',
    styleUrls: ['./wechatgroup-list.component.scss']
})
export class WechatGroupListComponent implements OnInit {
    wechatgroupList:WechatGroup[];
    MEDIA_URL = environment.MEDIA_URL;
    fields:string[] = [];
    constructor(private router:Router, private wechatgroupServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let wechatgroup = new WechatGroup();
        this.fields = Object.getOwnPropertyNames(wechatgroup);
        this.wechatgroupServ.getWechatGroupList().subscribe(
            (r:WechatGroup[]) => {
                self.wechatgroupList = r;
                self.fields = Object.keys(r[0]);
            },
            (err:any) => {
                self.wechatgroupList = [];
            });
    }

    toDetail(r:any){
        this.router.navigate(["wechatgroup/" + r.id]);
    }

}

