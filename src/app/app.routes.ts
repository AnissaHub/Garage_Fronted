import { Routes } from '@angular/router';
import { ListCarComponent } from './list-car-component/list-car-component';
import { CarDetailComponent } from './car-detail-component/car-detail-component';
import { CartComponent } from './cart-component/cart-component';
import { LoginComponent } from './login-component/login-component';
import { authGuard } from './services/auth-guard';
import { RegisterComponent } from './register-component/register-component';
import { adminGuard } from './services/admin-guard';
import { AdminComponent } from './admin-component/admin-component';



export const routes: Routes = [
    {
        path: '',
        component: ListCarComponent 
    },
    {
        path: 'car/:immatriculation',
        component: CarDetailComponent 
    },
    {
    path: 'cart',
         component: CartComponent,
         canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    
    {
        path: 'register',
        component: RegisterComponent
    },
    
     {
    path: 'cart',
         component: CartComponent,
         canActivate: [authGuard]
    },
     
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminGuard]
    }
     

];
