import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  orderData: any;
  sign: any
  baseUrl = 'http://localhost:4000/api/';
  // http://localhost:4200

  constructor(public http: HttpClient) { }

  postOrder(value){
    return this.http.post(this.baseUrl + 'bill/create', value)
      .pipe(map(data => this.orderData = data));
  }

  getOrders(id){
    let url = this.baseUrl + 'bill/'+ id
    return this.http.get(url)
      .pipe(map(data => this.orderData = data));
  }
  
  getOrder(){
    const value={phone:localStorage.getItem('phoneId')}
    return this.http.post(this.baseUrl + 'bill', value)
    .pipe(map(data => this.orderData = data));
  }

  updateOrder(id, value){
    return this.http.put(this.baseUrl + 'bill/' + id, value)
      .pipe(map(data => this.orderData = data));
  }

  deleteOrder(value){
    return this.http.delete(this.baseUrl + 'bill/' + value)
      .pipe(map(data => this.orderData = data));
  }

  signPost(value){
    return this.http.post(this.baseUrl + 'sign', value)
      .pipe(map(data => this.sign = data))
  }

  signIn(value){
    return this.http.post(this.baseUrl + 'sign/signin', value)
      .pipe(map(data => this.sign = data))
  }

  signgets(id){
    let url = this.baseUrl + 'sign/' + id
    return this.http.get(url)
      .pipe(map(data => this.sign = data));
  }

  signget(){
    let url = this.baseUrl + 'sign'
    return this.http.get(url)
      .pipe(map(data => this.sign = data));
  }

}
