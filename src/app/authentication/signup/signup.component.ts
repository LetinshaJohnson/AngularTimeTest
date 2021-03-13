import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../data-model/user.model';
import { AuthService } from '../authentication.service';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  public sessiondata;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //this.userData = new UserData({})
    const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    const userData: any = {
      first_name: this.loginForm.value.firstname,
      last_name: this.loginForm.value.lastname,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      authorization:authorization
    };
    this.authService.registerUser(userData)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/authentication/signin']);
        }
      });

    // // Initialize Params Object
    // let Params = new HttpParams();
    // // Begin assigning parameters
    // Params = Params.append('firstname', this.loginForm.value.firstname);
    // Params = Params.append('lastname', this.loginForm.value.lastname);
    // Params = Params.append('email', this.loginForm.value.email);
    // Params = Params.append('password', this.loginForm.value.password);
    // return this.http.post('http://localhost:8000/api/signup'
    //   , {
    //     params: { params: Params }
    //   }).subscribe((res: Response) => {
    //     alert(res);
    //     //this.registerForm.reset();
    //   })


  }
}
