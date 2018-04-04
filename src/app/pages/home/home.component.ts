import { Component, OnInit } from '@angular/core';
import { UiService } from '../../ui/ui.service';

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    //providers:[PageService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    keyword:string;
    term$ = new Subject<string>();

    constructor(private uiServ:UiService) {
        let self = this;

        this.term$.debounceTime(800)
            .distinctUntilChanged()
            .subscribe((keyword:any) => {
                self.search(keyword);
            });
    }

    ngOnInit() {
    }

    search(keyword){
        let self = this;
        this.uiServ.emitMsg({name:'OnSearch', query:{'keyword':keyword}})
    }
}
