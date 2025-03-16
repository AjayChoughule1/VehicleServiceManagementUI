import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ScheduledService } from '../../../Models/scheduledService-model';
import { ScheduledServiceService } from '../../../Services/ScheduledService/scheduled-service.service';

@Component({
  selector: 'app-delete-scheduled-services',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './delete-scheduled-services.component.html',
  styleUrl: './delete-scheduled-services.component.css'
})
export class DeleteScheduledServicesComponent {
  model?: ScheduledService;
  id: string | null = null;
  constructor(private route: ActivatedRoute, 
    private scheduledService: ScheduledServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        this.scheduledService.getScheduledServiceById(Number(this.id)).subscribe({
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
    this.scheduledService.deleteScheduledService(Number(this.id)).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('scheduledServices-list');
      },
      error: (err) => {
        alert("Something went wrong !");
      }
    })
  }
}
