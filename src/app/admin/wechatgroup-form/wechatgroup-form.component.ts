import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CommerceService } from '../../commerce/commerce.service';
import { Category, WechatGroup, QR } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';

declare var $;

@Component({
    providers:[CommerceService],
    selector: 'admin-wechatgroup-form',
    templateUrl: './wechatgroup-form.component.html',
    styleUrls: ['./wechatgroup-form.component.scss']
})
export class AdminWechatGroupFormComponent implements OnInit {
    MEDIA_URL = environment.APP_URL + '/media/';
    categoryList:Category[] = [];
    wechatgroup:WechatGroup = new WechatGroup();
    logo:any = environment.APP_URL + '/media/empty.png';
    id:any;
	defaultTitles:any = ['','','',''];
    emptyImage = environment.APP_URL + '/media/empty.png';
    // images:any = [{data:this.emptyImage}, {data:this.emptyImage}, {data:this.emptyImage}, {data:this.emptyImage}];

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

            self.commerceServ.getImageDefaultTitle(1).subscribe((r)=>{
                self.defaultTitles = [r.name0, r.name1, r.name2, r.name3];

                if(params.id){
                  self.commerceServ.getWechatGroup(params.id).subscribe(
                    (r:WechatGroup) => {
                        r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);
                        self.wechatgroup = r
                    },
                    (err:any) => {
                        let r = new WechatGroup();
                        r.category = {'id':1};
                        r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);
                        self.wechatgroup = r;
                    });
                }else{
                    let r = new WechatGroup();
                    r.category = {'id':1};
                    r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);
                    self.wechatgroup = r;
                }

            },(err)=>{
              
            });


        });
    }

    save() {
        let self = this;
        self.wechatgroup.user = {'id':1, 'name':'admin'};
        self.wechatgroup.id = self.id;
        // self.wechatgroup.images = self.images;
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



    // onFileChange(event) {
    //     let self = this;
    //     let reader = new FileReader();
    //     if(event.target.files && event.target.files.length > 0) {
    //       let file = event.target.files[0];
    //       reader.readAsDataURL(file);
    //       reader.onload = () => {
    //           self.logo = reader.result;//.split(',')[1];
    //           //self.wechatgroup.logo = event.target.files[0];
    //       //   this.form.get('avatar').setValue({
    //       //     filename: file.name,
    //       //     filetype: file.type,
    //       //     value: reader.result.split(',')[1]
    //       //   })
    //       }
    //     }
    // }

    onLoadImage(i:number){
      $('[name="image'+ i +'"]').click();
    }

    onDeleteImage(i:number){
        let qr = this.wechatgroup.qrs[i];//new QR();
        //qr.index = i;
        qr.image.data = this.emptyImage;
        qr.image.file = '';
        this.wechatgroup.qrs[i] = qr;
    }

    onImageChange(event:any, i:number){
        let self = this;
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
              self.wechatgroup.qrs[i].image = {data: reader.result, file: event.target.files[0]};//.split(',')[1];
              //self.wechatgroup.logo = event.target.files[0];
          //   this.form.get('avatar').setValue({
          //     filename: file.name,
          //     filetype: file.type,
          //     value: reader.result.split(',')[1]
          //   })
          }
        }
    }
}

