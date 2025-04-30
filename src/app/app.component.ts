import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { HeaderComponent } from './Components/header/header.component';
import { OpacityService } from './Services/opacity.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  opacity = signal(0.88) 



}
