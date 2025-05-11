import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ImageService } from '../../../core/services/image.service';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../../core/services/auth.service';
import { Thumbnail, ThumbnailCursor } from '../../../core/models/image.model';
import { ImageCardComponent } from '../../../shared/components/image-card/image-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageCardComponent, LoadingSpinnerComponent],
  template: `
    <div class="gallery-container">
      <div class="gallery-header">
        <h1>My Gallery</h1>
        <a routerLink="/upload" class="upload-btn">
          <span class="upload-icon">+</span>
          Upload Image
        </a>
      </div>
      
      <div *ngIf="loading && !thumbnails.length" class="loading-container">
        <app-loading-spinner [size]="48"></app-loading-spinner>
        <p>Loading your gallery...</p>
      </div>
      
      <div *ngIf="!loading && !thumbnails.length" class="empty-gallery">
        <div class="empty-icon">📷</div>
        <h2>Your gallery is empty</h2>
        <p>Upload your first image to get started</p>
        <a routerLink="/upload" class="btn-primary">Upload Image</a>
      </div>
      
      <div *ngIf="thumbnails.length" class="gallery-grid">
        <app-image-card
          *ngFor="let thumbnail of thumbnails"
          [thumbnail]="thumbnail"
          (delete)="onDeleteImage($event)"
        />
      </div>
      
      <div *ngIf="hasMore && thumbnails.length" class="load-more-container">
        <button 
          class="load-more-btn" 
          (click)="loadMore()" 
          [disabled]="loadingMore"
        >
          <app-loading-spinner *ngIf="loadingMore" [size]="24"></app-loading-spinner>
          <span *ngIf="!loadingMore">Load More</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .gallery-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    
    .gallery-header h1 {
      color: var(--text-primary);
      font-size: 2rem;
      margin: 0;
    }
    
    .upload-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: var(--primary);
      color: white;
      padding: 10px 16px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s, transform 0.3s;
    }
    
    .upload-btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
    }
    
    .upload-icon {
      font-size: 18px;
      font-weight: bold;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 24px;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: var(--text-secondary);
    }
    
    .loading-container p {
      margin-top: 16px;
    }
    
    .empty-gallery {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
      color: var(--text-secondary);
    }
    
    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
      opacity: 0.7;
    }
    
    .empty-gallery h2 {
      margin-bottom: 8px;
      color: var(--text-primary);
    }
    
    .empty-gallery p {
      margin-bottom: 24px;
    }
    
    .btn-primary {
      background-color: var(--primary);
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    
    .load-more-container {
      display: flex;
      justify-content: center;
      margin-top: 32px;
      margin-bottom: 32px;
    }
    
    .load-more-btn {
      background-color: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);
      padding: 10px 24px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      min-width: 120px;
    }
    
    .load-more-btn:hover {
      background-color: var(--primary-light);
    }
    
    .load-more-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .gallery-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;
      }
    }
  `]
})
export class GalleryComponent implements OnInit {
  thumbnails: Thumbnail[] = [];
  lastID: string | null = null;
  hasMore = true;
  loading = true;
  loadingMore = false;
  pageSize = 12;
  
  constructor(
    private readonly imageService: ImageService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {}
  
  ngOnInit(): void {
    this.loadThumbnails();
  }
  
  loadThumbnails(): void {
    this.loading = true;
    
    this.imageService.getThumbnails(undefined, this.pageSize).subscribe({
      next: (response: ThumbnailCursor) => {
        this.thumbnails = response.thumbnails;
        this.lastID = response.lastID;
        this.hasMore = response.thumbnails.length === this.pageSize;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  
  loadMore(): void {
    if (!this.lastID || this.loadingMore) return;
    
    this.loadingMore = true;
    
    this.imageService.getThumbnails(this.lastID, this.pageSize).subscribe({
      next: (response: ThumbnailCursor) => {
        this.thumbnails = [...this.thumbnails, ...response.thumbnails];
        this.lastID = response.lastID;
        this.hasMore = response.thumbnails.length === this.pageSize;
        this.loadingMore = false;
      },
      error: () => {
        this.loadingMore = false;
      }
    });
  }
  
  onDeleteImage(thumbnailId: string): void {
    if (!this.authService.currentUser) return;
    
    const thumbnail = this.thumbnails.find(t => t.id === thumbnailId);
    
    if (thumbnail) {
      this.imageService.deleteImage({
        id: thumbnail.imageID,
        owner: thumbnail.owner,
        thumbnail_id: thumbnail.id
      }).subscribe({
        next: (response) => {
          this.toastService.show(response.message, 'success');
          this.thumbnails = this.thumbnails.filter(t => t.id !== thumbnailId);
          
          // If we've deleted all thumbnails, check if there are more to load
          if (this.thumbnails.length === 0) {
            this.loadThumbnails();
          }
        }
      });
    }
  }
}