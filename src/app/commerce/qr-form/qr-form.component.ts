import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../commerce.service';
import { QR } from '../commerce';

@Component({
    providers:[CommerceService],
    selector: 'app-qr-form',
    templateUrl: './qr-form.component.html',
    styleUrls: ['./qr-form.component.scss']
})
export class QRFormComponent implements OnInit {
    qr:QR = new QR();

    constructor(private qrServ:CommerceService, private route: ActivatedRoute){}

    ngOnInit() {
        let self = this;
        self.route.params.subscribe((params:any)=>{
            this.qrServ.getQR(params.id).subscribe(
                (r:QR) => {
                    self.qr = r;
                },
                (err:any) => {
                    self.qr = new QR();
                });
        });
    }

    save() {
        let self = this;
        self.qrServ.saveQR(self.qr).subscribe(
            (r:QR) => {
                self.qr = r;
            },
            (err:any) => {
                self.qr = new QR();
            });
    }
}

