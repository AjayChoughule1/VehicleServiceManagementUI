import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../Services/CustomerService/customer.service';
import { Customer } from '../../../Models/customer-model';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.css'
})
export class DeleteCustomerComponent {
  model?: Customer;
  id: string | null = null;
  constructor(private route: ActivatedRoute, 
    private customerService: CustomerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        this.customerService.getCustomerById(Number(this.id)).subscribe({
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
    this.customerService.deleteCustomer(Number(this.id)).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('customerList');
      },
      error: (err) => {
        alert("Something went wrong !");
      }
    })
  }

}
