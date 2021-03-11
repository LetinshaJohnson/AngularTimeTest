import { Injectable } from '@angular/core';
import { CanActivate,CanLoad,Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable({
    providedIn: 'root'
  })
  export class RandomGuard implements CanActivate,CanLoad {
  
    constructor(private authService: AuthService, private router: Router) { }
  
    canActivate() {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/calendar']);
      }
      return !this.authService.isLoggedIn();
    }

    canLoad() {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/calendar']);
      }
      return !this.authService.isLoggedIn();
    }
  }