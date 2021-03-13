import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../data-model/user.model';
import { AuthData, RegisterUser, RequestData, EmailCheck, changePassword, changeUsername, UserOne } from './auth-data.model';
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
    try {
      const authData: AuthData = { user_email: email, user_password: password };
      return this.httpClient.post<RootObject>(environment.apiBaseURL + 'auth/login', authData)
        .pipe(
          tap(tokens => {
            if (tokens.Response === "Success") {
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

  registerUser(userData: UserData): Observable<Boolean> {
    try {
      console.log(userData);
      //const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
      // const registerData: RegisterUser = { user_first_name: userData.first_name, user_last_name: userData.last_name, user_email: userData.email, user_password: userData.password};
      return this.httpClient.post<any>(environment.apiBaseURL + 'user/user_registration', userData);
    } catch (error) {
      
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
