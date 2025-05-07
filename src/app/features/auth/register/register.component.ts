import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingSpinnerComponent],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1 class="register-title">Create an Account</h1>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstname">First Name</label>
              <input 
                type="text" 
                id="firstname" 
                formControlName="firstname" 
                placeholder="Enter your first name"
                [class.error]="submitted && f['firstname'].errors"
              >
              <div *ngIf="submitted && f['firstname'].errors" class="error-message">
                <span *ngIf="f['firstname'].errors['required']">First name is required</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="lastname">Last Name</label>
              <input 
                type="text" 
                id="lastname" 
                formControlName="lastname" 
                placeholder="Enter your last name"
                [class.error]="submitted && f['lastname'].errors"
              >
              <div *ngIf="submitted && f['lastname'].errors" class="error-message">
                <span *ngIf="f['lastname'].errors['required']">Last name is required</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              placeholder="Choose a username"
              [class.error]="submitted && f['username'].errors"
            >
            <div *ngIf="submitted && f['username'].errors" class="error-message">
              <span *ngIf="f['username'].errors['required']">Username is required</span>
              <span *ngIf="f['username'].errors['minlength']">Username must be at least 3 characters</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              placeholder="Enter your email"
              [class.error]="submitted && f['email'].errors"
            >
            <div *ngIf="submitted && f['email'].errors" class="error-message">
              <span *ngIf="f['email'].errors['required']">Email is required</span>
              <span *ngIf="f['email'].errors['email']">Please enter a valid email</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              placeholder="Create a password"
              [class.error]="submitted && f['password'].errors"
            >
            <div *ngIf="submitted && f['password'].errors" class="error-message">
              <span *ngIf="f['password'].errors['required']">Password is required</span>
              <span *ngIf="f['password'].errors['minlength']">Password must be at least 8 characters</span>
            </div>
          </div>
          
          <button type="submit" class="btn-primary" [disabled]="loading">
            <app-loading-spinner *ngIf="loading"></app-loading-spinner>
            <span *ngIf="!loading">Register</span>
          </button>
        </form>
        
        <div class="register-footer">
          <p>Already have an account? <a routerLink="/login">Login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 140px);
      padding: 24px;
    }
    
    .register-card {
      background-color: var(--card-bg);
      padding: 32px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
    }
    
    .register-title {
      color: var(--primary);
      text-align: center;
      margin-bottom: 24px;
      font-size: 24px;
    }
    
    .register-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
    }
    
    @media (max-width: 576px) {
      .form-row {
        flex-direction: column;
      }
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }
    
    label {
      font-weight: 500;
      color: var(--text-primary);
    }
    
    input {
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 16px;
      transition: border-color 0.3s;
    }
    
    input:focus {
      border-color: var(--primary);
      outline: none;
    }
    
    input.error {
      border-color: var(--error);
    }
    
    .error-message {
      color: var(--error);
      font-size: 14px;
      margin-top: 4px;
    }
    
    .btn-primary {
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    
    .btn-primary:disabled {
      background-color: var(--disabled);
      cursor: not-allowed;
    }
    
    .register-footer {
      margin-top: 24px;
      text-align: center;
      color: var(--text-secondary);
    }
    
    .register-footer a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }
    
    .register-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/gallery']);
    }
    
    // Initialize form
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  // Getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    this.authService.register({
      firstname: this.f['firstname'].value,
      lastname: this.f['lastname'].value,
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    }).subscribe({
      next: (response) => {
        this.toastService.show(response.message, 'success');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}