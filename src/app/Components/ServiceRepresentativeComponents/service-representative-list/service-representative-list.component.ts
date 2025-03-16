import { Component, OnInit } from '@angular/core';
import { ServiceRepresentative } from '../../../Models/ServiceRepresentative-model';
import { ServiceRepresentativeService } from '../../../Services/ServiceRepresentativeService/service-representative.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-representative-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './service-representative-list.component.html',
  styleUrl: './service-representative-list.component.css'
})
export class ServiceRepresentativeListComponent implements OnInit {
  ServiceRepresentative: ServiceRepresentative[] = [];

  constructor(private ServiceRepresentativeService: ServiceRepresentativeService, private router:Router) { }

  ngOnInit(): void {
    this.ServiceRepresentativeService.getAllServiceRepresentative()
      .subscribe(veh => {
        this.ServiceRepresentative = veh.filter(serviceRepresentative => serviceRepresentative.IsDeleted === false);
      });
  }
  
  navigateToEditForm(serviceRepresentativeId: number): void {
    this.router.navigate(['/edit-serviceRepresentative', serviceRepresentativeId]);
  }
  navigateToDeleteForm(serviceRepresentativeId: number): void {
    this.router.navigate(['/delete-serviceRepresentative', serviceRepresentativeId]);
  }
  navigateToAddServiceRepresentativeForm():void{
    this.router.navigate(['/add-serviceRepresentative']);
  }
}
