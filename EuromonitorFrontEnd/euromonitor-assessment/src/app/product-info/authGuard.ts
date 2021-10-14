import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "app/auth-service/auth-service";

@Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(private auth: AuthService, private route: Router) { }
  
    canActivate(): boolean {
      var test = this.auth.isLoggedIn();
        if (test) {
            return true;
        }
        this.route.navigate(['./register']);
        return false;
      }
  }