import { User } from '../account/account';

export class WechatGroup{
  public title:string;
  public description:string;
  public n_subscription:number;
  public rating:number;
  public logo:string;
  public user:any;
  public created:string;
    constructor(o?:any){
        if(o){
            this.title = o.title;
            this.description = o.description;
            this.n_subscription = o.n_subscription;
            this.rating = o.rating;
            this.logo = o.logo;
            if(o.user && o.userlength>0){
                this.user = {'id':o.user[0], 'name':o.user[1]};
            }
            this.created = o.created;
      }
  }
}

export class Subscription{
  public user:any;
  public ip:string;
  public wechatgroup:any;
  public created:string;
  public updated:string;
    constructor(o?:any){
        if(o){
            if(o.user && o.userlength>0){
                this.user = {'id':o.user[0], 'name':o.user[1]};
            }
            this.ip = o.ip;
            if(o.wechatgroup && o.wechatgrouplength>0){
                this.wechatgroup = {'id':o.wechatgroup[0], 'name':o.wechatgroup[1]};
            }
            this.created = o.created;
            this.updated = o.updated;
      }
  }
}

