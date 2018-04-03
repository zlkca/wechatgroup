import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User } from './account';

@Injectable()
export class AuthService {

    private API_URL = environment.API_URL;
    private APP = environment.APP;

    constructor(private http: HttpClient) {}

    login(account: string, password: string): Observable<User> {
        const url = this.API_URL + 'login';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, {"account": account, "password": password}, {'headers': headers}).map((res:any) => {
            localStorage.setItem('token-'+self.APP, res.token);
            if(res.data){
                return new User(res.data);
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    setLoginStorage(user: User): void {
        localStorage.setItem('user-' + this.APP, JSON.stringify(user));
    };

    setLogoutStorage(): void {
        localStorage.removeItem('user-' + this.APP);
    };

    hasLoggedIn(){
        let v = localStorage.getItem('user-' + this.APP);
        return v ? true : false;
    }

    checkToken(token: string): Observable<any> {
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
