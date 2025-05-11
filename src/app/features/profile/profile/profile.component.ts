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
import { Router } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";
import { ToastService } from "../../../core/services/toast.service";
import { User } from "../../../core/models/user.model";
import { PasswordRequirementsComponent } from "../../../shared/components/password-requirements/password-requirements.component";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    PasswordRequirementsComponent,
  ],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <h1 class="profile-title">My Profile</h1>

        <div *ngIf="!user" class="loading-container">
          <app-loading-spinner [size]="32"></app-loading-spinner>
          <p>Loading profile...</p>
        </div>

        <div *ngIf="user">
          <form
            [formGroup]="profileForm"
            (ngSubmit)="onSubmit()"
            class="profile-form"
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
                [value]="user.username"
                disabled
                class="disabled-input"
              />
              <div class="hint-text">Username cannot be changed</div>
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
              <label for="password">New Password (optional)</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                placeholder="Enter new password"
                [class.error]="submitted && f['password'].errors"
              />
              <div class="hint-text">
                Leave blank to keep your current password.
              </div>
              <app-password-requirements
                *ngIf="f['password'].value?.length > 0"
                [password]="f['password'].value"
              />
            </div>
            <div class="form-actions">
              <button
                type="submit"
                class="btn-primary"
                [disabled]="updateLoading || profileForm.invalid"
              >
                <app-loading-spinner
                  *ngIf="updateLoading"
                  [size]="24"
                ></app-loading-spinner>
                <span *ngIf="!updateLoading">Save Changes</span>
              </button>
            </div>
          </form>

          <div class="divider"></div>

          <div class="danger-zone">
            <h2>Danger Zone</h2>

            <div *ngIf="!showDeleteConfirm">
              <p>
                This action cannot be undone. This will permanently delete your
                account and all your images.
              </p>
              <button
                class="btn-danger"
                (click)="requestDeleteAccount()"
                [disabled]="requestDeleteLoading"
              >
                <app-loading-spinner
                  *ngIf="requestDeleteLoading"
                  [size]="24"
                ></app-loading-spinner>
                <span *ngIf="!requestDeleteLoading">Delete Account</span>
              </button>
            </div>

            <div *ngIf="showDeleteConfirm" class="delete-confirm">
              <p>
                A verification code has been sent to your email. Enter the code
                and your password to confirm deletion.
              </p>

              <form
                [formGroup]="deleteForm"
                (ngSubmit)="confirmDeleteAccount()"
                class="delete-form"
              >
                <div class="form-group">
                  <label for="code">Verification Code</label>
                  <input
                    type="text"
                    id="code"
                    formControlName="code"
                    placeholder="Enter verification code"
                    [class.error]="deleteSubmitted && d['code'].errors"
                  />
                  <div
                    *ngIf="deleteSubmitted && d['code'].errors"
                    class="error-message"
                  >
                    <span *ngIf="d['code'].errors['required']"
                      >Verification code is required</span
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label for="confirmPassword">Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    formControlName="password"
                    placeholder="Enter your password"
                    [class.error]="deleteSubmitted && d['password'].errors"
                  />
                  <div
                    *ngIf="deleteSubmitted && d['password'].errors"
                    class="error-message"
                  >
                    <span *ngIf="d['password'].errors['required']"
                      >Password is required</span
                    >
                  </div>
                </div>

                <div class="form-actions delete-actions">
                  <button
                    type="button"
                    class="btn-cancel"
                    (click)="cancelDelete()"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn-danger"
                    [disabled]="deleteLoading || deleteForm.invalid"
                  >
                    <app-loading-spinner
                      *ngIf="deleteLoading"
                      [size]="24"
                    ></app-loading-spinner>
                    <span *ngIf="!deleteLoading">Confirm Delete</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-container {
        display: flex;
        justify-content: center;
        padding: 24px;
      }

      .profile-card {
        background-color: var(--card-bg);
        padding: 32px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
      }

      .profile-title {
        color: var(--primary);
        margin-bottom: 24px;
        font-size: 24px;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        color: var(--text-secondary);
      }

      .loading-container p {
        margin-top: 16px;
      }

      .profile-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
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

      .disabled-input {
        background-color: var(--background);
        cursor: not-allowed;
      }

      .hint-text {
        font-size: 14px;
        color: var(--text-secondary);
      }

      .error-message {
        color: var(--error);
        font-size: 14px;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
      }

      .btn-primary,
      .btn-danger,
      .btn-cancel {
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 120px;
        height: 48px;
      }

      .btn-primary {
        background-color: var(--primary);
        color: white;
      }

      .btn-primary:hover {
        background-color: var(--primary-dark);
      }

      .btn-primary:disabled {
        background-color: var(--disabled);
        cursor: not-allowed;
      }

      .divider {
        height: 1px;
        background-color: var(--border);
        margin: 32px 0;
      }

      .danger-zone {
        background-color: rgba(var(--error-rgb), 0.05);
        border-radius: 8px;
        padding: 24px;
        border: 1px solid var(--error);
      }

      .danger-zone h2 {
        color: var(--error);
        font-size: 18px;
        margin-bottom: 16px;
      }

      .danger-zone p {
        color: var(--text-secondary);
        margin-bottom: 16px;
        line-height: 1.5;
      }

      .btn-danger {
        background-color: var(--error);
        color: white;
      }

      .btn-danger:hover {
        background-color: var(--error-dark);
      }

      .btn-danger:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .delete-confirm {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .delete-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .delete-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      .btn-cancel {
        background-color: transparent;
        color: var(--text-primary);
        border: 1px solid var(--border);
      }

      .btn-cancel:hover {
        background-color: var(--background);
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  deleteForm: FormGroup;
  submitted = false;
  deleteSubmitted = false;
  updateLoading = false;
  requestDeleteLoading = false;
  deleteLoading = false;
  showDeleteConfirm = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {
    this.profileForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", this.passwordValidator],
    });

    this.deleteForm = this.formBuilder.group({
      code: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser;

    if (this.user) {
      this.profileForm.patchValue({
        firstname: this.user.firstname ?? "",
        lastname: this.user.lastname ?? "",
        email: this.user.email ?? "",
      });
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  get d() {
    return this.deleteForm.controls;
  }
  get passwordValue(): string {
    return this.f["password"].value ?? "";
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(value) ? null : { invalidPassword: true };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.profileForm.invalid) return;

    this.updateLoading = true;

    const updateData: { [key: string]: any } = {
      firstname: this.f["firstname"].value,
      lastname: this.f["lastname"].value,
      email: this.f["email"].value,
    };

    // Only include password if it was changed
    if (this.f["password"].value) {
      updateData["password"] = this.f["password"].value;
    }

    this.authService.updateUser(updateData).subscribe({
      next: (response) => {
        this.toastService.show(response.message, "success");
        this.updateLoading = false;
        // Reset password field after successful update
        this.profileForm.patchValue({ password: "" });
        this.submitted = false;
      },
      error: () => {
        this.updateLoading = false;
      },
    });
  }

  requestDeleteAccount(): void {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    this.requestDeleteLoading = true;

    this.authService.requestDeleteAccount().subscribe({
      next: (response) => {
        this.toastService.show(response.message, "info");
        this.showDeleteConfirm = true;
        this.requestDeleteLoading = false;
      },
      error: () => {
        this.requestDeleteLoading = false;
      },
    });
  }

  confirmDeleteAccount(): void {
    this.deleteSubmitted = true;

    if (this.deleteForm.invalid) return;

    this.deleteLoading = true;

    this.authService
      .deleteAccount({
        code: this.d["code"].value,
        password: this.d["password"].value,
      })
      .subscribe({
        next: (response) => {
          this.toastService.show(response.message, "success");
          this.router.navigate(["/"]);
        },
        error: () => {
          this.deleteLoading = false;
        },
      });
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deleteSubmitted = false;
    this.deleteForm.reset();
  }
}
