import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Category, WechatGroup } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';

@Component({
    providers:[CommerceService],
    selector: 'wechatgroup',
    templateUrl: './wechatgroup.component.html',
    styleUrls: ['./wechatgroup.component.scss']
})
export class WechatGroupComponent implements OnInit {
    MEDIA_URL = environment.MEDIA_URL;
    categoryList:Category[] = [];
    wechatgroup:WechatGroup = new WechatGroup();
    logo:any = environment.MEDIA_URL + 'empty.png';
    categoryName:string = "";
    id:any;

    constructor(private commerceServ:CommerceService, private router: Router, private route: ActivatedRoute){

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
                    if(r.logo){
                      self.logo = self.MEDIA_URL + r.logo;
                    }
                    
                    if(r.category){
                      self.categoryName = r.category.name;
                    }
                    
                    self.wechatgroup = r;
                },
                (err:any) => {
                    self.wechatgroup = new WechatGroup();
                });
            }else{
              self.wechatgroup = new WechatGroup();
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
                self.router.navigate(["wechatgroups"]);
            },
            (err:any) => {
                //self.wechatgroup = new WechatGroup();
                self.router.navigate(["wechatgroups"]);
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

