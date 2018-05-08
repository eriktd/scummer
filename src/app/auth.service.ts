import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthObj } from './authObj';

@Injectable()
export class AuthService {
    
    redirectUrl: string;
    //private headers = new Headers({'Content-Type': 'application/json'});//application/x-www-form-urlencoded

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        return this.http.post<AuthObj>('/api/auth/login', { email: username, password: password })
        .map(data => { 
                        if (data && data.token) {
                            localStorage.setItem('token', data.token); 
                        }
                        return data;
                     },
            error => console.log(error));
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

}
