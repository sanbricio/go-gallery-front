import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loading-spinner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="spinner"
      [ngStyle]="{
        'width.px': size,
        'height.px': size,
        'border-width.px': borderWidth
      }"
    ></div>
  `,
  styles: [
    `
      .spinner {
        border: 4px solid var(--background-darker);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() size: number = 24;
  @Input() borderWidth: number = 2;
}
