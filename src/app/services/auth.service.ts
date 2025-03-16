import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { response } from 'express';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyAPVWqNu5u1qiCUs9CFJNP2EMrX4O67N3A";
  user = new BehaviorSubject<User |null>(null);

  constructor(
    private http: HttpClient
  ) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key,{
      email: email,
      password: password,
      returnSecureToken : true
    })
      .pipe(
        tap(
          response => {
            this.handleUser(response.email, response.localId, response.idToken, response.expiresIn)
          }),
        
        catchError(this.handleError)
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken : true
    }).pipe(
      tap(
        response => {
          this.handleUser(response.email, response.localId, response.idToken, response.expiresIn)
        }),
      
      
      catchError(this.handleError)
    )
  }

  private handleUser(email : string , localId : string, idToken: string, expiresIn : string) {
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000))
    const user = new User(
          email,
          localId,
          idToken,
          expirationDate
        );
    this.user.next(user);
    localStorage.setItem("user", JSON.stringify(user))
    
  }
  private handleError(err: HttpErrorResponse) {
    let message = "hata oluştu"

    if (err.error.error) {
      switch (err.error.error.message) {
        case "EMAIL_EXISTS":
          message = "Bu mail zaten kullanılıyor.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Çok fazla deneme. bir süre bekleyiniz.";
          break;
        case "EMAIL_NOT_FOUND":
          message = "Email bulunamadı";
          break;
        case "INVALID_PASSWORD":
          message = "Hatalı Şifre";
          break;
        case "INVALID_LOGIN_CREDENTIALS":
          message = "Hatalı Şifre veya Mail girdiniz.";
          break;
      }
    }
    return throwError(() => message)
  }


  autoLogin() {
    if (localStorage.getItem("user") == null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))
    
    if (loadedUser.token) {
      this.user.next(loadedUser)
    }
  }

  logout() {
    this.user.next(null)
    localStorage.removeItem("user")
  }

}
