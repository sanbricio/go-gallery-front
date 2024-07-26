import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-form-upload-image',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-upload-image.component.html',
  styleUrl: './form-upload-image.component.css'
})
export class FormUploadImageComponent {
  constructor(private service: ApiService) { }

  imageForm = new FormData()

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageForm.set("file", file)
    }
  }
  uploadFile() {
    this.service.insert(this.imageForm).subscribe();
  }
}
