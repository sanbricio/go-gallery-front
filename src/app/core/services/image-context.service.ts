import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageContextService {
  private thumbnailId: string | null = null;

  setThumbnailId(id: string) {
    this.thumbnailId = id;
    sessionStorage.setItem('thumbnailId', id);
  }

  getThumbnailId(): string | null {
    return this.thumbnailId ?? sessionStorage.getItem('thumbnailId');
  }

  clear() {
    this.thumbnailId = null;
    sessionStorage.removeItem('thumbnailId');
  }
}
