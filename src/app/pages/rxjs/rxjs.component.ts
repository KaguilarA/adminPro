import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {
    // this.observable
    // .pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log(`sbs`, valor),
    //   err => console.warn(`Error`, err),
    //   () => console.info(`!------- Obs Done -------!`)
    // );
    this.intervalSubs = this.interval.subscribe(
      valor => console.log(`sbs`, valor),
    )
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  get interval() {
    return interval(100).pipe(
      // take(10),
      map(value => value + 1),
      filter(value => value % 2 === 0 ? true: false)
    );
  }

  get observable(): Observable<number> {
    let counter: number = 0;
    return new Observable( observer => {
      const interval = setInterval(() => {
        switch (counter) {
          case 4:
            observer.complete();
            clearInterval(interval);
            break;

          case 3:
            observer.error(`Its on 3`);
            clearInterval(interval);
            break;
        
          default:
            observer.next(counter);
            counter++;
            break;
        }
        
      }, 1000);
    });
  }

}
