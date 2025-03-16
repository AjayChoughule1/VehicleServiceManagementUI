import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vehicle } from '../../../Models/vehicle-model';
import { VehicleService } from '../../../Services/VehicleService/vehicle.service';
import { ServiceRepresentative } from '../../../Models/ServiceRepresentative-model';
import { ServiceRepresentativeService } from '../../../Services/ServiceRepresentativeService/service-representative.service';
import { ScheduledServiceService } from '../../../Services/ScheduledService/scheduled-service.service';
import { AddScheduledService } from '../../../Models/add-ScheduledService-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asign-representative',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './asign-representative.component.html',
  styleUrl: './asign-representative.component.css'
})
export class AsignRepresentativeComponent implements OnInit {
  model?: Vehicle;
  id: string | null = null;
  serviceRepresentatives: ServiceRepresentative[] = [];
  selectedRepId: number = 0;
  selectedVehicleId: number = 0;
  detailsSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private serviceRepresentativeService: ServiceRepresentativeService,
    private scheduledServiceService: ScheduledServiceService
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

    this.loadServiceRepresentatives();
    this.detailsSaved = true;
  }

  loadServiceRepresentatives() {
    this.serviceRepresentativeService.getAllServiceRepresentative()
      .subscribe(veh => {
        this.serviceRepresentatives = veh.filter(serviceRepresentative => !serviceRepresentative.IsDeleted);
      });
  }

  selectServiceRepresentative(event: any): void {
    this.selectedRepId = event.target.value;
    console.log('Selected Service Representative ID:', this.selectedRepId);
  }

  selectVehicle(event: any): void {
    this.selectedVehicleId = event.target.value;
    console.log('Selected Vehicle ID:', this.selectedVehicleId);
  }

  onFormSubmit() {

    const vehicle: Vehicle = {
      VehicleCategory: this.model?.VehicleCategory,
      VehicleRegNo: this.model?.VehicleRegNo,
      VehicleNumber: this.model?.VehicleNumber,
      VehicleModel: this.model?.VehicleModel,
      VehicleBrand: this.model?.VehicleBrand,
      Status: 'In-Progress',
      IsDeleted: false,
      CreatedDate: new Date(),
      UpdatedDate: new Date(),
      CustomerId: 1,
      VehicleId: Number(this.id)
    }
    this.vehicleService.updateVehicle(vehicle)
      .subscribe(() => {

    if (this.model) {
      this.selectedVehicleId = this.model.VehicleId;
      const scheduledServiceModel: AddScheduledService = {
        ServiceAdvisorID: this.selectedRepId,
        VehicleID: this.selectedVehicleId,
        ScheduledDate: new Date(),
        IsDeleted: false
      };

      this.scheduledServiceService.addScheduledService(scheduledServiceModel)
        .subscribe(() => {
          alert('Scheduled service added successfully!');
          this.router.navigate(['vehicleList']);
        }, (error) => {
          console.error('Error adding scheduled service:', error);
          alert('Error adding scheduled service. Please try again later.');
        });
    } else {
      alert('No vehicle selected!');
    }
  });
  }

}
