import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ScheduledService } from '../../../Models/scheduledService-model';
import { ScheduledServiceService } from '../../../Services/ScheduledService/scheduled-service.service';

@Component({
  selector: 'app-list-scheduled-services',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './list-scheduled-services.component.html',
  styleUrl: './list-scheduled-services.component.css'
})
export class ListScheduledServicesComponent implements OnInit{
  ScheduledService: ScheduledService[] = [];

  constructor(private scheduledServiceService: ScheduledServiceService, private router:Router) { }

  ngOnInit(): void {
    this.scheduledServiceService.getAllScheduledService()
      .subscribe(veh => {
        this.ScheduledService = veh.filter(ScheduledService => ScheduledService.IsDeleted === false);
      });
  }
  
  navigateToEditForm(scheduledServiceId: number): void {
    //this.router.navigate(['/edit-serviceRepresentative', scheduledServiceId]);
  }
  navigateToDeleteForm(scheduledServiceId: number): void {
    this.router.navigate(['/delete-deleteScheduledServices', scheduledServiceId]);
  }
}
