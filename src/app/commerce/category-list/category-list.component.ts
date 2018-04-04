import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CommerceService } from '../commerce.service';
import { Category } from '../commerce';

import { UiService } from '../../ui/ui.service';

@Component({
    providers:[CommerceService],
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    categoryList:Category[];

    fields:string[] = [];
    constructor(private uiServ:UiService, private categoryServ:CommerceService, private translate:TranslateService){}

    ngOnInit() {
        let self = this;
        let category = new Category()
        this.fields = Object.getOwnPropertyNames(category);
        this.categoryServ.getCategoryList().subscribe(
            (r:Category[]) => {
                self.categoryList = r;
            },
            (err:any) => {
                self.categoryList = [];
            });
    }

    find(c){
        if(c){
            this.uiServ.emitMsg({name:'OnSearch', query:{category_id:c.id}});
        }else{
            this.uiServ.emitMsg({name:'OnSearch'});
        }
        
    }
}

