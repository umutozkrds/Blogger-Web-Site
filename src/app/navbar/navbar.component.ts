import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;


  constructor(private authService : AuthService) {

  }
  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuth = !!user
    })
  }
}
