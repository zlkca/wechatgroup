import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { WechatGroup } from '../../commerce/commerce';
import { PageService } from '../../pages/page.service';

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

    constructor(private pageServ:PageService, private router:Router, private wechatgroupServ:CommerceService){
        let self = this;
        
        this.pageServ.getMsg().subscribe(msg => {
            if('OnSearch' === msg.name){
                if(msg.query){
                    self.doSearch(msg.query);
                }else{
                    self.doSearch('');
                }
            }
        });
    }

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

    toQueryStr(query:any){
        let list:string[] = [];
        if( query ){
            var keys = Object.keys(query);
            if(keys.length == 0){
                return "";
            }else{
                for(var key in query){
                    if(query.hasOwnProperty(key) && query[key]!=null && query[key]!=undefined){
                        list.push(key + '=' + query[key]);
                    }
                }
                return '?' + list.join('&');
            }
        }else{
            return '';
        }
    }

    doSearch(q){
        let self = this;
        let query = this.toQueryStr(q)
        this.wechatgroupServ.getWechatGroupList(query).subscribe(
            (r:WechatGroup[]) => {
                self.wechatgroupList = r;
            },
            (err:any) => {
                self.wechatgroupList = [];
            });
    }
}

