import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class UiService {

    private msgSrc = new Subject<any>();

    constructor() { }

    emitMsg(msg:any){
        this.msgSrc.next(msg);
    }

    getMsg():Observable<any>{
        return this.msgSrc.asObservable();
    }
}

