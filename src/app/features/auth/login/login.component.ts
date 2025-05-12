import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";
import { ToastService } from "../../../core/services/toast.service";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LoadingSpinnerComponent,
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Login to GoGallery</h1>

        <form
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
          class="login-form"
        >
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              placeholder="Enter your username"
              [class.error]="submitted && f['username'].errors"
            />
            <div
              *ngIf="submitted && f['username'].errors"
              class="error-message"
            >
              <span *ngIf="f['username'].errors['required']"
                >Username is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Enter your password"
              [class.error]="submitted && f['password'].errors"
            />
            <div
              *ngIf="submitted && f['password'].errors"
              class="error-message"
            >
              <span *ngIf="f['password'].errors['required']"
                >Password is required</span
              >
            </div>
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            <app-loading-spinner *ngIf="loading"></app-loading-spinner>
            <span *ngIf="!loading">Login</span>
          </button>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <a routerLink="/register">Register</a></p>
          <p><a routerLink="/recover-password">Forgot your password?</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 140px);
        padding: 24px;
      }

      .login-card {
        background-color: var(--card-bg);
        padding: 32px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      .login-title {
        color: var(--primary);
        text-align: center;
        margin-bottom: 24px;
        font-size: 24px;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
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

      .login-footer {
        margin-top: 24px;
        text-align: center;
        color: var(--text-secondary);
      }

      .login-footer a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
      }

      .login-footer a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "/gallery";

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {
    // Initialize form
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/gallery"]);
    }

    // Get return url from route parameters or default to '/gallery'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] ?? "/gallery";
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService
      .login({
        username: this.f["username"].value,
        password: this.f["password"].value,
      })
      .subscribe({
        next: () => {
          this.toastService.show("Login successful!", "success");
          this.router.navigate([this.returnUrl]);
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
