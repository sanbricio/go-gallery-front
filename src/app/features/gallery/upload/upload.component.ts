import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ImageService } from '../../../core/services/image.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  template: `
    <div class="upload-container">
      <div class="upload-card">
        <h1 class="upload-title">Upload New Image</h1>
        
        <form [formGroup]="uploadForm" (ngSubmit)="onSubmit()" class="upload-form">
          <div class="form-group">
            <label for="file">Select Image</label>
            <div 
              class="file-drop-area" 
              [class.drag-over]="isDragging"
              [class.has-file]="!!selectedFile"
              (dragover)="onDragOver($event)" 
              (dragleave)="onDragLeave($event)"
              (drop)="onDrop($event)"
              (click)="fileInput.click()"
            >
              <input 
                type="file" 
                id="file" 
                #fileInput
                accept="image/jpeg,image/jpg,image/png,image/webp"
                (change)="onFileSelected($event)"
                style="display: none;"
              >
              
              <div *ngIf="!selectedFile" class="drop-message">
                <img src="assets/images/icons/folder.svg" alt="Upload Folder" class="upload-icon" />
                <p>Drag and drop an image here or click to browse</p>
                <p class="file-hint">Accepted formats: JPG, JPEG, PNG, WebP</p>
              </div>
              
              <div *ngIf="selectedFile" class="file-preview">
                <img [src]="previewUrl" alt="Preview" class="preview-image">
                <div class="file-info">
                  <p class="file-name">{{ selectedFile.name }}</p>
                  <p class="file-size">{{ formatFileSize(selectedFile.size) }}</p>
                </div>
                <button type="button" class="remove-file-btn" (click)="removeFile($event)">✕</button>
              </div>
            </div>
            <div *ngIf="submitted && !selectedFile" class="error-message">
              Please select an image file
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="goBack()">Cancel</button>
            <button 
              type="submit" 
              class="btn-primary" 
              [disabled]="loading || !selectedFile"
            >
              <app-loading-spinner *ngIf="loading" [size]="24"></app-loading-spinner>
              <span *ngIf="!loading">Upload Image</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .upload-container {
      display: flex;
      justify-content: center;
      padding: 24px;
    }
    
    .upload-card {
      background-color: var(--card-bg);
      padding: 32px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
    }
    
    .upload-title {
      color: var(--primary);
      margin-bottom: 24px;
      font-size: 24px;
    }
    
    .upload-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .upload-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
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
    
    .file-drop-area {
      border: 2px dashed var(--border);
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .file-drop-area:hover {
      border-color: var(--primary);
    }
    
    .drag-over {
      border-color: var(--primary);
      background-color: var(--primary-light);
    }
    
    .has-file {
      border-style: solid;
      border-color: var(--primary);
    }
    
    .drop-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
    }
    
    .upload-icon {
      font-size: 48px;
      margin-bottom: 8px;
    }
    
    .file-hint {
      font-size: 14px;
      opacity: 0.7;
    }
    
    .file-preview {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      position: relative;
    }
    
    .preview-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .file-info {
      flex: 1;
      text-align: left;
    }
    
    .file-name {
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 4px;
      word-break: break-all;
    }
    
    .file-size {
      color: var(--text-secondary);
      font-size: 14px;
    }
    
    .remove-file-btn {
      background: none;
      border: none;
      color: var(--error);
      cursor: pointer;
      font-size: 18px;
      padding: 4px;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }
    
    .remove-file-btn:hover {
      background-color: rgba(var(--error-rgb), 0.1);
    }
    
    .error-message {
      color: var(--error);
      font-size: 14px;
      margin-top: 4px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
    
    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
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
    
    .btn-secondary {
      background-color: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border);
    }
    
    .btn-secondary:hover {
      background-color: var(--background);
    }
    
    @media (max-width: 576px) {
      .upload-card {
        padding: 24px 16px;
      }
      
      .file-drop-area {
        padding: 24px 16px;
      }
      
      .form-actions {
        flex-direction: column-reverse;
      }
      
      .btn-primary, .btn-secondary {
        width: 100%;
      }
    }
  `]
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isDragging = false;
  loading = false;
  submitted = false;
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly imageService: ImageService,
    private readonly toastService: ToastService
  ) {
    this.uploadForm = this.formBuilder.group({
      file: [null, Validators.required]
    });
  }
  
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const file = event.dataTransfer?.files?.[0];
    // Check if it's an image
    if (file){
      if (file.type.startsWith('image/')) {
        this.handleFile(file);
      } else {
        this.toastService.show('Please select an image file', 'error');
      }
    }
  }
  
  handleFile(file: File): void {
    // Accept only image files
    if (!RegExp(/image\/(jpeg|jpg|png|webp)/).exec(file.type)) {
      this.toastService.show('Only JPG, JPEG, PNG, and WebP images are allowed', 'error');
      return;
    }
    
    this.selectedFile = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  removeFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    this.previewUrl = null;
  }
  
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (!this.selectedFile) {
      return;
    }
    
    this.loading = true;
    
    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.toastService.show('Image uploaded successfully!', 'success');
        this.router.navigate(['/gallery']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/gallery']);
  }
}