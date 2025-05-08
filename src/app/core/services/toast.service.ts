import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastSubject.asObservable();
  private counter = 0;

  constructor() {}

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000): number {
    const id = this.counter++;
    const toast: Toast = { id, message, type, duration };
    
    const currentToasts = this.toastSubject.value;
    this.toastSubject.next([...currentToasts, toast]);
    
    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
    
    return id;
  }

  remove(id: number): void {
    const currentToasts = this.toastSubject.value;
    this.toastSubject.next(currentToasts.filter(toast => toast.id !== id));
  }
}