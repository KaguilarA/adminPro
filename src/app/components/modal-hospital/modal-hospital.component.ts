import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-modal-hospital',
  templateUrl: './modal-hospital.component.html',
  styleUrls: ['./modals-hospital.component.css']
})
export class ModalHospitalComponent {
  public formSubmitted = false;
  public hospitalForm: FormGroup = this.fb.group({
    name: [this.data.name, Validators.required],
    latitude: [this.data.latitude],
    longitude: [this.data.latitude]
  });

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    public modalService: ModalService
  ) {
    this.modalService.showData
      .pipe(delay(100))
      .subscribe(() => {
        console.log('this.hasData: ', this.hasData);
        if (this.hasData) {
          this.hospitalForm.setValue({
            name: this.data.name,
            latitude: this.data.latitude,
            longitude: this.data.longitude
          });
        } else {
          console.log('this.data: ', this.data);
        }
      });
  }

  get data() {
    return this.modalService.data;
  }

  get displayState() {
    return this.modalService.modalState;
  }

  get entity() {
    return this.modalService.entity;
  }

  get hasImage() {
    let hasImage = false;
    if (this.data.img !== undefined) {
      hasImage = true;
    }
    return hasImage;
  }

  get hasData(): boolean {
    let hasData: boolean =  false;
    if (this.data.name) {
      hasData = true
    }
    return hasData;
  }

  public clearForm(): void {
    this.hospitalForm.setValue({
      name: '',
      latitude: '',
      longitude: ''
    });
  }

  public closeModal(): void {
    this.clearForm();
    this.modalService.resetData();
  }

  public invalidField(field: string): boolean {
    if (this.hospitalForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public registerHospital(): void {
    this.formSubmitted = true;

    if (this.hospitalForm.valid) {
      this.hospitalService.createHospital(this.hospitalForm.value).subscribe(
        res => {
          Swal.fire(
            `Hospital registrado`,
            `El hospital ${res.data.name} ha sido registrado correctamente`,
            `success`
          ).then(() => {
            this.closeModal();
          });
        }, err => {
          Swal.fire('Error', err.error.msj, 'error');
        }
      );
    }
  }

  public showImgModal(): void {
    this.modalService.showImgModal();
  }

  public updateHospital(): void {
    this.formSubmitted = true;

    if (this.hospitalForm.valid) {
      this.hospitalService.updateHospital(this.hospitalForm.value, this.data._id)
        .subscribe(
          res => {
            this.data.updateData(res.data);
            Swal.fire(
              `Hospital actualizado`,
              `El hospital ${this.data.name} ha sido actualizado correctamente`,
              `success`
            ).then(() => {
              this.closeModal();
            });
          }, err => {
            Swal.fire('Error', err.error.msj, 'error');
          }
        );
    }
  }
}
