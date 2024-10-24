import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {
  combineLatest,
  delay,
  forkJoin,
  of,
  Subject,
  switchMap,
} from "rxjs";

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.scss'
})
export class RxjsOperatorsComponent implements OnInit {
  value1: string = Math.random().toString(36).substr(2);
  my1Subject = new Subject<object>();
  newObservable = of({name: 'Observable'});

  // forkJoin to wait for all user details requests to complete
  forkObject = forkJoin({
    firstObj: of('first1'),
    secondObj: of('World').pipe(delay(3000))
  })

  emitMy1Subject(value: string) {
    this.my1Subject.next({name: 'emitted'+value});
    this.value1 = Math.random().toString(36).substr(2);
  };

  ngOnInit() {
    this.forkObject.subscribe(forkObj => {
      console.log('forkObj delay:::', forkObj);
    });

    this.newObservable.pipe(
      switchMap((data: any) => {
        data = {...data, new: 123}
        return of(data);
      })
    ).subscribe(data => {
      console.log('newObservable data:', data);
    });

    combineLatest([this.newObservable, this.forkObject, this.my1Subject])
      .subscribe(data => {
          console.log('combineLatest', data);
        }
      );

    this.my1Subject.next({name: 'title1forSubject'});
    this.my1Subject.subscribe(data => {
      console.log('my1Subject data:', data);
    });



  }

}
