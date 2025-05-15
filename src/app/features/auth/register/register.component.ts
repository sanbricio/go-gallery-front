import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";
import { ToastService } from "../../../core/services/toast.service";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { PasswordRequirementsComponent } from "../../../shared/components/password-requirements/password-requirements.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LoadingSpinnerComponent,
    PasswordRequirementsComponent,
  ],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1 class="register-title">Create an Account</h1>

        <form
          [formGroup]="registerForm"
          (ngSubmit)="onSubmit()"
          class="register-form"
        >
          <div class="form-row">
            <div class="form-group">
              <label for="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                formControlName="firstname"
                placeholder="Enter your first name"
                [class.error]="submitted && f['firstname'].errors"
              />
              <div
                *ngIf="submitted && f['firstname'].errors"
                class="error-message"
              >
                <span *ngIf="f['firstname'].errors['required']"
                  >First name is required</span
                >
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
              />
              <div
                *ngIf="submitted && f['lastname'].errors"
                class="error-message"
              >
                <span *ngIf="f['lastname'].errors['required']"
                  >Last name is required</span
                >
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
            />
            <div
              *ngIf="submitted && f['username'].errors"
              class="error-message"
            >
              <span *ngIf="f['username'].errors['required']"
                >Username is required</span
              >
              <span *ngIf="f['username'].errors['minlength']"
                >Username must be at least 3 characters</span
              >
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
            />
            <div *ngIf="submitted && f['email'].errors" class="error-message">
              <span *ngIf="f['email'].errors['required']"
                >Email is required</span
              >
              <span *ngIf="f['email'].errors['email']"
                >Please enter a valid email</span
              >
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
            />
            <div
              *ngIf="submitted && f['password'].errors"
              class="error-message"
            >
              <span *ngIf="f['password'].errors['required']"
                >Password is required</span
              >
            </div>

            <app-password-requirements
              *ngIf="f['password'].value?.length > 0"
              [password]="f['password'].value"
            />
          </div>

          <div class="form-group terms-group">
            <label class="terms-wrapper" for="acceptTerms">
              <div class="custom-checkbox">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  formControlName="acceptTerms"
                  class="terms-checkbox"
                />
                <span class="checkmark"></span>
              </div>
              <span class="terms-label">
                I accept the
                <a routerLink="/terms-of-use" target="_blank">Terms of Use</a>
                and
                <a routerLink="/privacy-policy" target="_blank"
                  >Privacy Policy</a
                >
              </span>
            </label>
            <div
              *ngIf="submitted && f['acceptTerms'].errors"
              class="error-message"
            >
              You must accept the terms to continue
            </div>
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            <app-loading-spinner *ngIf="loading" />
            <span *ngIf="!loading">Register</span>
          </button>
        </form>

        <div class="register-footer">
          <p>Already have an account? <a routerLink="/login">Login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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

      .terms-group {
        margin: 8px 0;
      }

      .terms-wrapper {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        cursor: pointer;
        padding: 4px;
        margin: -4px;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      .terms-wrapper:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      .custom-checkbox {
        position: relative;
        min-width: 20px;
        height: 20px;
        margin-top: 2px;
      }

      .terms-checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 2px solid var(--border);
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .terms-checkbox:checked ~ .checkmark {
        background-color: var(--primary);
        border-color: var(--primary);
      }

      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .terms-checkbox:checked ~ .checkmark:after {
        display: block;
      }

      .terms-checkbox:focus ~ .checkmark {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }

      .terms-label {
        font-size: 14px;
        line-height: 1.4;
        user-select: none;
      }

      .terms-label a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
      }

      .terms-label a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, this.passwordValidator]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return { required: true };

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(value) ? null : { invalidPassword: true };
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/gallery"]);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.toastService.show("Please complete all required fields correctly.", "error");
      return;
    }

    this.loading = true;

    this.authService
      .register({
        firstname: this.f["firstname"].value,
        lastname: this.f["lastname"].value,
        username: this.f["username"].value,
        email: this.f["email"].value,
        password: this.f["password"].value,
      })
      .subscribe({
        next: (response) => {
          this.toastService.show(response.message, "success");
          this.router.navigate(["/login"]);
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
