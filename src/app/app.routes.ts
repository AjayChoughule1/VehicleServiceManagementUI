import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login.component';
import { HomeComponent } from './Screens/home/home.component';
import { AddCustomerComponent } from './Components/CustomerComponents/add-customer/add-customer.component';
import { VehicleListComponent } from './Components/VehicleComponents/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './Components/VehicleComponents/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './Components/VehicleComponents/edit-vehicle/edit-vehicle.component';
import { CustomerListComponent } from './Components/CustomerComponents/customer-list/customer-list.component';
import { DeleteCustomerComponent } from './Components/CustomerComponents/delete-customer/delete-customer.component';
import { EditCustomerComponent } from './Components/CustomerComponents/edit-customer/edit-customer.component';
import { DeleteVehicleComponent } from './Components/VehicleComponents/delete-vehicle/delete-vehicle.component';
import { AddServiceRepresentativeComponent } from './Components/ServiceRepresentativeComponents/add-service-representative/add-service-representative.component';
import { ServiceRepresentativeListComponent } from './Components/ServiceRepresentativeComponents/service-representative-list/service-representative-list.component';
import { RemoveServiceRepresentativeComponent } from './Components/ServiceRepresentativeComponents/remove-service-representative/remove-service-representative.component';
import { EditServiceRepresentativeComponent } from './Components/ServiceRepresentativeComponents/edit-service-representative/edit-service-representative.component';
import { AsignRepresentativeComponent } from './Components/ServiceRepresentativeComponents/asign-representative/asign-representative.component';
import { ListScheduledServicesComponent } from './Components/ScheduledServicesComponents/list-scheduled-services/list-scheduled-services.component';
import { DeleteScheduledServicesComponent } from './Components/ScheduledServicesComponents/delete-scheduled-services/delete-scheduled-services.component';
import { AddMaterialComponent } from './Components/MaterialsComponets/add-material/add-material.component';
import { MaterialListComponent } from './Components/MaterialsComponets/material-list/material-list.component';
import { DeleteMaterialComponent } from './Components/MaterialsComponets/delete-material/delete-material.component';
import { EditMaterialComponent } from './Components/MaterialsComponets/edit-material/edit-material.component';
import { CreateInviceComponent } from './Components/InviceComponents/create-invice/create-invice.component';
import { authGuard } from './Components/Guards/auth.guard';
import { RegisterComponent } from './Components/Register/register/register.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'register' , component:RegisterComponent},
    { path: 'home', component: HomeComponent },

    //Customer
    { path: 'addCustomer', component: AddCustomerComponent},
    { path: 'customerList', component: CustomerListComponent,canActivate:[authGuard] },
    { path: 'delete-customer/:id', component: DeleteCustomerComponent,canActivate:[authGuard] },
    { path: 'edit-customer/:id', component: EditCustomerComponent,canActivate:[authGuard] },

    //Vehicle
    { path: 'addVehicle', component: AddVehicleComponent},
    { path: 'vehicleList', component: VehicleListComponent },
    { path: 'delete-vehicle/:id', component: DeleteVehicleComponent,canActivate:[authGuard] },
    { path: 'edit-vehicle/:id', component: EditVehicleComponent,canActivate:[authGuard] },

    //ServiceRepresentative
    { path: 'add-serviceRepresentative', component: AddServiceRepresentativeComponent,canActivate:[authGuard] },
    { path: 'serviceRepresentative-list', component: ServiceRepresentativeListComponent,canActivate:[authGuard] },
    { path: 'delete-serviceRepresentative/:id', component: RemoveServiceRepresentativeComponent,canActivate:[authGuard] },
    { path: 'edit-serviceRepresentative/:id', component: EditServiceRepresentativeComponent,canActivate:[authGuard] },

    //ScheduledServices
    { path: 'asign-serviceRepresentative/:id', component: AsignRepresentativeComponent,canActivate:[authGuard] },
    { path: 'scheduledServices-list', component: ListScheduledServicesComponent,canActivate:[authGuard] },
    { path: 'delete-deleteScheduledServices/:id', component: DeleteScheduledServicesComponent,canActivate:[authGuard] },
    
    //Materials   
    { path: 'add-material', component: AddMaterialComponent,canActivate:[authGuard] },
    { path: 'material-list', component: MaterialListComponent,canActivate:[authGuard] },
    { path: 'delete-material/:id', component: DeleteMaterialComponent,canActivate:[authGuard] },
    { path: 'edit-material/:id', component: EditMaterialComponent,canActivate:[authGuard] },

    //Invice
    { path: 'create-invice/:id', component: CreateInviceComponent },
];

