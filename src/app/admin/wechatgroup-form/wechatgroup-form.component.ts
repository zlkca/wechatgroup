import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { WechatGroup } from '../../commerce/commerce';

@Component({
    providers:[CommerceService],
    selector: 'admin-wechatgroup-form',
    templateUrl: './wechatgroup-form.component.html',
    styleUrls: ['./wechatgroup-form.component.scss']
})
export class AdminWechatGroupFormComponent implements OnInit {
    wechatgroup:WechatGroup = new WechatGroup();
    logo:any;
    
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


    onFileChange(event) {
        let self = this;
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
              var v = reader.result.split(',')[1];
              self.logo = reader.result;
          //   this.form.get('avatar').setValue({
          //     filename: file.name,
          //     filetype: file.type,
          //     value: reader.result.split(',')[1]
          //   })
          // };
        }
    }
}

