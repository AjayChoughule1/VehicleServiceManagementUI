import { Component, OnDestroy } from '@angular/core';
import { AddMaterialRequest } from '../../../Models/add-Material-model';
import { Subscription } from 'rxjs';
import { MaterialServiceService } from '../../../Services/MaterialService/material-service.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.css'
})
export class AddMaterialComponent implements OnDestroy {
  model: AddMaterialRequest;
  private addSubscription?: Subscription

  constructor(private materialService: MaterialServiceService, private router: Router) {
    this.model = {
      ItemName: ' ',
      Cost: ' ',
      IsDeleted: false,
    }
  }
  onFormSubmit() {
    this.addSubscription = this.materialService.addMaterial(this.model).subscribe({
      next: (response) => {
        alert("Successfully Added material !");
        this.router.navigateByUrl('material-list');
      }
    })
  }
  ngOnDestroy(): void {
    this.addSubscription?.unsubscribe();
  }
}
