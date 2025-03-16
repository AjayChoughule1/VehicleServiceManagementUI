import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AddServiceRepresentative } from '../../../Models/Add-ServiceRepresentative-model';
import { Subscription } from 'rxjs';
import { ServiceRepresentativeService } from '../../../Services/ServiceRepresentativeService/service-representative.service';

@Component({
  selector: 'app-add-service-representative',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './add-service-representative.component.html',
  styleUrl: './add-service-representative.component.css'
})
export class AddServiceRepresentativeComponent implements OnDestroy {
  model: AddServiceRepresentative;
  private addSubscription?: Subscription

  constructor(private serviceRepresentativeService: ServiceRepresentativeService, private router: Router) {
    this.model = {
      FirstName: ' ',
      LastName: ' ',
      ContactNumber: ' ',
      Email: ' ',
      IsDeleted: false,
    }
  }
  onFormSubmit() {
    this.addSubscription = this.serviceRepresentativeService.addServiceRepresentative(this.model).subscribe({
      next: (response) => {
        alert("Successfully Added Representative !");
        this.router.navigateByUrl('serviceRepresentative-list');
      }
    })
  }
  ngOnDestroy(): void {
    this.addSubscription?.unsubscribe();
  }
}
