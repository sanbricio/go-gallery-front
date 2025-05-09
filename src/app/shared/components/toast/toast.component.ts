import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of toasts"
        class="toast"
        [ngClass]="'toast-' + toast.type"
        (click)="removeToast(toast.id)"
      >
        <div class="toast-content">
          <span class="toast-icon">
            <span *ngIf="toast.type === 'success'">✓</span>
            <span *ngIf="toast.type === 'error'">✗</span>
            <span *ngIf="toast.type === 'info'">ℹ</span>
            <span *ngIf="toast.type === 'warning'">⚠</span>
          </span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button class="toast-close" (click)="removeToast(toast.id)">×</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 20px;
      z-index: 1100;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
      max-width: 350px;
     pointer-events: none;
    }
    
    .toast {
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: slideIn 0.3s forwards;
      overflow: hidden;
      max-width: 100%;
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    
    .toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    .toast-success {
      border-left: 4px solid var(--success);
    }
    
    .toast-success .toast-icon {
      color: var(--success);
    }
    
    .toast-error {
      border-left: 4px solid var(--error);
    }
    
    .toast-error .toast-icon {
      color: var(--error);
    }
    
    .toast-info {
      border-left: 4px solid var(--primary);
    }
    
    .toast-info .toast-icon {
      color: var(--primary);
    }
    
    .toast-warning {
      border-left: 4px solid var(--warning);
    }
    
    .toast-warning .toast-icon {
      color: var(--warning);
    }
    
    .toast-message {
      font-size: 14px;
      color: var(--text-primary);
    }
    
    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: var(--text-secondary);
      opacity: 0.6;
      padding: 4px;
      margin-left: 8px;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s, opacity 0.3s;
    }
    
    .toast-close:hover {
      background-color: rgba(0, 0, 0, 0.05);
      opacity: 1;
    }
    
    @media (max-width: 768px) {
      .toast-container {
        top: auto;
        bottom: 20px;
        left: 20px;
        right: 20px;
      }
      
      .toast {
        width: 100%;
      }
    }
    
    @supports(padding: max(0px)) {
      .toast-container {
        padding-bottom: max(20px, env(safe-area-inset-bottom));
        padding-right: max(20px, env(safe-area-inset-right));
      }
      
      @media (max-width: 768px) {
        .toast-container {
          padding-left: max(20px, env(safe-area-inset-left));
        }
      }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  
  constructor(private readonly toastService: ToastService) {}
  
  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }
  
  removeToast(id: string): void {
    this.toastService.remove(id);
  }
}