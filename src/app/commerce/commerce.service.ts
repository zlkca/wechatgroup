import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { WechatGroup,Subscription } from './commerce';

@Injectable()
export class CommerceService {
    private API_URL = environment.API_URL;

    constructor(private http:HttpClient){ }

    getWechatGroupList(query?:string):Observable<WechatGroup[]>{
        const url = this.API_URL + 'wechatGroup' + query ? query:'';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:WechatGroup[] = [];
            if( res.data && res.data.length > 0){
                for(var i=0; i<res.data.length; i++){
                    a.push(new WechatGroup(res.data[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getWechatGroup(id:number):Observable<WechatGroup>{
        const url = this.API_URL + 'wechatGroup/id';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new WechatGroup(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveWechatGroup(d:WechatGroup):Observable<WechatGroup>{
        const url = this.API_URL + 'wechatGroup';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'title': d.title,
          'description': d.description,
          'n_subscription': d.n_subscription,
          'rating': d.rating,
          'qr': d.qr,
          'image': d.image,
          'user_id': d.user.id,
          'created': d.created,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new WechatGroup(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getSubscriptionList(query?:string):Observable<Subscription[]>{
        const url = this.API_URL + 'subscription' + query ? query:'';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Subscription[] = [];
            if( res.data && res.data.length > 0){
                for(var i=0; i<res.data.length; i++){
                    a.push(new Subscription(res.data[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getSubscription(id:number):Observable<Subscription>{
        const url = this.API_URL + 'subscription/id';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Subscription(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveSubscription(d:Subscription):Observable<Subscription>{
        const url = this.API_URL + 'subscription';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'user_id': d.user.id,
          'ip': d.ip,
          'wechatgroup_id': d.wechatgroup.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new Subscription(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

}

