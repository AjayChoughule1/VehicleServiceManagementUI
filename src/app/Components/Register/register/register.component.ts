import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterService } from '../services/register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  model: RegisterRequest;
  private addSubscription?: Subscription;

  constructor(private router: Router, private registerService: RegisterService) {

    this.model = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      Address: '',
      Mobile: '',
    }
  }


  onFormSubmit() {
    this.addSubscription = this.registerService.addUsers(this.model).subscribe({
      next: (response) => {
        alert("Register Successfully");
        this.router.navigateByUrl('customerList');
      }
    })
  }
  ngOnDestroy(): void {
    this.addSubscription?.unsubscribe();
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
