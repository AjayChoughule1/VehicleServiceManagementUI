import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddVehicleRequest } from '../../../Models/add-vehicle-model';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../../Services/VehicleService/vehicle.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../Services/CustomerService/customer.service';
import { User } from '../../Login/models/user.model';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements  OnDestroy{
  model: AddVehicleRequest;
  selectedCustomerId: number = 0;
  user?: User;
  private addSubscription?: Subscription

  constructor(private vehicleService: VehicleService, private router: Router, private customerService:CustomerService) {
    this.model = {
      VehicleCategory: '',
      VehicleRegNo: '',
      VehicleNumber: '',
      VehicleModel: '',
      VehicleBrand: '',
      Status: 'pending',
      IsDeleted: false,
      CreatedDate: new Date(),
      UpdatedDate: new Date(),
      CustomerId: 0 
    };

    //Get Current Logged in Customer ID
    const loggedInCustomerId = 1;
    if (loggedInCustomerId) {
      this.model.CustomerId = loggedInCustomerId;
    }


  }
  
 
  onFormSubmit() {
    this.addSubscription = this.vehicleService.addVehicle(this.model).subscribe({
      next: (response) => {
        alert("added");
        this.router.navigateByUrl('vehicleList');
      }
    })
  }
  ngOnDestroy(): void {
    this.addSubscription?.unsubscribe();
  }
}
