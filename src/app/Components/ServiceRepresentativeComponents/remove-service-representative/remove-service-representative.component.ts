import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceRepresentative } from '../../../Models/ServiceRepresentative-model';
import { ServiceRepresentativeService } from '../../../Services/ServiceRepresentativeService/service-representative.service';

@Component({
  selector: 'app-remove-service-representative',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './remove-service-representative.component.html',
  styleUrl: './remove-service-representative.component.css'
})
export class RemoveServiceRepresentativeComponent {
  model?: ServiceRepresentative;
  id: string | null = null;
  constructor(private route: ActivatedRoute, 
    private serviceRepresentativeService: ServiceRepresentativeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        this.serviceRepresentativeService.getServiceRepresentativeById(Number(this.id)).subscribe({
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
    this.serviceRepresentativeService.deleteServiceRepresentative(Number(this.id)).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('serviceRepresentative-list');
      },
      error: (err) => {
        alert("Something went wrong !");
      }
    })
  }
}
