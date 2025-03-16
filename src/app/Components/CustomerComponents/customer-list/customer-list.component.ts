import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomerService } from '../../../Services/CustomerService/customer.service';
import { Customer } from '../../../Models/customer-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule, CommonModule,RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  Customer: Customer[] = [];

  constructor(private CustomerService: CustomerService, private router: Router) { }

  // ngOnInit(): void {
  //   this.CustomerService.getAllCustomer()
  //     .subscribe(veh => {
  //       this.Customer = veh;
  //     });
  // }
  ngOnInit(): void {
    this.CustomerService.getAllCustomer()
      .subscribe(customers => {
        // Filter the customers where isDeleted is true
        this.Customer = customers.filter(customer => customer.IsDeleted === false);
      });
  }

  navigateToAddCustomerForm(): void {
    this.router.navigate(['/addCustomer']);
  }
  navigateToEditForm(customerId: number): void {
    this.router.navigate(['/edit-customer', customerId]);
  }
  navigateToDeleteForm(customerId: number): void {
    this.router.navigate(['/delete-customer', customerId]);
  }

}
