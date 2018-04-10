import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User } from './account';

//import { environment } from '../../environments/environment';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    APP = environment.APP;
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = localStorage.getItem('token-' + this.APP);
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + btoa(token)//base 64 encoding
        }
      });
      return next.handle(request);
    }
}

@Injectable()
export class AuthService {

    private API_URL = environment.API_URL;
    private APP = environment.APP;

    constructor(private http: HttpClient) {}

    login(account: string, password: string): Observable<User> {
		// note: http.post return { token:'x', data: user data }
        const url = this.API_URL + 'login';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, {"account": account, "password": password}, {'headers': headers}).map((res:any) => {
            if(res.data){
				self.setStorage('token', res.token);
                return new User(res.data);
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    signup(username: string, email: string, password: string): Observable<User> {
        // note: http.post return { token:'x', data: user data }
        const url = this.API_URL + 'signup';
        let self = this;
        let body = {"username": username, "email": email, "password": password};
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        return this.http.post(url, body, {'headers': headers}).map((res:any) => {
            if (res.data) {
                self.setStorage('token', res.token);
                return new User(res.data);
            } else {
                return null;
            }
        }).catch((error:any)=>{
            return Observable.throw(error.message || error);
        });
    }
    
    setStorage(key:string, obj: any): void {
        localStorage.setItem( key + '-' + this.APP, JSON.stringify(obj));
    };

    rmStorage(key:string): void {
        localStorage.removeItem( key + '-' + this.APP);
    };

    checkToken(): Observable<any> {
        const url = this.API_URL + 'token';
        let self = this;
        return this.http.get(url).map((res:any) => {
            if(res.data){
                return res.data;
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    checkTokenV1(token: string): Observable<any> {
        const url = this.API_URL + 'token';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, {"token": token}, {'headers': headers}).map((res:any) => {
            if(res.data){
                return res.data;
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

}
