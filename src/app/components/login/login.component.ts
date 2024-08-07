import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public redirectInfoVisible = false;

  constructor(private authService: AuthService) {}

  login() {
    console.log('login starter...');
    this.redirectInfoVisible = true;

    setTimeout(() => {
      this.authService.login();
    }, 1000);
  }
}
