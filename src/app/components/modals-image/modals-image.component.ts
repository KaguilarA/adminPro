import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modals-image',
  templateUrl: './modals-image.component.html',
  styleUrls: ['./modals-image.component.css']
})
export class ModalsImageComponent {
  public imgSrc;
  public newPhoto: File;
  public previewImg: any= null;

  constructor(
    public imageModalService: ModalImageService,
    private fileUpload: FileUploadService
  ) { }

  get dataId() {
    return this.imageModalService.data._id;
  }

  get dataImage() {
    return this.imageModalService.data.img;
  }

  get entity() {
    return this.imageModalService.entity;
  }

  get displayState() {
    return this.imageModalService.modalState;
  }

  closeModal() {
    this.imageModalService.hideModal();
    this.previewImg = null;
  }

  showPreview() {
    const reader = new FileReader();
    reader.readAsDataURL(this.newPhoto);
    reader.onloadend = () => {
      this.previewImg = reader.result;
    }
  }

  updateImage(file: File) {
    if (!file) {
      this.previewImg = null
    }
    this.newPhoto = file;
    this.showPreview();
  }

  uploadImage() {
    this.fileUpload.updatePhoto(this.newPhoto, this.entity, this.dataId)
      .then(res => {
        this.imageModalService.data.updateData(res.data.updated);
        this.closeModal();
      });
  }

}
