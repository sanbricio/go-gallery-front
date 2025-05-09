import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private readonly toastsSubject = new BehaviorSubject<Toast[]>([]);
  
  toasts$ = this.toastsSubject.asObservable();
  
  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000): void {
    const id = this.generateId();
    
    const toast: Toast = {
      id,
      message,
      type,
      duration
    };
    
    this.toasts = [...this.toasts, toast];
    this.toastsSubject.next(this.toasts);
    
    // Auto-remove the toast after the specified duration
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }
  
  remove(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(this.toasts);
  }
  
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}