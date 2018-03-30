import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { User } from '../account';

@Component({
    providers:[AccountService],
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    user:User = new User();

    constructor(private userServ:AccountService, private route: ActivatedRoute){}

    ngOnInit() {
        let self = this;
        self.route.params.subscribe((params:any)=>{
            this.userServ.getUser(params.id).subscribe(
                (r:User) => {
                    self.user = r;
                },
                (err:any) => {
                    self.user = new User();
                });
        });
    }

    save() {
        let self = this;
        self.userServ.saveUser(self.user).subscribe(
            (r:User) => {
                self.user = r;
            },
            (err:any) => {
                self.user = new User();
            });
    }
}

