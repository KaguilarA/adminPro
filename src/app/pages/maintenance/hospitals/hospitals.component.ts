import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { SearchService } from 'src/app/services/search.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {
  public blockNext: boolean = false;
  public countHospital: number;
  public currentCountHospital: number = 0;
  public loading: boolean = true;
  public hospitalList: Hospital[];

  constructor(
    private hospitalService: HospitalService,
    private searchService: SearchService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  public changePage(isIncrement: number): void {
    this.currentCountHospital += isIncrement;

    if (this.currentCountHospital < 0) {
      this.currentCountHospital = 0;
    } else if (this.currentCountHospital >= this.countHospital) {
      this.currentCountHospital -= isIncrement;
    }

    this.loadHospitals();
  }

  public createHospital(): void {
    this.modalService.showModal(this.hospitalService.urlEntity);
    this.modalService.showData.emit();
  }

  public deleteHospital(hospital): void {
    Swal.fire({
      icon: `question`,
      title: `¿Desea elminiar el hospital?`,
      text: `Una vez eliminado el hospital ${hospital.name}, no podrá volver a acceder a sus datos.`,
      showCancelButton: true,
      confirmButtonColor: `#3085d6`,
      cancelButtonColor: `#d33`,
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id).subscribe(
          (res: any) => {
            this.loadHospitals();
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

  public loadHospitals(): void {
    this.loading = true;
    this.hospitalService.getAllHospitals(this.currentCountHospital).subscribe(
      res => {
        this.hospitalList = res.hospitals;
        if (this.hospitalList.length !== 0) {
          this.countHospital = res.hospitalsLength;
        }
        this.loading = false;
      }
    );
  }

  public search(term): void {
    if (term === '') {
      this.loadHospitals();
    } else {
      this.searchService.search(this.hospitalService.urlEntity, term).subscribe(
        res => {
          this.hospitalList = res;
        }
      );
    }
  }

  public updateHospital(hospital: Hospital): void {
    this.modalService.showModal(this.hospitalService.urlEntity, hospital);
    this.modalService.showData.emit();
  }

  public updateHospitalImg(hospital: Hospital): void {
    this.modalService.showImgModal(this.hospitalService.urlEntity, hospital);
  }
}
