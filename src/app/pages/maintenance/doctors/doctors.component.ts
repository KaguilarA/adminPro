import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';

import { DoctorService } from 'src/app/services/doctor.service';
import { SearchService } from 'src/app/services/search.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {
  public blockNext: boolean = false;
  public countDoctor: number;
  public currentCountDoctor: number = 0;
  public loading: boolean = true;
  public doctorList: Doctor[];

  constructor(
    private doctorService: DoctorService,
    private searchService: SearchService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  public changePage(isIncrement: number): void {
    this.currentCountDoctor += isIncrement;

    if (this.currentCountDoctor < 0) {
      this.currentCountDoctor = 0;
    } else if (this.currentCountDoctor >= this.countDoctor) {
      this.currentCountDoctor -= isIncrement;
    }

    this.loadDoctors();
  }

  public createDoctor(): void {
    this.modalService.showModal(this.doctorService.urlEntity);
    this.modalService.showData.emit();
  }

  public deleteDoctor(doctor): void {
    Swal.fire({
      icon: `question`,
      title: `¿Desea elminiar el hospital?`,
      text: `Una vez eliminado el hospital ${doctor.mainName}, no podrá volver a acceder a sus datos.`,
      showCancelButton: true,
      confirmButtonColor: `#3085d6`,
      cancelButtonColor: `#d33`,
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id).subscribe(
          (res: any) => {
            this.loadDoctors();
            Swal.fire(
              `Hospital eliminado`,
              `El hospital ${res.data.name} ha sido elminado correctamente`,
              `success`
            );
          }
        );
      }
    });
  }

  public loadDoctors(): void {
    this.loading = true;
    this.doctorService.getAllDoctors(this.currentCountDoctor).subscribe(
      res => {
        this.doctorList = res.doctors;
        if (this.doctorList.length !== 0) {
          this.countDoctor = res.doctorsLength;
        }
        this.loading = false;
      }
    );
  }

  public search(term): void {
    if (term === '') {
      this.loadDoctors();
    } else {
      this.searchService.search(this.doctorService.urlEntity, term).subscribe(
        res => {
          this.doctorList = res;
        }
      );
    }
  }

  public updateDoctor(doctor: Doctor): void {
    this.modalService.showModal(this.doctorService.urlEntity, doctor);
    this.modalService.showData.emit();
  }

  public updateDoctorImg(doctor: Doctor): void {
    this.modalService.showImgModal(this.doctorService.urlEntity, doctor);
  }
}
