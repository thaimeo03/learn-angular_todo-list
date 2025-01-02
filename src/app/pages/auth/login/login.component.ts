import { Component, inject } from '@angular/core';
import { InputWithIconComponent } from '../../../shared/input-with-icon/input-with-icon.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  imports: [InputWithIconComponent, ButtonComponent, RouterLink, ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading= false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  submitted = false;

  handleLogin() {
    this.submitted = true;

    if(this.loginForm.invalid) return;

    this.isLoading = true;

    this.authService.login({
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }).subscribe({
      next: () => {
        this.router.navigate(['/'])
        this.errorMessage = '';
      },
      error: (error: string) => {
        this.errorMessage = error
      }
    }).add(() => this.isLoading = false);
  }
}
