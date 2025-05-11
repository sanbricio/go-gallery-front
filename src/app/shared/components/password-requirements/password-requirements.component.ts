import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-password-requirements",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="password-requirements" *ngIf="password.length > 0">
      <li [class.valid]="hasMinLength">
        <span class="icon">
          <img
            [src]="
              hasMinLength
                ? 'assets/images/icons/check.svg'
                : 'assets/images/icons/cross.svg'
            "
            alt=""
            class="icon-img"
          />
        </span>
        At least 8 characters
      </li>
      <li [class.valid]="hasUppercase">
        <span class="icon">
          <img
            [src]="
              hasUppercase
                ? 'assets/images/icons/check.svg'
                : 'assets/images/icons/cross.svg'
            "
            alt=""
            class="icon-img"
          />
        </span>
        At least one uppercase letter
      </li>
      <li [class.valid]="hasSpecialChar">
        <span class="icon">
          <img
            [src]="
              hasSpecialChar
                ? 'assets/images/icons/check.svg'
                : 'assets/images/icons/cross.svg'
            "
            alt=""
            class="icon-img"
          />
        </span>
        At least one special character
      </li>
    </ul>
  `,
  styles: [
    `
      .password-requirements {
        list-style: none;
        padding-left: 0;
        margin-top: 8px;
        color: var(--text-secondary);
        font-size: 14px;
      }

      .password-requirements li {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }

      .password-requirements li.valid {
        color: var(--success);
      }

      .icon-img {
        width: 16px;
        height: 16px;
      }
    `,
  ],
})
export class PasswordRequirementsComponent {
  @Input() password!: string;

  get hasMinLength(): boolean {
    return this.password.length >= 8;
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  get hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }
}
