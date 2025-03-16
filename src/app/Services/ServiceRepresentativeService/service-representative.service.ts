import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddServiceRepresentative } from '../../Models/Add-ServiceRepresentative-model';
import { Observable } from 'rxjs';
import { ServiceRepresentative } from '../../Models/ServiceRepresentative-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepresentativeService {

  private apiUrl = 'http://localhost:5141/api/ServiceRepresentatives';

  constructor(private http: HttpClient) { }

  addServiceRepresentative(model: AddServiceRepresentative): Observable<void> {
    return this.http.post<void>(this.apiUrl, model);
  }

  getAllServiceRepresentative(): Observable<ServiceRepresentative[]> {
    return this.http.get<ServiceRepresentative[]>(this.apiUrl);
  }
  getServiceRepresentativeById(id: number): Observable<ServiceRepresentative> {
    return this.http.get<ServiceRepresentative>(`${this.apiUrl}/${id}`);
  }
  deleteServiceRepresentative(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateServiceRepresentative(serviceRepresentative: ServiceRepresentative): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${serviceRepresentative.RepresentativeID}`, serviceRepresentative);
  }
}
