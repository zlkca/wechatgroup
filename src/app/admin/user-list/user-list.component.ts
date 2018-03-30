import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { User } from '../../account/account';

@Component({
    providers:[AccountService],
    selector: 'admin-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
    userList:User[];

    fields:string[] = [];
    constructor(private userServ:AccountService){}

    ngOnInit() {
        let self = this;
        let user = new User()
        this.fields = Object.getOwnPropertyNames(user);
        this.userServ.getUserList().subscribe(
            (r:User[]) => {
                self.userList = r;
            },
            (err:any) => {
                self.userList = [];
            });
    }

    toDetail(r){}

}

