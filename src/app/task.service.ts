import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private http: Http, private http2: HttpClient) { }
  
  private headers = new Headers({'Content-Type': 'application/json'});
  
  getTasks(): Observable<any> {
    return this.http2.get('/api/tasks');
  }
  
  addTask(task): Promise<any> {
    return this.http
      .post('/api/newTask', JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(err => this.errorHandle('addTask', err));
  }
  
  updTaskStatus(id, status): Promise<any> {
    return this.http
      .post('/api/updTaskStatus', JSON.stringify({id, status}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json());
  }
  
  errorHandle(proc: string, msg: string): void {
    console.log('Error in the ' + proc + ' function. Message:\n  ' + msg);
  }

}