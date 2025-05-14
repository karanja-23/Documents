import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { HeaderComponent } from './Components/header/header.component';
import { OpacityService } from './Services/opacity.service';
import { LoginComponent } from './Pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, HeaderComponent,LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn=false;
  opacity = signal(0.88) 
  constructor(private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status
    })
   }



}
