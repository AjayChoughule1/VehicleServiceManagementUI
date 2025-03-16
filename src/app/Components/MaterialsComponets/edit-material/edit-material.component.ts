import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialServiceService } from '../../../Services/MaterialService/material-service.service';
import { Material } from '../../../Models/materials-model';

@Component({
  selector: 'app-edit-material',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './edit-material.component.html',
  styleUrl: './edit-material.component.css'
})
export class EditMaterialComponent implements OnInit{
  itemID: number | undefined
  material: Material | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemID = +params['id'];
      this.fetchMaterialData();
    });
  }

  fetchMaterialData(): void {
    if (this.itemID !== undefined) {
      this.materialService.getMaterialById(this.itemID).subscribe(
        (data) => {
          if (data !== undefined) {
            this.material = data;
          } else {
            console.error('No data returned for material ID:', this.itemID);
          }
        },
        (error) => {
          console.error('Error fetching material data:', error);
        }
      );
    } else {
      console.error('material ID is undefined.');
    }
  }
  

  saveMaterial(): void {
    if (this.material) {
      this.materialService.updateMaterial(this.material).subscribe(
        () => {
          this.router.navigate(['material-list']);
        },
        error => {
          console.error('Error updating material:', error);
        }
      );
    } else {
      console.error('Cannot update material: material data is undefined.');
    }
  }
}
