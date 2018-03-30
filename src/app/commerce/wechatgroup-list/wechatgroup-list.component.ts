import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { WechatGroup } from '../commerce';

@Component({
    providers:[CommerceService],
    selector: 'app-wechatgroup-list',
    templateUrl: './wechatgroup-list.component.html',
    styleUrls: ['./wechatgroup-list.component.scss']
})
export class WechatGroupListComponent implements OnInit {
    wechatgroupList:WechatGroup[];

    fields:string[] = [];
    constructor(private wechatgroupServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let wechatgroup = new WechatGroup()
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

}

