import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token:string = ''
  url = 'http://127.0.0.1:5000'
  constructor(private authService: AuthService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedToken = localStorage.getItem('token');
      this.token = storedToken ? storedToken : '';
    }
  }
  async login(email:string, password:string): Promise<{success: boolean; error: string}> {
    try {
      const response = await fetch(this.url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
         }),
      });
  
      const data = await response.json();
  
      if (data['access_token']) {
        this.token = data['access_token'];
        localStorage.setItem('token', this.token);
        this.authService.logIn();
        return { success: true, error: '' };
      } else if (data['error']) {
        return { success: false, error: data['error'] };
      } else {
        this.token = '';
        localStorage.removeItem('token');
        this.authService.logOut();
        return { success: false, error: 'Unknown error' };
      }
    } catch (err) {
      return { success: false, error: 'Network error or server not reachable' };
    }
  }
  

}
