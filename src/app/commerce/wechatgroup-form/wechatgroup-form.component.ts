import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../commerce.service';
import { WechatGroup } from '../commerce';

@Component({
    providers:[CommerceService],
    selector: 'app-wechatgroup-form',
    templateUrl: './wechatgroup-form.component.html',
    styleUrls: ['./wechatgroup-form.component.scss']
})
export class WechatGroupFormComponent implements OnInit {
    wechatgroup:WechatGroup = new WechatGroup();

    constructor(private wechatgroupServ:CommerceService, private route: ActivatedRoute){}

    ngOnInit() {
        let self = this;
        self.route.params.subscribe((params:any)=>{
            this.wechatgroupServ.getWechatGroup(params.id).subscribe(
                (r:WechatGroup) => {
                    self.wechatgroup = r;
                },
                (err:any) => {
                    self.wechatgroup = new WechatGroup();
                });
        });
    }

    save() {
        let self = this;
        self.wechatgroupServ.saveWechatGroup(self.wechatgroup).subscribe(
            (r:WechatGroup) => {
                self.wechatgroup = r;
            },
            (err:any) => {
                self.wechatgroup = new WechatGroup();
            });
    }
}

