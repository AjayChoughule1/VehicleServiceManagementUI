import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMaterialRequest } from '../../Models/add-Material-model';
import { Material } from '../../Models/materials-model';

@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {

  private apiUrl = 'http://localhost:5141/api/Materials';

  constructor(private http:HttpClient) { }

  addMaterial(model:AddMaterialRequest):Observable<void>{
    return this.http.post<void>(this.apiUrl,model);
  }

  getAllMaterials():Observable<Material[]>{
    return this.http.get<Material[]>(this.apiUrl);
  }
  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }
  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateMaterial(material: Material): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${material.ItemID}`, material);
  }
}