import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { AuthenticationClass, RootObject } from '../../classes/auth';
//import { SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public sessiondata;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      //this.router.navigate(['/calendar']);
      this.authService.getAuthentication(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(success => {
          if (success) {
            //this.sessiondata = sessionStorage.getItem("role");
            //console.log(sessionStorage.getItem("role"));
            this.router.navigate(['/calendar']);
          }
        });
    }
  }
}
