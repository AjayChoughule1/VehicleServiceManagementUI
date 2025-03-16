import { CommonModule,isPlatformBrowser  } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginServiceService } from '../../Login/services/login-service.service';
import { User } from '../../Login/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  //isLoginPage: boolean = false;
  user?: User;
  showUserBox: boolean = false;

  constructor(private router: Router, private loginService: LoginServiceService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

    toggleUserBox() {
      this.showUserBox = !this.showUserBox;

    }

  ngOnInit(): void {

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.isLoginPage = (event.url === '/login');
    //   }
    // });

    this.loginService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      })  
      if (isPlatformBrowser(this.platformId)) {
        this.user = this.loginService.getUser();
      }
  }
  onLogout(): void{
    this.loginService.logout();
    this.router.navigateByUrl('/');
    this.showUserBox = false;
  }
}
