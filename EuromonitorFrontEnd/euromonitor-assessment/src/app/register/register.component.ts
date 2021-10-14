import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth-service/auth-service';
import { JwtAuthStrategy } from 'app/auth-service/authStrategy';
import { JWTToken } from 'app/models/jwtToken';
import { Register } from 'app/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private authStrategy: JwtAuthStrategy) { 
    this.createForm();
  }
  formdata;
  submitted = false;
  ngOnInit() {}

  createForm(){
    this.formdata = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
   });
  }



 register(formData: Register){
   this.submitted = true;
   if(this.formdata.valid){
      var register = new Register(formData.userName, formData.email, formData.password, formData.confirmPassword);
      this.authService.signup(register)
          .subscribe(
            (response: JWTToken) => {
              console.log(response);
              this.authStrategy.doLoginUser(response);
              this.router.navigate(['/products']);
            }
          );
    }
    return;
 }

}
