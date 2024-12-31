import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template:
  `
  <div class="form-container">
    <div class="form-layout">
      <router-outlet />
    </div>
  </div>
`,
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
