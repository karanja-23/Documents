import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ToastModule],
  providers: [ MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private loginService: LoginService,
    private messageService: MessageService
  ) {}
  async signIn() {
    if (this.email && this.password) {
      const result = await this.loginService.login(this.email, this.password);
      if (!result.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: result.error
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: `Welcome ${this.email}`
        });
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing Fields',
        detail: 'Email and password are required.'
      });
      return;

    }
  }
}
