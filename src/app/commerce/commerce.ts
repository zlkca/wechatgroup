import { User } from '../account/account';
export class Category{
  public id:string;
  public name:string;
  public description:string;
  public status:string;
    constructor(o?:any){
        if(o){
            this.id = o.id;
            this.name = o.name;
            this.description = o.description;
            this.status = o.status;
      }
  }
}

export class Wechat{
  public id:string;
  public title:string;
  public description:string;
  public logo:string;
  public created:string;
    constructor(o?:any){
        if(o){
            this.id = o.id;
            this.title = o.title;
            this.description = o.description;
            this.logo = o.logo;
            this.created = o.created;
      }
  }
}

export class WechatGroup{
  public id:string;
  public title:string;
  public description:string;
  public n_subscription:number;
  public rating:number;
  public logo:string;
  public category:any;
  public user:any;
  public created:string;
    constructor(o?:any){
        if(o){
            this.id = o.id;
            this.title = o.title;
            this.description = o.description;
            this.n_subscription = o.n_subscription;
            this.rating = o.rating;
            this.logo = o.logo;
            if(o.category){
                this.category = o.category;
            }
            if(o.user){
                this.user = o.user;
            }
            this.created = o.created;
      }
  }
}

export class QR{
  public title:string;
  public image:string;
  public wechatgroup:any;
    constructor(o?:any){
        if(o){
            this.title = o.title;
            this.image = o.image;
            if(o.wechatgroup && o.wechatgrouplength>0){
                this.wechatgroup = {'id':o.wechatgroup[0], 'name':o.wechatgroup[1]};
            }
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

