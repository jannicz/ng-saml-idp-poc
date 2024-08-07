import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public redirectInfoVisible = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['SAMLResponse']) {
        console.log('SAML response from params =>', params['SAMLResponse']);

        setTimeout(() => {
          this.authService.handleSamlResponse(params['SAMLResponse']);
        }, 1000);
      }
    });
  }

  login() {
    console.log('redirecting...');
    this.redirectInfoVisible = true;

    setTimeout(() => {
      this.authService.login();
    }, 1000);
  }
}
