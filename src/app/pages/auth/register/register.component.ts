import { Component } from '@angular/core';
import { InputWithIconComponent } from '../../../shared/input-with-icon/input-with-icon.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-register',
  imports: [RouterLink, InputWithIconComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
