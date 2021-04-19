import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {
  public userList: User[] = [];
  public doctorList: Doctor[] = [];
  public hospitalList: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params.term);
        this.doSearch(params.term);
      }
    );
  }

  doSearch(term) {
    this.searchService.searchAll(term).subscribe(
      res => {
        this.userList = res.users.result;
        this.doctorList = res.doctors.result;
        this.hospitalList = res.hospitals.result;
      }
    )
  }

}
