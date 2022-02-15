import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient,
    private apiService: ApiService) { }

  get(): Observable<Customer> {
    return this.apiService.get('Customer/customer-management')
      .pipe(map(
        data => {
          return data;
        }));
  }

  update(customer: Customer): Observable<Customer> {

    return this.apiService.put('Customer/customer-management', customer)
      .pipe(map(
        data => {
          return data;
        }));
  }

  create(customer: Customer): Observable<Customer> {

    return this.apiService.post('Customer/customer-management', customer)
      .pipe(map(
        data => {
          return data;
        }));
  }
  delete(custumerId: any): Observable<any> {
    return this.apiService.delete('Customer/customer-management/' + custumerId)
      .pipe(map(
        data => {
          return data;
        }));
  }
}
