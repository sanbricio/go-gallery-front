import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { ToastService } from "../../../core/services/toast.service";
import { PasswordRequirementsComponent } from "../../../shared/components/password-requirements/password-requirements.component";

@Component({
  selector: "app-recover-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordRequirementsComponent,
    RouterLink,
  ],
  template: `
    <div class="recover-container">
      <div class="recover-card">
        <h2>Recover your password</h2>

        <form [formGroup]="recoverForm" (ngSubmit)="onSubmit()">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            formControlName="email"
            [readonly]="emailSent"
            [class.error]="submittedStep1 && f['email'].invalid"
            placeholder="Enter your email"
          />
          <div
            *ngIf="submittedStep1 && f['email'].invalid"
            class="error-message"
          >
            <span *ngIf="f['email'].errors?.['required']"
              >Email is required</span
            >
            <span *ngIf="f['email'].errors?.['email']"
              >Invalid email format</span
            >
          </div>

          <ng-container *ngIf="emailSent">
            <label for="code">Verification Code</label>
            <input
              id="code"
              type="text"
              formControlName="code"
              [class.error]="submittedStep2 && f['code'].invalid"
              placeholder="Enter the code you received"
            />
            <div
              *ngIf="submittedStep2 && f['code'].invalid"
              class="error-message"
            >
              <span>Verification code is required</span>
            </div>

            <label for="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              formControlName="newPassword"
              [class.error]="submittedStep2 && f['newPassword'].invalid"
              placeholder="Enter your new password"
            />
            <app-password-requirements
              [password]="f['newPassword'].value"
            ></app-password-requirements>
            <div
              *ngIf="submittedStep2 && f['newPassword'].invalid"
              class="error-message"
            >
              <span>New password is required</span>
            </div>
          </ng-container>

          <button type="submit" [disabled]="loading">
            {{
              loading
                ? "Processing..."
                : emailSent
                ? "Reset Password"
                : "Send recovery email"
            }}
          </button>
        </form>

        <div class="recover-footer">
          <p><a routerLink="/login">Back to login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .recover-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 140px);
        padding: 24px;
      }

      .recover-card {
        background-color: var(--card-bg);
        padding: 32px;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
      }

      h2 {
        text-align: center;
        color: var(--primary);
        margin-bottom: 24px;
      }

      label {
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--border);
        border-radius: 4px;
        margin-bottom: 8px;
        font-size: 16px;
      }

      input.error {
        border-color: var(--error);
      }

      input[readonly] {
        background-color: #f3f3f3;
      }

      .error-message {
        color: var(--error);
        font-size: 14px;
        margin-bottom: 8px;
      }

      button {
        width: 100%;
        background-color: var(--primary);
        color: white;
        padding: 12px;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 12px;
      }

      button:disabled {
        background-color: var(--disabled);
        cursor: not-allowed;
      }

      .recover-footer {
        margin-top: 16px;
        text-align: center;
      }

      .recover-footer a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
      }

      .recover-footer a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class RecoverPasswordComponent {
  recoverForm: FormGroup;
  emailSent = false;
  submittedStep1 = false;
  submittedStep2 = false;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {
    this.recoverForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      code: [""],
      newPassword: [""],
    });
  }

  get f() {
    return this.recoverForm.controls;
  }

  onSubmit() {
    if (!this.emailSent) {
      this.submittedStep1 = true;
      if (this.f["email"].invalid) return;

      this.loading = true;
      this.authService
        .requestPasswordRecovery({ email: this.f["email"].value })
        .subscribe({
          next: () => {
            this.toastService.show(
              "Recovery email sent! Check your inbox.",
              "success"
            );
            this.emailSent = true;

            // Activar validaciones para los campos del segundo paso
            this.f["code"].setValidators([Validators.required]);
            this.f["newPassword"].setValidators([Validators.required]);
            this.f["code"].updateValueAndValidity();
            this.f["newPassword"].updateValueAndValidity();
          },
          error: () => {
            this.toastService.show("Failed to send recovery email", "error");
          },
          complete: () => (this.loading = false),
        });
    } else {
      this.submittedStep2 = true;

      if (this.recoverForm.invalid) return;

      const password = this.f["newPassword"].value;
      if (!this.isPasswordValid(password)) {
        this.toastService.show(
          "Password does not meet the required strength.",
          "error"
        );
        return;
      }

      this.loading = true;
      this.authService
        .recoverPassword({
          email: this.f["email"].value,
          code: this.f["code"].value,
          newPassword: password,
        })
        .subscribe({
          next: () => {
            this.toastService.show("Password successfully reset!", "success");
            this.router.navigate(["/login"]);
          },
          error: () => {
            this.toastService.show("Invalid code or recovery failed.", "error");
            this.loading = false;
          },
        });
    }
  }

  isPasswordValid(password: string): boolean {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  }
}
