import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Material } from '../../../Models/materials-model';
import { MaterialServiceService } from '../../../Services/MaterialService/material-service.service';

@Component({
  selector: 'app-delete-material',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './delete-material.component.html',
  styleUrl: './delete-material.component.css'
})
export class DeleteMaterialComponent {
  model?: Material;
  id: string | null = null;
  constructor(private route: ActivatedRoute, 
    private materialService: MaterialServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        this.materialService.getMaterialById(Number(this.id)).subscribe({
          next: (res) => {
            this.model = res;
          },
          error: (err) => {
            alert("Something went wrong !");
          }
        });
      }
    });

  };

  onFormSubmit(){
    this.materialService.deleteMaterial(Number(this.id)).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('material-list');
      },
      error: (err) => {
        alert("Something went wrong !");
      }
    })
  }
}
