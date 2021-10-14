import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'app/auth-service/auth-service';
import { JwtAuthStrategy } from 'app/auth-service/authStrategy';
import { HomeComponent } from 'app/home/home.component';
import { AuthGuard } from 'app/product-info/authGuard';
import { ProductInfoComponent } from 'app/product-info/product-info.component';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductInfoComponent,
        canActivate:[AuthGuard] },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'home', pathMatch: 'full'}
];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, HomeComponent, RegisterComponent, ProductInfoComponent ],
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes) 
      ],
        providers: [AuthService, JwtAuthStrategy, AuthGuard, HttpClient, HttpHandler,{provide: APP_BASE_HREF, useValue : '/' }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set submitted to true', () => {
    expect(component.submitted).toEqual(false);
  });

  it('form invalid when empty', () => {
    expect(component.formdata.valid).toBeFalsy();
  });

  it('should render title in a h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Please register');
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.formdata.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('should call the method register', () => {
    spyOn(component, 'register');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.register).toHaveBeenCalledTimes(1); 
  });
});
