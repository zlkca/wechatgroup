import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { Subscription } from '../commerce';

@Component({
    providers:[CommerceService],
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
    subscriptionList:Subscription[];

    fields:string[] = [];
    constructor(private subscriptionServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let subscription = new Subscription()
        this.fields = Object.getOwnPropertyNames(subscription);
        this.subscriptionServ.getSubscriptionList().subscribe(
            (r:Subscription[]) => {
                self.subscriptionList = r;
            },
            (err:any) => {
                self.subscriptionList = [];
            });
    }

    toDetail(r){}

}

