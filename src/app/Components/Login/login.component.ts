import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { LoginRequest } from './models/login-request.model';
import { LoginServiceService } from './services/login-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest;
  constructor(private router: Router, private loginservice: LoginServiceService,
    private cookieService: CookieService) {
    this.model = {
      email: '',
      password: ''
    };
  }
  onFormSubmit(): void {    
    this.loginservice.login(this.model)
      .subscribe({
        next: (res) => {
          this.cookieService.set('Authorization', `Bearer ${res.Token}`,
            undefined, '/', undefined, true, 'Strict');

            this.loginservice.setUser({
              email : res.Email,
              role : res.Role
            });
            alert("Login Success :)");
            this.router.navigateByUrl('home');
          },
          error: (err) => {
            alert("Something went wrong !");
          }
      });
      
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
