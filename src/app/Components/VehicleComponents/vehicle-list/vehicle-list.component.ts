import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Vehicle } from '../../../Models/vehicle-model';
import { VehicleService } from '../../../Services/VehicleService/vehicle.service';
import { User } from '../../Login/models/user.model';
import { LoginServiceService } from '../../Login/services/login-service.service';
import { forkJoin } from 'rxjs';
import { ScheduledServiceService } from '../../../Services/ScheduledService/scheduled-service.service';
import { CustomerService } from '../../../Services/CustomerService/customer.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {

  Vehicle: Vehicle[] = [];
  user?: User;

  constructor(private VehicleService: VehicleService,
    private router: Router,
    private loginService: LoginServiceService,
    private serviceAdvisor:ScheduledServiceService,
    private customerService:CustomerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngOnInit(): void {
    // this.VehicleService.getAllVehicles()
    //   .subscribe(veh => {
    //     this.Vehicle = veh.filter(vehicle => vehicle.IsDeleted === false);
    //   });

    //   this.loginService.user()
    //   .subscribe({
    //     next: (response) => {
    //       this.user = response;
    //     }
    //   })  
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.user = this.loginService.getUser();
    //   }

    this.loginService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    })  
    if (isPlatformBrowser(this.platformId)) {
      this.user = this.loginService.getUser();
    }


    if (this.user && this.user.role === 'Service Advisor') {
      this.serviceAdvisor.getScheduledVehicles(1).subscribe({


        next: (scheduledVehicles) => {
          const vehicleRequests = scheduledVehicles.map((element) =>
            this.VehicleService.getVehicleById(element.VehicleID)
          );
  
          forkJoin(vehicleRequests).subscribe({
            next: (vehicleDetails) => {
              this.Vehicle = vehicleDetails.filter(vehicle => vehicle.IsDeleted === false);
              console.log(vehicleDetails);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
  
      })
    }
    else if(this.user && this.user.role === 'Admin'){
      this.VehicleService.getAllVehicles()
      .subscribe(veh => {
        this.Vehicle = veh.filter(vehicle => vehicle.IsDeleted === false);
      });    
    }
  //  else if(this.user && this.user.role === 'Customer'){
  //     this.customerService.getScheduledVehicles(1).subscribe({


  //       next: (scheduledVehicles) => {
  //         console.log(scheduledVehicles)
  //         const vehicleRequests = scheduledVehicles.map((element) =>
  //           this.VehicleService.getVehicleById(element.VehicleId)
  //         );
  
  //         forkJoin(vehicleRequests).subscribe({
  //           next: (vehicleDetails) => {
  //             this.Vehicle = vehicleDetails.filter(vehicle => vehicle.IsDeleted === false);
  //             console.log(vehicleDetails);
  //           },
  //           error: (err) => {
  //             console.log(err);
  //           },
  //         });
  //       }
  
  //     })
  //   }

  else if (this.user && this.user.role === 'Customer') {
    this.customerService.getCustomerIdByEmail(this.user.email).subscribe({
      next: (customer) => {
        const customerId = customer.CustomerId;
        //this.customerService.getScheduledVehicles(customerId).subscribe({
          this.customerService.getScheduledVehicles(1).subscribe({

          next: (scheduledVehicles) => {
            const vehicleRequests = scheduledVehicles.map((element) =>
              this.VehicleService.getVehicleById(element.VehicleId)
            );
  
            forkJoin(vehicleRequests).subscribe({
              next: (vehicleDetails) => {
                this.Vehicle = vehicleDetails.filter(vehicle => !vehicle.IsDeleted);
                console.log(vehicleDetails);
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  
  
  
  
  }

  navigateToEditForm(vehicleId: number): void {
    this.router.navigate(['/edit-vehicle', vehicleId]);
  }
  navigateToDeleteForm(vehicleId: number): void {
    this.router.navigate(['/delete-vehicle', vehicleId]);
  }
  navigateToAddVehicleForm(): void {
    this.router.navigate(['/addVehicle']);
  }
  addServiceRepresentative(vehicleId: number): void {
    this.router.navigate(['/asign-serviceRepresentative', vehicleId]);
  }
  addServiceAdviserInvice(vehicleId: number): void {
    this.router.navigate(['/create-invice', vehicleId]);
  }
}

