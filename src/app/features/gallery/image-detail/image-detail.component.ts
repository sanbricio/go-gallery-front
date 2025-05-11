import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ImageService } from '../../../core/services/image.service';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../../core/services/auth.service';
import { Image } from '../../../core/models/image.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ImageContextService } from '../../../core/services/image-context.service';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LoadingSpinnerComponent],
  template: `
    <div class="detail-container">
      <div *ngIf="loading" class="loading-container">
        <app-loading-spinner [size]="48"></app-loading-spinner>
        <p>Loading image...</p>
      </div>
      
      <div *ngIf="!loading && !image" class="error-container">
        <h2>Image not found</h2>
        <p>The image you're looking for doesn't exist or you don't have permission to view it.</p>
        <a routerLink="/gallery" class="btn-primary">Back to Gallery</a>
      </div>
      
      <div *ngIf="!loading && image" class="image-detail">
        <div class="detail-header">
          <a routerLink="/gallery" class="back-link">
            ← Back to Gallery
          </a>
          
          <div class="image-actions">
            <button 
              class="btn-secondary" 
              (click)="downloadImage()" 
              [disabled]="downloadLoading"
            >
              <app-loading-spinner *ngIf="downloadLoading" [size]="20"></app-loading-spinner>
              <span *ngIf="!downloadLoading">Download</span>
            </button>
            
            <button 
              class="btn-danger" 
              (click)="deleteImage()" 
              [disabled]="deleteLoading"
            >
              <app-loading-spinner *ngIf="deleteLoading" [size]="20"></app-loading-spinner>
              <span *ngIf="!deleteLoading">Delete</span>
            </button>
          </div>
        </div>
        
        <div class="image-container">
          <img [src]="'data:image/' + getImageType(image.extension) + ';base64,' + image.content_file" 
               [alt]="image.name" 
               class="detail-image">
        </div>
        
        <div class="image-info">
          <div *ngIf="!isEditing" class="info-display">
            <h2>{{ image.name }}</h2>
            <p class="file-info">
              <span>{{ formatFileSize(image.size) }}</span> • 
              <span>{{ image.extension.replace('.', '').toUpperCase() }}</span>
            </p>
            
            <button class="edit-btn" (click)="startEditing()">Rename</button>
          </div>
          
          <form *ngIf="isEditing" [formGroup]="renameForm" (ngSubmit)="saveChanges()" class="rename-form">
            <div class="form-group">
              <label for="name">Image Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name" 
                placeholder="Enter image name"
                [class.error]="submitted && f['name'].errors"
                autofocus
              >
              <div *ngIf="submitted && f['name'].errors" class="error-message">
                <span *ngIf="f['name'].errors['required']">Name is required</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-cancel" (click)="cancelEditing()">Cancel</button>
              <button 
                type="submit" 
                class="btn-save" 
                [disabled]="updateLoading || renameForm.invalid"
              >
                <app-loading-spinner *ngIf="updateLoading" [size]="20"></app-loading-spinner>
                <span *ngIf="!updateLoading">Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
    }
    
    .loading-container p {
      margin-top: 16px;
      color: var(--text-secondary);
    }
    
    .error-container h2 {
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    
    .error-container p {
      color: var(--text-secondary);
      margin-bottom: 24px;
    }
    
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    .back-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .back-link:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }
    
    .image-actions {
      display: flex;
      gap: 12px;
    }
    
    .btn-secondary, .btn-danger {
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 100px;
    }
    
    .btn-secondary {
      background-color: var(--background);
      color: var(--text-primary);
      border: 1px solid var(--border);
    }
    
    .btn-secondary:hover {
      background-color: var(--background-darker);
    }
    
    .btn-danger {
      background-color: var(--error);
      color: white;
    }
    
    .btn-danger:hover {
      background-color: var(--error-dark);
    }
    
    .btn-primary {
      background-color: var(--primary);
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    
    .image-container {
      margin-bottom: 24px;
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--background);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .detail-image {
      max-width: 100%;
      max-height: 70vh;
    }
    
    .image-info {
      background-color: var(--card-bg);
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .info-display {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .info-display h2 {
      margin: 0;
      color: var(--text-primary);
      word-break: break-all;
    }
    
    .file-info {
      color: var(--text-secondary);
      margin: 0 0 16px;
    }
    
    .edit-btn {
      align-self: flex-start;
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      padding: 4px 0;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .edit-btn:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }
    
    .rename-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
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
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    .btn-cancel, .btn-save {
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 80px;
    }
    
    .btn-cancel {
      background-color: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border);
    }
    
    .btn-cancel:hover {
      background-color: var(--background);
    }
    
    .btn-save {
      background-color: var(--primary);
      color: white;
    }
    
    .btn-save:hover {
      background-color: var(--primary-dark);
    }
    
    .btn-save:disabled {
      background-color: var(--disabled);
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .detail-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .image-actions {
        width: 100%;
      }
      
      .btn-secondary, .btn-danger {
        flex: 1;
      }
    }
  `]
})
export class ImageDetailComponent implements OnInit {
  imageId: string | null = null;
  thumbnailID : string | null = null;
  image: Image | null = null;
  loading = true;
  downloadLoading = false;
  deleteLoading = false;
  updateLoading = false;
  isEditing = false;
  submitted = false;
  renameForm: FormGroup;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly imageService: ImageService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly imageContext : ImageContextService
  ) {
    this.renameForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  
  // Getter for easy access to form fields
  get f() { return this.renameForm.controls; }
  
  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    this.thumbnailID = this.imageContext.getThumbnailId();

    if (this.imageId && this.thumbnailID) {
      this.loadImage();
    } else {
      this.loading = false;
    }
  }
  
  loadImage(): void {
    if (!this.imageId) return;
    
    this.loading = true;
    
    this.imageService.getImage(this.imageId).subscribe({
      next: (image) => {
        this.image = image;
        this.loading = false;
      },
      error: () => {
        this.image = null;
        this.loading = false;
      }
    });
  }
  
  getImageType(extension: string): string {
    // Remove the dot and return the extension
    return extension.replace('.', '');
  }
  
  formatFileSize(size: string): string {
    // The size might be already formatted from the API, so just return it
    return size;
  }
  
  downloadImage(): void {
    if (!this.image) return;
    
    this.downloadLoading = true;
    
    try {
      this.imageService.downloadImage(this.image);
      setTimeout(() => {
        this.downloadLoading = false;
      }, 1000);
    } catch (error) {
      this.toastService.show('Error downloading image', 'error');
      console.error('Download error:', error);
      this.downloadLoading = false;
    }
  }
  
  deleteImage(): void {
    if (!this.image || !this.authService.currentUser) return;
    
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }
    
    this.deleteLoading = true;
    
    this.imageService.deleteImage({
      id: this.image.id,
      thumbnail_id: this.thumbnailID ?? '',
      owner: this.image.owner
    }).subscribe({
      next: (response) => {
        this.toastService.show(response.message, 'success');
        this.router.navigate(['/gallery']);
      },
      error: () => {
        this.deleteLoading = false;
      }
    });
  }
  
  startEditing(): void {
    if (!this.image) return;
    
    this.renameForm.patchValue({
      name: this.image.name
    });
    
    this.isEditing = true;
  }
  
  cancelEditing(): void {
    this.isEditing = false;
    this.submitted = false;
  }
  
  saveChanges(): void {
    if (!this.image || !this.authService.currentUser) return;
    
    this.submitted = true;
    
    // Stop here if form is invalid
    if (this.renameForm.invalid) {
      return;
    }
    
    // If the name didn't change, just cancel editing
    if (this.renameForm.value.name === this.image.name) {
      this.cancelEditing();
      return;
    }
    
    this.updateLoading = true;
    
    this.imageService.updateImage({
      id: this.image.id,
      name: this.renameForm.value.name,
      thumbnail_id:  this.thumbnailID ?? '',
      owner: this.image.owner
    }).subscribe({
      next: (response) => {
        if (this.image) {
          this.image.name = this.renameForm.value.name;
        }
        this.toastService.show('Image renamed successfully', 'success');
        this.isEditing = false;
        this.submitted = false;
        this.updateLoading = false;
      },
      error: () => {
        this.updateLoading = false;
      }
    });
  }
}