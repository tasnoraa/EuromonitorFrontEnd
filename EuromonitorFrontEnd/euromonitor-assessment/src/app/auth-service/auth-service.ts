import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { Register } from "app/models/register";
import { User } from "app/models/User";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { JwtAuthStrategy } from "./authStrategy";

@Injectable()
  export class AuthService {
    
    public readonly PRODUCTS_PATH = '/products';
  
    constructor(
      private router: Router,
      private http: HttpClient, private auth: JwtAuthStrategy) { }
  
    signup(user: Register){
      return this.http.post(`${environment.authURL}/register`, user);
    }

    signIn(user: User){
        return this.http.post(`${environment.authURL}/signin`, user);
    }

    isLoggedIn(){
      return this.auth.getCurrentUser();
    }

    getBooks(token: string){
      const headers = new HttpHeaders().append('Authorization', 'Bearer '+ token)
        // return this.http.get(`${environment.acommerceURL}/getProducts`, {headers: headers});
        return this.http.get(`${environment.acommerceURL}/getBooks`);
    }

    private doLogoutUser() {
      this.auth.doLogoutUser();
    }
  
  }