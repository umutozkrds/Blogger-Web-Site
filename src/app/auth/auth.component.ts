import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse } from '../models/auth-response.model';
import { Observable } from 'rxjs';
import { AuthService} from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  isLogin: boolean = false;
  error: string = "";

  constructor(
    private authService: AuthService,
    private router : Router
  ) {
  
}

  ngOnInit(): void {
    
  }

  toggleMod() {
    this.isLogin = !this.isLogin;
  }

  handleAuth(form: NgForm) {
    if (form.invalid) {
      return;
    }


    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>



    if (this.isLogin) {

      authResponse = this.authService.login(email, password);

    }
    else {
      authResponse = this.authService.register(email, password);
    }

    authResponse.subscribe({
      next: (response) => {
        this.router.navigate(["/"]);
        this.error = "";
      },

      error: (err) => {
        this.error = err
      }
         
    });
  }
}
