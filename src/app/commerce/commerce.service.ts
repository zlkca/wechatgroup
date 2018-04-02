import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Category,WechatGroup,QR,Subscription } from './commerce';
import 'rxjs/add/observable/fromPromise';
@Injectable()
export class CommerceService {
    
    private API_URL = environment.API_URL;
    private APP = environment.APP;

    constructor(private http:HttpClient){ }
    getCategoryList(query?:string):Observable<Category[]>{
        const url = this.API_URL + 'categories' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Category[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Category(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCategory(id:number):Observable<Category>{
        const url = this.API_URL + 'category/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Category(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveCategory(d:Category):Observable<Category>{
        const url = this.API_URL + 'category';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'id': d.id? d.id:'',
          'name': d.name,
          'description': d.description,
          'status': d.status,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new Category(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getWechatGroupList(query?:string):Observable<WechatGroup[]>{
        const url = this.API_URL + 'wechatgroups' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:WechatGroup[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new WechatGroup(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getWechatGroup(id:number):Observable<WechatGroup>{
        const url = this.API_URL + 'wechatgroup/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new WechatGroup(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    // saveWechatGroup(d:WechatGroup):Observable<WechatGroup>{
    //     const url = this.API_URL + 'wechatGroup';
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     let data = {
    //       'title': d.title,
    //       'description': d.description,
    //       'n_subscription': d.n_subscription,
    //       'rating': d.rating,
    //       'logo': d.logo,
    //       'user_id': d.user.id,
    //       'created': d.created,
    //     }
    //     return this.http.post(url, data, {'headers': headers}).map((res:any) => {
    //         return new WechatGroup(res.data);
    //     })
    //     .catch((err) => {
    //         return Observable.throw(err.message || err);
    //     });
    // }
    saveWechatGroup(d:WechatGroup){
        let token = localStorage.getItem('token-' + this.APP);
        return Observable.fromPromise(new Promise((resolve, reject)=>{
            
            let formData = new FormData();
            
            formData.append('id', d.id? d.id:'');
            formData.append('title', d.title);
            formData.append('description', d.description);
            formData.append('n_subscription', d.n_subscription.toString());
            formData.append('rating', d.rating.toString());
            formData.append('user_id', d.user.id);
            formData.append('category_id', d.category.id);
            formData.append('created', d.created);
            formData.append('logo', d.logo);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function (e) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                    //console.log(xhr.responseText);
                } else {
                    reject(xhr.response);
                    //console.error(xhr.statusText);
                }
              }
            };

            xhr.onerror = function (e) {
                reject(xhr.response);
                //console.error(xhr.statusText);
            };

            xhr.open("POST", this.API_URL + 'wechatgroup', true);
            xhr.setRequestHeader("authorization", "Basic " + btoa(token));
            xhr.send(formData);
        }));
    }

    updateWechatGroup(d:WechatGroup){
        let token = localStorage.getItem('token-'+this.APP);
        let formData = new FormData();
        
        formData.append('id', d.id? d.id:'');
        formData.append('title', d.title);
        formData.append('description', d.description);
        formData.append('n_subscription', d.n_subscription.toString());
        formData.append('rating', d.rating.toString());
        formData.append('user_id', d.user.id);
        formData.append('created', d.created);
        formData.append('logo', d.logo);

        var request = new XMLHttpRequest();
        request.open("PATCH", this.API_URL + 'wechatgroup');
        request.send(formData);
    }

    getQRList(query?:string):Observable<QR[]>{
        const url = this.API_URL + 'qR' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:QR[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new QR(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getQR(id:number):Observable<QR>{
        const url = this.API_URL + 'qR/id';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new QR(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveQR(d:QR):Observable<QR>{
        const url = this.API_URL + 'qR';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'title': d.title,
          'image': d.image,
          'wechatgroup_id': d.wechatgroup.id,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new QR(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }
    getSubscriptionList(query?:string):Observable<Subscription[]>{
        const url = this.API_URL + 'subscription' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Subscription[] = [];
            let d = JSON.parse(res.data);
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Subscription(d[i].fields));
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



  // // w --- width after resizeImage
  // // h --- height after resizeImage
  // resizeCanvas(canvas:any, w:number, h:number){
  //   if(this.FRAME_H<360){
  //     this.FRAME_PADDING_H = (360 - h)/2;
  //   }else{
  //     this.FRAME_PADDING_H = (this.FRAME_H - h)/2;
  //   }

    
  //   this.CANVAS_W = w;
  //   this.CANVAS_H = h;
  //   //canvas.setAttribute("style", "margin-top:" +  this.FRAME_PADDING_H + "px;");
  // }
// scaleImageSize(frame_w:any, frame_h:any, w: any, h: any){
//         var rw = 0;
//         var rh = 0;

//         var h1 = h * frame_w / w;  
//         if( h1 > frame_h ){
//           rh = frame_h;
//           rw = w * frame_h / h;
//         }else{
//           rw = frame_w;
//           rh = h * frame_w / w;
//         }
//         return {'w':rw, 'h':rh};
//     }

//     resizeImage(frame_w:number, frame_h:number, w: number, h: number){
//         var rw = 0;
//         var rh = 0;

//         var h1 = h * (frame_w - 2) / w;  
//         if( h1 > frame_h ){
//           rh = frame_h;
//           rw = w * frame_h / h;
//         }else{
//           rw = frame_w - 2;
//           rh = h * (frame_w - 2) / w;
//         }
//         return {'w':Math.round(rw), 'h':Math.round(rh), 'padding_top': Math.round((frame_h - rh)/2) };
//     }

  // resizeImage(canvas:any, img:any, max_w:number, max_h:number){
  //   var w = img.width;
  //   var h = img.height;

  //   var r = this.itemServ.scaleImageSize(max_w, max_h, w, h);
  //   canvas.width = r.w;
  //   canvas.height = r.h;
  //   var ctx = canvas.getContext('2d');
  //   ctx.drawImage(img, 0, 0, r.w, r.h);
  //   return {'ctx':ctx, 'w':r.w, 'h':r.h};
  // }

  // checkFeature(img:any, fname:string, cb:any){
  //     let self = this;
  //     let w = img.width;
  //     let h = img.height;
  //     let pc = document.getElementById('process-canvas') as HTMLCanvasElement;
  //     let sw = (w > h)? 12:9;
  //     let sh = (w > h)? 9:12;
  //     self.resizeImage(pc, img, sw, sh);

  //     pc.toBlob(function(blob){
  //       self.itemServ.checkFeatureV2(blob, fname).subscribe(function(rsp:any){
  //         if(cb)
  //           cb(rsp);
  //       });
  //     });
  //   }

  //   toInt(n:any){ return Math.round(Number(n)); };

  // fileChange(event:any) {
  //     let self = this;
  //     let fileList: FileList = event.target.files;

  //     if(fileList.length > 0) {
  //         let file: File = fileList[0];
  //         if (file) {
  //           let reader = new FileReader();
  //           let image = new Image();
  //           let canvas = document.getElementById('item-canvas') as HTMLCanvasElement;

  //           image.onload = function(){
  //             var r = self.resizeImage(canvas, image, self.FRAME_W, self.FRAME_H);
  //             self.resizeCanvas(canvas, r.w, r.h);
  //             self.product.pixel = self.toInt(r.w) + 'x' + self.toInt(r.h);

  //             self.checkFeature(image, file.name, function(rsp:any){
  //               if(rsp.success){
  //                 self.data = rsp.data;
  //                 self.progress = 100;
  //                 self.ref.detectChanges();
  //                 //self.changeProgress();
  //               }else{
  //                 self.data = null;
  //                 self.showAlert('Alert', 'Photo existed');
  //                 self.progress = 0;
  //               };
  //             });

  //             canvas.toBlob(function(blob){
  //               self.blob = blob;
  //             });
  //           }

  //           reader.onload = function (e:any) {
  //             image.src = e.target.result; // trigger image.onload
  //           }
  //           reader.readAsDataURL(file);
  //           this.file = file;
  //         }   
  //     }
  // }

  //   uploadItem($event:any){
  //     var product = this.product;
  //     product.fpath = this.file? ('/photos/' + product.owner.username + '/' + this.file.name) : 'sample.png';
  //     //item.updated = new Date().toLocaleDateString();
  //     var self = this;

  //     if(self.data){
  //       self.itemServ.uploadProduct(this.file.name, self.blob, self.data, product, 
  //         function(progress:any){
  //           self.progress = progress;
  //         },
  //         function(){
  //           //completed callback
  //           if('market' == product.source){
  //             //self.showAlert('Alert', 'Photo uploaded successfully');
  //             self.navCtrl.push(ProductListPage);
  //           }else{
  //             self.showSellConfirmation(self.data);
  //           }
  //         });
  //     }else{
  //       self.showAlert('Alert', 'Photo existed');
  //     }
  //   }


}

