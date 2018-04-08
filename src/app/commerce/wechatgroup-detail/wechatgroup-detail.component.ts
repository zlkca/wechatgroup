import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Category, WechatGroup } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
    providers:[CommerceService],
    selector: 'wechatgroup-detail',
    templateUrl: './wechatgroup-detail.component.html',
    styleUrls: ['./wechatgroup-detail.component.scss']
})
export class WechatGroupDetailComponent implements OnInit {
    MEDIA_URL = environment.APP_URL+'/media/';
    categoryList:Category[] = [];
    wechatgroup:WechatGroup = new WechatGroup();
    categoryName:string = "";
    id:any;
    emptyImage = environment.APP_URL + '/media/empty.png';
    defaultTitles:any = ['','','',''];

    constructor(private translate:TranslateService, private commerceServ:CommerceService, private router: Router, private route: ActivatedRoute){

    }

    ngOnInit() {
        let self = this;

        this.commerceServ.getImageDefaultTitle(1).subscribe((r)=>{
          self.defaultTitles = [r.name0, r.name1, r.name2, r.name3];
        },(err)=>{
          
        });

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
                    
                    r.logo = self.commerceServ.getImageUrl(r.logo);
                    r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);

                    if(r.category){
                      self.categoryName = r.category.name;
                    }
                    
                    self.wechatgroup = r;
                },
                (err:any) => {
                    self.wechatgroup = new WechatGroup();
                    self.wechatgroup.logo = self.commerceServ.getDefaultLogo(self.wechatgroup);
                    self.wechatgroup.qrs = self.commerceServ.getWechatGroupQRs(self.wechatgroup.qrs, self.defaultTitles);
                });
            }else{
              self.wechatgroup = new WechatGroup();
              self.wechatgroup.logo = self.commerceServ.getDefaultLogo(self.wechatgroup);
              self.wechatgroup.qrs = self.commerceServ.getWechatGroupQRs(self.wechatgroup.qrs, self.defaultTitles);
            }
        });
    }

    // save() {
    //     let self = this;
    //     self.wechatgroup.user = {'id':1, 'name':'admin'};
    //     self.wechatgroup.id = self.id;

    //     self.commerceServ.saveWechatGroup(self.wechatgroup).subscribe(
    //         (r:any) => {
    //             //self.wechatgroup = new WechatGroup(r.data[0]);
    //             self.router.navigate(["wechatgroups"]);
    //         },
    //         (err:any) => {
    //             //self.wechatgroup = new WechatGroup();
    //             self.router.navigate(["wechatgroups"]);
    //         });
    // }

    // onFileChange(event) {
    //     let self = this;
    //     let reader = new FileReader();
    //     if(event.target.files && event.target.files.length > 0) {
    //       let file = event.target.files[0];
    //       reader.readAsDataURL(file);
    //       reader.onload = () => {
    //           //self.logo = reader.result;//.split(',')[1];
    //           self.wechatgroup.logo = event.target.files[0];
    //       //   this.form.get('avatar').setValue({
    //       //     filename: file.name,
    //       //     filetype: file.type,
    //       //     value: reader.result.split(',')[1]
    //       //   })
    //       }
    //     }
    // }
}

