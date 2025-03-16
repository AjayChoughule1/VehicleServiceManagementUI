import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddServiceRecordRequest } from '../../Models/add-serviceRecord-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceRecordService {

  private apiUrl = 'http://localhost:5141/api/ServiceRecords';

  constructor(private http: HttpClient) { }

  addServiceRecords(model: AddServiceRecordRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, model);
  }
  // getAllScheduledService(): Observable<ScheduledService[]> {
  //   return this.http.get<ScheduledService[]>(this.apiUrl);
  // }
  // getScheduledServiceById(id: number): Observable<ScheduledService> {
  //   return this.http.get<ScheduledService>(`${this.apiUrl}/${id}`);
  // }
  // deleteScheduledService(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
  // getScheduledVehicles(id: number):Observable<ScheduledService[]>{
  //   return this.http.get<ScheduledService[]>(`${this.api}/${id}`);
  // }
}
