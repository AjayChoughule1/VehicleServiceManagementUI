import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vehicle } from '../../../Models/vehicle-model';
import { VehicleService } from '../../../Services/VehicleService/vehicle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.css'
})
export class EditVehicleComponent implements OnInit {
  vehicleId: number | undefined
  vehicle: Vehicle | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehicleId = +params['id'];
      this.fetchVehicleData();
    });
  }

  fetchVehicleData(): void {
    if (this.vehicleId !== undefined) {
      this.vehicleService.getVehicleById(this.vehicleId).subscribe(
        (data) => {
          if (data !== undefined) {
            this.vehicle = data;
          } else {
            console.error('No data returned for vehicle ID:', this.vehicleId);
          }
        },
        (error) => {
          console.error('Error fetching vehicle data:', error);
        }
      );
    } else {
      console.error('Vehicle ID is undefined.');
    }
  }
  

  saveVehicle(): void {
    if (this.vehicle) {
      this.vehicleService.updateVehicle(this.vehicle).subscribe(
        () => {
          this.router.navigate(['vehicleList']);
        },
        error => {
          console.error('Error updating vehicle:', error);
        }
      );
    } else {
      console.error('Cannot update vehicle: vehicle data is undefined.');
    }
  }
}