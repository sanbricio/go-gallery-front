import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast" 
        [ngClass]="toast.type"
        (click)="removeToast(toast.id)"
      >
        <div class="toast-message">{{ toast.message }}</div>
        <button class="toast-close">×</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
      pointer-events: none;
    }
    
    .toast {
      background-color: var(--card-bg);
      color: var(--text-primary);
      padding: 12px 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
      max-width: 400px;
      pointer-events: auto;
      animation: slide-in 0.3s ease-out;
      cursor: pointer;
      border-left: 4px solid var(--primary);
    }
    
    .toast.success {
      border-left-color: var(--success);
    }
    
    .toast.error {
      border-left-color: var(--error);
    }
    
    .toast.info {
      border-left-color: var(--primary);
    }
    
    .toast-message {
      flex: 1;
      margin-right: 8px;
    }
    
    .toast-close {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 18px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.3s;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    
    .toast-close:hover {
      opacity: 1;
    }
    
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @media (max-width: 576px) {
      .toast-container {
        bottom: 16px;
        right: 16px;
        left: 16px;
      }
      
      .toast {
        width: 100%;
        max-width: 100%;
        min-width: unset;
      }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  
  constructor(private toastService: ToastService) {}
  
  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }
  
  removeToast(id: number): void {
    this.toastService.remove(id);
  }
}