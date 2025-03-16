import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{LoginComponent} from './Components/Login/login.component';
import{HomeComponent} from './Screens/home/home.component'
import { NavbarComponent } from "./Components/Layout/Navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { VehicleListComponent } from './Components/VehicleComponents/vehicle-list/vehicle-list.component';
import { FooterComponent } from './Components/Layout/Footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LoginComponent, HomeComponent, NavbarComponent,HttpClientModule,VehicleListComponent,FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VehicleServiceManagementUI';
}
