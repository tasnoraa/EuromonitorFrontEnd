import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth-service/auth-service';
import { JwtAuthStrategy } from './auth-service/authStrategy';
import { AuthGuard } from './product-info/authGuard';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProductInfoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)   
  ],
  providers: [AuthService, JwtAuthStrategy, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
