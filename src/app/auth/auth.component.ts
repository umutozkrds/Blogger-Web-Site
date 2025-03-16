import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, retry } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/auth-response.model';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  error: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  handleAuth(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authResponse : Observable<AuthResponse>

    if (this.isLogin) {
      authResponse = this.authService.login(email,password)
    }
    else {
      authResponse = this.authService.register(email,password)
    }

    authResponse.subscribe({
      next: (result) => {
        this.router.navigate(["/"])
        console.log(result)
        this.error = "";
      },

      error: (err)=>  {
        this.error = err;
      }
    })

    
  }
}
