import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/builder">Form Builder</a>
    </nav>
    <hr>
    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
