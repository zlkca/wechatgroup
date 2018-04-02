import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Category } from '../../commerce/commerce';

@Component({
    providers:[CommerceService],
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class AdminCategoryFormComponent implements OnInit {
    category:Category = new Category();
    id:any;

    constructor(private commerceServ:CommerceService, private router:Router, private route: ActivatedRoute){}

    ngOnInit() {
        let self = this;
        self.route.params.subscribe((params:any)=>{
            if(params.id){
                this.commerceServ.getCategory(params.id).subscribe(
                    (r:Category) => {
                        self.category = r;
                        self.id = r.id;
                    },
                    (err:any) => {
                        self.category = new Category();
                    });
            }else{
                self.category = new Category();
            }
        });
    }

    save() {
        let self = this;
        self.category.id = self.id;
        self.category.status = "1";
        self.commerceServ.saveCategory(self.category).subscribe(
            (r:Category) => {
                self.router.navigate(["admin/categories"]);
                //self.category = r;
            },
            (err:any) => {
                self.router.navigate(["admin/categories"]);
                //self.category = new Category();
            });
    }
}

