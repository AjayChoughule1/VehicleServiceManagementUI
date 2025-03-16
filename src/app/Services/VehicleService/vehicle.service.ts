import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../../Models/vehicle-model';
import { AddVehicleRequest } from '../../Models/add-vehicle-model';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5141/api/Vehicles';

  constructor(private http:HttpClient) { }

  addVehicle(model:AddVehicleRequest):Observable<void>{
    return this.http.post<void>(this.apiUrl,model);
  }

  getAllVehicles():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.apiUrl);
  }
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateVehicle(vehicle: Vehicle): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${vehicle.VehicleId}`, vehicle);
  }
  
}

