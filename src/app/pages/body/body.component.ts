import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../interfaces/Image';
import { ApiService } from '../../core/services/api.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormUploadImageComponent } from "./components/forms/form-upload-image/form-upload-image.component";

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [AsyncPipe, FormsModule, FormUploadImageComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  image !: Observable<Image>
  idImage !: string

  constructor(private service : ApiService){}

  findImage() {
    this.image = this.service.find(this.idImage)
  }

}
