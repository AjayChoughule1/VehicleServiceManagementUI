import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddCustomerRequest } from '../../../Models/add-customer-model';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../../Services/CustomerService/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnDestroy {
  model: AddCustomerRequest;
  private addSubscription?: Subscription

  constructor(private customerService: CustomerService, private router: Router) {
    this.model = {

      FirstName: ' ',
      LastName: ' ',
      Email: ' ',
      Password: ' ',
      Address: ' ',
      Mobile: ' ',
      IsDeleted: false,
      CreatedDate: new Date(),
      UpdatedDate: new Date()
    }
  }
  onFormSubmit() {
    this.addSubscription = this.customerService.addCustomer(this.model).subscribe({
      next: (response) => {
        alert("added");
        this.router.navigateByUrl('customerList');
      }
    })
  }
  ngOnDestroy(): void {
    this.addSubscription?.unsubscribe();
  }
}
