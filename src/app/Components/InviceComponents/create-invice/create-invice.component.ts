import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vehicle } from '../../../Models/vehicle-model';
import { VehicleService } from '../../../Services/VehicleService/vehicle.service';
import { MaterialServiceService } from '../../../Services/MaterialService/material-service.service';
import { Material } from '../../../Models/materials-model';
import { AddServiceRecordRequest } from '../../../Models/add-serviceRecord-model';
import { ServiceRecordService } from '../../../Services/ServiceRecordService/service-record.service';
import { AddServiceRecordItemRequest } from '../../../Models/add-serviceRecordItem-model';
import { ServiceRecordItemService } from '../../../Services/ServiceRecordItems/service-record-item.service';

@Component({
  selector: 'app-create-invice',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './create-invice.component.html',
  styleUrl: './create-invice.component.css'
})
export class CreateInviceComponent {
  model?: Vehicle;

  id: string | null = null;
  material: Material[] = [];
  quantityValue: number = 0;
  selectedMatId: number = 0;
  selectedVehicleId: number = 0;
  detailsSaved: boolean = false;


  constructor(private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private materialService: MaterialServiceService,
    private serviceRecordService: ServiceRecordService,
    private serviceRecordItemService: ServiceRecordItemService,
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
    this.loadServiceRepresentatives();
    this.quantityValue = 0;
  };


  loadServiceRepresentatives() {
    this.materialService.getAllMaterials()
      .subscribe(veh => {
        this.material = veh.filter(materials => !materials.IsDeleted);
      });
  }

  selectMaterials(event: any): void {
    this.selectedMatId = event.target.value;
    console.log('Selected Service Materials ID:', this.selectedMatId);
  }
  onFormSubmit() {

    const vehicle: Vehicle = {
      VehicleCategory: this.model?.VehicleCategory,
      VehicleRegNo: this.model?.VehicleRegNo,
      VehicleNumber: this.model?.VehicleNumber,
      VehicleModel: this.model?.VehicleModel,
      VehicleBrand: this.model?.VehicleBrand,
      Status: 'Completed',
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
          const serviceRecordModel: AddServiceRecordRequest = {
            IsDeleted: false,
            RepresentativeID: 1,
            ServiceDate: new Date,
            VehicleID: this.selectedVehicleId,
            CustomerId: 1
          };

          this.serviceRecordService.addServiceRecords(serviceRecordModel)
            .subscribe({
              next: (response) => {
                const serviceRecordItemModel: AddServiceRecordItemRequest = {
                  Quantity: this.quantityValue,
                  IsDeleted: false,
                  ServiceRecordID: response.ServiceRecordID,
                  ItemId: this.selectedMatId
                };
                this.serviceRecordItemService.addServiceRecordItems(serviceRecordItemModel)
                  .subscribe(() => {
                    alert('Service added successfully!');
                    this.router.navigate(['vehicleList']);
                  });
              },
              error: (error) => {
                console.error('Error adding scheduled service:', error);
                alert('Error adding scheduled service. Please try again later.');
              }
            });
        } else {
          alert('No vehicle selected!');
        }
      });
  }
}
