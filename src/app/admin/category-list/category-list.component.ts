import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CommerceService } from '../../commerce/commerce.service';
import { Category } from '../../commerce/commerce';

@Component({
    providers:[CommerceService],
    selector: 'admin-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class AdminCategoryListComponent implements OnInit {
    categoryList:Category[];
    fields:string[] = [];
    constructor(private translate:TranslateService, private router:Router, private commerceServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let category = new Category()
        this.fields = Object.getOwnPropertyNames(category);
        this.commerceServ.getCategoryList().subscribe(
            (r:Category[]) => {
                self.categoryList = r;
                self.fields = Object.keys(r[0]);
                if(r.length == 0){
                    self.router.navigate(["admin/category"]);
                }
            },
            (err:any) => {
                self.categoryList = [];
            });
    }

    change(r){
        this.router.navigate(["admin/category/" + r.id]);
    }

    add(){
        this.router.navigate(["admin/category"]);
    }

    delete(r){
        this.commerceServ.rmCategory(r.id).subscribe(
            (ret)=>{},
            (err)=>{}
        )
    }
}

