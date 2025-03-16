import { Component } from '@angular/core';
import { Vehicle } from '../../../Models/vehicle-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VehicleService } from '../../../Services/VehicleService/vehicle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './delete-vehicle.component.html',
  styleUrl: './delete-vehicle.component.css'
})
export class DeleteVehicleComponent {
  model?: Vehicle;
  id: string | null = null;
  constructor(private route: ActivatedRoute, 
    private vehicleService: VehicleService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        this.vehicleService.getVehicleById(Number(this.id)).subscribe({
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
    this.vehicleService.deleteVehicle(Number(this.id)).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('vehicleList');
      },
      error: (err) => {
        alert("Something went wrong !");
      }
    })
  }
}
