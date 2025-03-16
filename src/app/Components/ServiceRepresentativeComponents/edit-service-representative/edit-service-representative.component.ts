import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceRepresentative } from '../../../Models/ServiceRepresentative-model';
import { ServiceRepresentativeService } from '../../../Services/ServiceRepresentativeService/service-representative.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service-representative',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './edit-service-representative.component.html',
  styleUrl: './edit-service-representative.component.css'
})
export class EditServiceRepresentativeComponent implements OnInit {

  representativeID: number | undefined
  serviceRepresentative: ServiceRepresentative | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceRepresentativeService: ServiceRepresentativeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.representativeID = +params['id'];
      this.fetchRepresentativeData();
    });
  }

  fetchRepresentativeData(): void {
    if (this.representativeID !== undefined) {
      this.serviceRepresentativeService.getServiceRepresentativeById(this.representativeID).subscribe(
        (data) => {
          if (data !== undefined) {
            this.serviceRepresentative = data;
          } else {
            console.error('No data returned for serviceRepresentative ID:', this.representativeID);
          }
        },
        (error) => {
          console.error('Error fetching serviceRepresentative data:', error);
        }
      );
    } else {
      console.error('serviceRepresentative ID is undefined.');
    }
  }
  

  saveServiceRepresentative(): void {
    if (this.serviceRepresentative) {
      this.serviceRepresentativeService.updateServiceRepresentative(this.serviceRepresentative).subscribe(
        () => {
          this.router.navigate(['serviceRepresentative-list']);
        },
        error => {
          console.error('Error updating serviceRepresentative:', error);
        }
      );
    } else {
      console.error('Cannot update serviceRepresentative: serviceRepresentative data is undefined.');
    }
  }
}
