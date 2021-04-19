import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';

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
    public modalService: ModalService,
    private fileUpload: FileUploadService
  ) { }

  get dataId() {
    return this.modalService.data._id;
  }

  get dataImage() {
    return this.modalService.data.img;
  }

  get entity() {
    return this.modalService.entity;
  }

  get displayState() {
    return this.modalService.modalImgState;
  }

  closeModal() {
    this.modalService.hideImgModal();
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
      this.previewImg = null;
    }
    this.newPhoto = file;
    this.showPreview();
  }

  uploadImage() {
    this.fileUpload.updatePhoto(this.newPhoto, this.entity, this.dataId)
      .then(res => {
        this.modalService.data.updateData(res.data.updated);
        this.closeModal();
      });
  }

}
