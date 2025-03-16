import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../Models/customer-model';
import { AddCustomerRequest } from '../../Models/add-customer-model';
import { CookieService } from 'ngx-cookie-service';
import { Vehicle } from '../../Models/vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:5141/api/Customers';
  private api = 'http://localhost:5141/api/Vehicles/ScheduledVehicles';


  constructor(private http:HttpClient , private cookieService : CookieService) { }

  // addCustomer(model:AddCustomerRequest):Observable<void>{
  //   return this.http.post<void>(this.apiUrl,model,{
  //     headers:{
  //       'Authorization': this.cookieService.get('Authorization')
  //     }
  //   });
  // }

  // getAllCustomer():Observable<Customer[]>{
  //   return this.http.get<Customer[]>(this.apiUrl,{
  //     headers:{
  //       'Authorization': this.cookieService.get('Authorization')
  //     }
  //   });
  // }

  // getCustomerById(id: number): Observable<Customer> {
  //   return this.http.get<Customer>(`${this.apiUrl}/${id}`,{
  //     headers:{
  //       'Authorization': this.cookieService.get('Authorization')
  //     }
  //   });
  // }
  // deleteCustomer(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`,{
  //     headers:{
  //       'Authorization': this.cookieService.get('Authorization')
  //     }
  //   });
  // }

  // updateCustomer(customer: Customer): Observable<Customer> {
  //   return this.http.put<Customer>(`${this.apiUrl}/${customer.CustomerId}`,
  //   customer,{
  //     headers:{
  //       'Authorization': this.cookieService.get('Authorization')
  //     }
  //   }
  //   );
  // }

  addCustomer(model:AddCustomerRequest):Observable<void>{
    return this.http.post<void>(this.apiUrl,model);
  }

  getAllCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.CustomerId}`,
    customer
    );   
  }
  getScheduledVehicles(id: number):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.api}/${id}`);
  }

  getCustomerIdByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customer/${email}`);
  }
  
}
