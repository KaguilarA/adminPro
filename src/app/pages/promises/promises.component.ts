import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {
  donePromise: string;

  constructor() { }

  ngOnInit(): void {
    const promise: Promise<string> = new Promise((resolve, reject) => {
      if (true) {
        resolve(`dude`);
      } else {
        reject(`fuck`)
      }

    });

    promise.then(res => {
      this.donePromise = res;
    }).catch(err => {
      this.donePromise = err;
    });
  }

}
