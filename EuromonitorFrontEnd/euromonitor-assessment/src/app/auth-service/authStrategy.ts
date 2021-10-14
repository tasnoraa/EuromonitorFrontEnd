import { Injectable } from "@angular/core";
import { JWTToken } from "app/models/jwtToken";
import { of } from "rxjs/observable/of";

@Injectable()
export class JwtAuthStrategy {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
  
    doLoginUser(token: JWTToken): void {
      localStorage.setItem(this.JWT_TOKEN, token.token);
    }
  
    doLogoutUser(): void {
      localStorage.removeItem(this.JWT_TOKEN);
    }
  
    getCurrentUser(){
      const token = this.getToken();
      var result = token === "undefined"? null: token;
      if (result) {
        return token;
      } else {
        return "";
      }
    }
  
    getToken() {
      return localStorage.getItem(this.JWT_TOKEN);
    }
  }