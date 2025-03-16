import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddServiceRecordItemRequest } from '../../Models/add-serviceRecordItem-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRecordItemService {

  private apiUrl = 'http://localhost:5141/api/ServiceRecordItems';

  constructor(private http: HttpClient) { }

  addServiceRecordItems(model: AddServiceRecordItemRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, model);
  }
}
