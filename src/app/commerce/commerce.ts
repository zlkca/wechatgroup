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
  public logo:any = { 'data':'', 'file':'' };
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

export class ImageDefaultTitle{
  public id:string;
  public name0:string='';
  public name1:string='';
  public name2:string='';
  public name3:string='';

  constructor(o?:any){
        if(o){
            this.id = o.id;
            this.name0 = o.name0;
            this.name1 = o.name1;
            this.name2 = o.name2;
            this.name3 = o.name3;
      }
  }
}

export class QR{
  public title:string = '';
  public index:number;
  public image:any = { 'data':'', 'file':'' };
  public wechatgroup_id:any;
    constructor(o?:any){
        if(o){
            this.title = o.title;
            this.index = o.index;
            this.image = o.image;
            this.wechatgroup_id = o.wechatgroup_id;

            // if(o.wechatgroup && o.wechatgrouplength>0){
            //     this.wechatgroup = {'id':o.wechatgroup[0], 'name':o.wechatgroup[1]};
            // }
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
  public qrs:QR[] = [new QR(), new QR(), new QR(), new QR()];
  // public qrs:any = [{ 'title':'', 'data':'', 'file':'' },{ 'title':'', 'data':'', 'file':'' },
  //                   { 'title':'', 'data':'', 'file':'' },{ 'title':'', 'data':'', 'file':'' }];
  public category:any = {id:1};
  public user:any = {id:1};
  public created:string;
  public updated:string;
    constructor(o?:any){
        if(o){
            this.id = o.id;
            this.title = o.title;
            this.description = o.description;
            this.n_subscription = o.n_subscription;
            this.rating = o.rating;
            if(o.logo){
              this.logo = o.logo;
            }
            if(o.qrs && o.qrs.length > 0){
              this.qrs = o.qrs;
            }else{
              this.qrs = [new QR(), new QR(), new QR(), new QR()];
              for(let i=0; i<this.qrs.length; i++){
                this.qrs[i].index = i;
              }
            }
            // if(o.qrs){ //load from front-end
            //   this.qrs = o.images;
            // }else{ // load from http
            //   this.qrs = [ o.image0, o.image1, o.image2, o.image3 ];
            // }
            if(o.category){
                this.category = o.category;
            }
            if(o.user){
                this.user = o.user;
            }
            this.created = o.created;
            this.updated = o.updated;
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

