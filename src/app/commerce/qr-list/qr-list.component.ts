import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { QR } from '../commerce';

@Component({
    providers:[CommerceService],
    selector: 'app-qr-list',
    templateUrl: './qr-list.component.html',
    styleUrls: ['./qr-list.component.scss']
})
export class QRListComponent implements OnInit {
    qrList:QR[];

    fields:string[] = [];
    constructor(private qrServ:CommerceService){}

    ngOnInit() {
        let self = this;
        let qr = new QR()
        this.fields = Object.getOwnPropertyNames(qr);
        this.qrServ.getQRList().subscribe(
            (r:QR[]) => {
                self.qrList = r;
            },
            (err:any) => {
                self.qrList = [];
            });
    }

    toDetail(r){}

}

