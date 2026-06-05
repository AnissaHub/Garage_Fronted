import { Routes } from '@angular/router';
import { ListCarComponent } from './list-car-component/list-car-component';
import { CarDetailComponent } from './car-detail-component/car-detail-component';
import { CartComponent } from './cart-component/cart-component';
import { LoginComponent } from './login-component/login-component';
import { authGuard} from './services/auth-guard';
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
    }

];
