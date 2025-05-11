export interface Image {
  id: string;
  name: string;
  extension: string;
  content_file: string;
  owner: string;
  size: string;
}

export interface Thumbnail {
  id: string;
  name: string;
  extension: string;
  content_file: string;
  owner: string;
  size: string;
  imageID: string;
}

export interface ThumbnailCursor {
  thumbnails: Thumbnail[];
  lastID: string;
}

export interface ImageUpdateRequest {
  id: string;
  name: string;
  owner: string;
  thumbnail_id: string;
}

export interface ImageUpdateResponse {
  id: string;
  owner: string;
  updated_fields: Record<string, any>;
}

export interface ImageDeleteRequest {
  id: string;
  owner: string;
  thumbnail_id: string;
}