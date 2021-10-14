import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth-service/auth-service';
import { JwtAuthStrategy } from './auth-service/authStrategy';
import { JWTToken } from './models/jwtToken';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  formdata;
  submitForm = false;
  constructor(private authService: AuthService, private router: Router, private authStrategy: JwtAuthStrategy){
    this.createForm();
  }
  ngOnInit(){}

  createForm(){
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
   });
  }



 login(formData){
  this.submitForm = true;
  if(this.formdata.valid){
    var user = new User(formData.username, formData.password);
    this.authService.signIn(user)
    .subscribe(
      (response: JWTToken) => {
        this.authStrategy.doLoginUser(response);
        this.router.navigate(['/products']);
      }
    );
  }
  return;
 }

}
