import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { Thumbnail } from "../../../core/models/image.model";
import { ImageContextService } from "../../../core/services/image-context.service";

@Component({
  selector: "app-image-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-card">
      <a (click)="goToDetail()" class="image-link">
        <div class="image-container">
          <img
            [src]="
              'data:image/' +
              getImageType(thumbnail.extension) +
              ';base64,' +
              thumbnail.content_file
            "
            [alt]="thumbnail.name"
            class="thumbnail-image"
          />
        </div>
      </a>

      <div class="image-info">
        <a (click)="goToDetail()" class="image-name">
          {{ thumbnail.name }}
        </a>
        <div class="image-meta">
          <span class="image-size">{{ thumbnail.size }}</span>
          <button class="delete-btn" (click)="onDelete()" title="Delete image">
            <img
              src="assets/images/icons/x.svg"
              alt="Delete"
              class="delete-icon"
            />
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .image-card {
        background-color: var(--card-bg);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .image-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .image-link {
        text-decoration: none;
        color: inherit;
        display: block;
        flex: 1;
      }

      .image-container {
        position: relative;
        width: 100%;
        padding-top: 100%;
        background-color: var(--background);
      }

      .thumbnail-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .image-card:hover .thumbnail-image {
        transform: scale(1.05);
      }

      .image-info {
        padding: 12px;
      }

      .image-name {
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 4px;
        display: block;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .image-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: var(--text-secondary);
      }

      .delete-btn {
        background: none;
        border: none;
        color: var(--error);
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      .delete-btn:hover {
        opacity: 1;
        background-color: rgba(var(--error-rgb), 0.1);
      }
      .delete-icon {
        font-size: 18px;
        font-weight: bold;
      }
      @media screen and (max-width: 576px) {
        .delete-btn {
          width: 25px;
          height: 25px;
          padding: 9px;
        }

        .delete-icon {
          font-size: 18px;
          font-weight: bold;
        }
      }
    `,
  ],
})
export class ImageCardComponent {
  @Input() thumbnail!: Thumbnail;
  @Output() delete = new EventEmitter<string>();

  constructor(
    private readonly router: Router,
    private readonly imageContext: ImageContextService
  ) {}

  getImageType(extension: string): string {
    return extension.replace(".", "");
  }

  onDelete(): void {
    if (confirm("Are you sure you want to delete this image?")) {
      this.delete.emit(this.thumbnail.id);
    }
  }

  goToDetail(): void {
    this.imageContext.setThumbnailId(this.thumbnail.id);
    this.router.navigate(["/image", this.thumbnail.imageID]);
  }
}
