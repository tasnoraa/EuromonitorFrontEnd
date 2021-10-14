import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./product-info/authGuard";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { RegisterComponent } from "./register/register.component";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductInfoComponent,
        canActivate:[AuthGuard] },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'home', pathMatch: 'full'}
];