import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:5141/api/Account/register';
  

  constructor(private http:HttpClient) { }


  addUsers(model:RegisterRequest):Observable<void>{
    return this.http.post<void>(this.apiUrl,model);
  }
}
