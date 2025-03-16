import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from '../../../Models/customer-model';
import { CustomerService } from '../../../Services/CustomerService/customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {
  customerId: number | undefined
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      this.fetchCustomerData();
    });
  }

  fetchCustomerData(): void {
    if (this.customerId !== undefined) {
      this.customerService.getCustomerById(this.customerId).subscribe(
        (data) => {
          if (data !== undefined) {
            this.customer = data;
          } else {
            console.error('No data returned for vehicle ID:', this.customerId);
          }
        },
        (error) => {
          console.error('Error fetching vehicle data:', error);
        }
      );
    } else {
      console.error('Vehicle ID is undefined.');
    }
  }
  

  saveCustomer(): void {
    if (this.customer) {
      this.customerService.updateCustomer(this.customer).subscribe(
        () => {
          this.router.navigate(['customerList']);
        },
        error => {
          console.error('Error updating customer:', error);
        }
      );
    } else {
      console.error('Cannot update customer: customer data is undefined.');
    }
  }
}

