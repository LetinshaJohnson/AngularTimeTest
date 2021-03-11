import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData, RequestData, EmailCheck, changePassword,changeUsername,UserOne } from './auth-data.model';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthenticationClass, RootObject } from '../classes/auth';
import { Token } from '../classes/token';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: String;
  private readonly API_URL = environment.apiBaseURL + 'auth/login';
  //dialogData: any; authData
  constructor(private httpClient: HttpClient, private router: Router,
    private snackBar: MatSnackBar) {
  }

  /** CRUD METHODS */
  getAuthentication(email: String, password: String): Observable<Boolean> {
    console.log(environment.apiBaseURL);
    try {
      const authData: AuthData = { email: email, password: password };
      return this.httpClient.post<RootObject>(environment.apiBaseURL + 'api/auth/login', authData)
        .pipe(
          tap(tokens => {
            if (tokens.Response == "Success") {
              sessionStorage.setItem("login_pswd", password.toString());
              this.doLoginUser(email, tokens);
            } else {
              this.showNotification(
                'snackbar-danger',
                'Invalid User',
                'bottom',
                'center'
              );
              return of(false);
            }
            //sessionStorage.setItem("login_id", tokens);
          }
          ),
          mapTo(true),
          catchError(error => {
            this.showNotification(
              'snackbar-danger',
              'Invalid User',
              'bottom',
              'center'
            );
            return of(false);
          }));

    } catch (error) {
      //console.log(error);
    }

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  logout() {
    return this.httpClient.post<any>(environment.apiBaseURL + 'auth/logout', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        //(error.error);
        return error.error;
      }));
  }

  checkOTP(action: String, otp: String): Observable<Boolean> {
    try {
      // const authData: AuthData = { login_username: username, login_password: password };
      // ////console.log(authData);
      // return this.httpClient.post<RootObject>(environment.apiBaseURL + 'auth/login', authData)
      //   .pipe(
      //     tap(tokens => {
      //       ////console.log(tokens);
      //       //sessionStorage.setItem("login_id", tokens);
      //       this.doLoginUser(username, tokens)
      //     }
      //     ),
      //     mapTo(true),
      //     catchError(error => {
      //       this.showNotification(
      //         'snackbar-danger',
      //         'Invalid User',
      //         'bottom',
      //         'center'
      //       );
      return of(false);
      //     }));

    } catch (error) {
      //console.log(error);
    }

  }

  // ------------- forgot Password ------------

  Forgotemailpassword(action: String, email: String): Observable<any> {
    //console.log(action);
    // const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    // if (action == "1") {
      const emailCheck: EmailCheck = { email: email, request: "username" };
    //   //console.log(emailCheck);
    //   return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/passwordchangeotp', emailCheck)
    // } else if (action == "2") {
    //   const emailCheck: EmailCheck = { login_email: email, request: "password" };
    //   return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/passwordchangeotp', emailCheck)
    // } else if (action == "3") {
    //   const emailCheck: EmailCheck = { login_email: email, request: "username" };
    //   return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/requestusernamepassword', emailCheck)
    // } else if (action == "4") {
    //   const emailCheck: EmailCheck = { login_email: email, request: "username" };
    //   return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/requestusernamepassword', emailCheck)
    // } else {
    //   //
    // }
    return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/passwordchangeotp', emailCheck)
  }

  // ------------- forgot Password ------------

  // ------------- change Username / Password ------------

  requestusernamepassword(action: string, request: string, email: string) {
    //console.log("hello");
    const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    const requestData: RequestData = { email: email, request: request, authorization: authorization };
    return this.httpClient.post<any>(environment.apiBaseURL + 'changepassword/requestusernamepassword', requestData)
  }

  changeusername(action: String, newUname: string,login_id:string,login_email:string) {
    const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    if (action == "1") {
      const changeUsername: changeUsername = { login_id: login_id,login_email: login_email, username: newUname, authorization: "" };
      return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/forgetusername', changeUsername)
    }else if (action == "request_username") {
      const changeUsername: changeUsername = { login_id: login_id,login_email: login_email, username: newUname, authorization: "" };
      console.log(changeUsername);
      return this.httpClient.post<any>(environment.apiBaseURL + 'changepassword/changeusername', changeUsername)
    }
  }

  changepassword(action: String, newPswd: string,login_id:string,login_email:string) {
    const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    if (action == "2") {
      const changePassword: changePassword = { login_id: login_id,login_email: login_email, password: newPswd, authorization: "" };
      return this.httpClient.post<any>(environment.apiBaseURL + 'forgetpassword/forgetpassword', changePassword)
    } else if (action == "5" || action == "request_password") {
      const changePassword: changePassword = { login_id: login_id,login_email: login_email, password: newPswd, authorization: authorization };
      console.log(changePassword);
      return this.httpClient.post<any>(environment.apiBaseURL + 'changepassword/changepassword', changePassword)
    }
  }

  // ------------- // change Username / Password ------------

  // ------------- // Get Users -----------------------------


  getRequestUser(role_id:string,login_id:string): any {
    const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    const userOne:UserOne={role_id:role_id,login_id:login_id,authorization:authorization}
    console.log(userOne);
    return this.httpClient.post<any>(environment.apiBaseURL + 'changepassword/getUserOne',userOne)    
  }
  
  // ------------- // Get Users -----------------------------

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    //alert("tokk " + this.getRefreshToken());
    return this.httpClient.post<any>(environment.apiBaseURL + 'auth/refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: RootObject) => {
      //console.log("refreshed");
      this.storeJwtToken(tokens.Result[0].token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: String, tokens: RootObject) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: RootObject) {
    sessionStorage.setItem("user_id", tokens.Result[0].user_id.toString());
    sessionStorage.setItem("tabIndex", "1");
    sessionStorage.setItem("authorization", tokens.Result[0].token);
    localStorage.setItem(this.JWT_TOKEN, tokens.Result[0].token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.Result[0].refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.clear();
    this.router.navigate(['/authentication/signin']);
  }
}
