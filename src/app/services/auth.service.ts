import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlSaml = environment.apiUrlSamlLogin;
  private apiUrl = this.apiUrlSaml
    .replace('apiId', environment.apiId)
    .replace('apiRegion', environment.apiRegion)

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    window.location.href = this.apiUrl;
  }

  handleSamlResponse(samlResponse: string) {
    this.http.post(`${this.apiUrl}/acs`, { SAMLResponse: samlResponse }).subscribe((response: any) => {
      if (response.success) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
