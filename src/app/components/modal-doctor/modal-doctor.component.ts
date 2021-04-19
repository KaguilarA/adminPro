import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-modal-doctor',
  templateUrl: './modal-doctor.component.html',
  styleUrls: ['./modals-doctor.component.css']
})
export class ModalDoctorComponent {
  public formSubmitted = false;
  public doctorForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    firstSurname: ['', Validators.required],
    hospitalId: ['', Validators.required],
    secondName: [''],
    secondSurname: ['']
  });
  public hospitalList: Hospital[];
  public loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    public modalService: ModalService
  ) {
    this.clearForm();
    this.modalService.showData
      .pipe(delay(100))
      .pipe(
        mergeMap(() => this.hospitalService.getAllHospitals())
      )
      .subscribe(res => {
        this.hospitalList = res.hospitals;
        if (this.hasData) {
          this.doctorForm.setValue({
            firstName: this.data.firstName,
            firstSurname: this.data.firstSurname,
            secondName: this.data.secondName,
            secondSurname: this.data.secondSurname,
            hospitalId: this.data.hospitalId._id
          });
        }
        this.loading = false;
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
    let hasData: boolean = false;
    if (this.data._id) {
      hasData = true
    }
    return hasData;
  }

  public clearForm(): void {
    this.doctorForm.setValue({
      firstName: '',
      firstSurname: '',
      hospitalId: '',
      secondName: '',
      secondSurname: ''
    });
    this.setHospitalList();
  }

  public closeModal(): void {
    this.clearForm();
    this.modalService.resetData();
    this.hospitalList = [];
    this.loading = true;
  }

  public invalidField(field: string): boolean {
    if (this.doctorForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public registerDoctor(): void {
    this.formSubmitted = true;

    if (this.doctorForm.valid) {
      this.doctorService.createDoctor(this.doctorForm.value).subscribe(
        res => {
          Swal.fire(
            `Médico registrado`,
            `El médico ${res.data.mainName} ha sido registrado correctamente`,
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

  public setHospitalList(): void {
    this.hospitalService.getAllHospitals().subscribe(
      res => {
        this.hospitalList = res.hospitals;
      }
    )
  }

  public showImgModal(): void {
    this.modalService.showImgModal();
  }

  public updateDoctor(): void {
    this.formSubmitted = true;

    if (this.doctorForm.valid) {
      console.log('this.doctorForm.value: ', this.doctorForm.value);
      this.doctorService.updateDoctor(this.doctorForm.value, this.data._id)
        .subscribe(
          res => {
            console.log('res: ', res);
            this.data.updateData(res.data);
            
            Swal.fire(
              `Médico actualizado`,
              `El médico ${this.data.mainName} ha sido actualizado correctamente`,
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
