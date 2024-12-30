import { Component } from '@angular/core';
import { InputWithIconComponent } from '../../../shared/input-with-icon/input-with-icon.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputWithIconComponent, ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
