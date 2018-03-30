import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Subscription } from '../../commerce/commerce';

@Component({
    providers:[CommerceService],
    selector: 'admin-subscription-form',
    templateUrl: './subscription-form.component.html',
    styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
    subscription:Subscription = new Subscription();

    constructor(private subscriptionServ:CommerceService, private route: ActivatedRoute){}

    ngOnInit() {
        let self = this;
        self.route.params.subscribe((params:any)=>{
            this.subscriptionServ.getSubscription(params.id).subscribe(
                (r:Subscription) => {
                    self.subscription = r;
                },
                (err:any) => {
                    self.subscription = new Subscription();
                });
        });
    }

    save() {
        let self = this;
        self.subscriptionServ.saveSubscription(self.subscription).subscribe(
            (r:Subscription) => {
                self.subscription = r;
            },
            (err:any) => {
                self.subscription = new Subscription();
            });
    }
}

