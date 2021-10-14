import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './auth-service/auth-service';
import { JwtAuthStrategy } from './auth-service/authStrategy';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './product-info/authGuard';
import { ProductInfoComponent } from './product-info/product-info.component';
import { RegisterComponent } from './register/register.component';

describe('AppComponent', () => {
  const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductInfoComponent,
        canActivate:[AuthGuard] },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'home', pathMatch: 'full'}
];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ProductInfoComponent,
        RegisterComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)   
      ],
      providers: [AuthService, JwtAuthStrategy, AuthGuard, {provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should set submitted to be false', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.submitForm).toEqual(false);
  }));

  it('should set submitted to true', async(() => {
    var data;
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    comp.login(data);
    expect(comp.submitForm).toBeTruthy();
  }));

  it('form should not be valid', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    comp.formdata.controls['username'].setValue('');
    comp.formdata.controls['password'].setValue('');
    expect(comp.formdata.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    comp.formdata.controls['username'].setValue('username');
    comp.formdata.controls['password'].setValue('password');
    expect(comp.formdata.valid).toBeTruthy();
  }));
});
