import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddScheduledService } from '../../Models/add-ScheduledService-model';
import { Observable } from 'rxjs';
import { ScheduledService } from '../../Models/scheduledService-model';

@Injectable({
  providedIn: 'root'
})
export class ScheduledServiceService {

  private apiUrl = 'http://localhost:5141/api/ScheduledServices';
  private api ='http://localhost:5141/api/ScheduledServices/ScheduledService'

  constructor(private http: HttpClient) { }

  addScheduledService(model: AddScheduledService): Observable<void> {
    return this.http.post<void>(this.apiUrl, model);
  }
  getAllScheduledService(): Observable<ScheduledService[]> {
    return this.http.get<ScheduledService[]>(this.apiUrl);
  }
  getScheduledServiceById(id: number): Observable<ScheduledService> {
    return this.http.get<ScheduledService>(`${this.apiUrl}/${id}`);
  }
  deleteScheduledService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getScheduledVehicles(id: number):Observable<ScheduledService[]>{
    return this.http.get<ScheduledService[]>(`${this.api}/${id}`);
  }
}

