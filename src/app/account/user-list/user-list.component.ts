import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../account';

@Component({
    providers:[AccountService],
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
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

