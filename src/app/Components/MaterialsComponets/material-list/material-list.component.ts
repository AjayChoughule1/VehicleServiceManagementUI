import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Material } from '../../../Models/materials-model';
import { MaterialServiceService } from '../../../Services/MaterialService/material-service.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent implements OnInit {

  Material: Material[] = [];


  constructor(private MaterialService: MaterialServiceService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.MaterialService.getAllMaterials()
      .subscribe(veh => {
        this.Material = veh.filter(material => material.IsDeleted === false);
      });
  }

  navigateToEditForm(materialId: number): void {
    this.router.navigate(['/edit-material', materialId]);
  }
  navigateToDeleteForm(materialId: number): void {
    this.router.navigate(['/delete-material', materialId]);
  }
  navigateToAddMaterialForm(): void {
    this.router.navigate(['/add-material']);
  }

}
