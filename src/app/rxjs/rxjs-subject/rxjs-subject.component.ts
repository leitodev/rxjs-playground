import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject, Subscription} from "rxjs";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-rxjs-subject',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './rxjs-subject.component.html',
  styleUrl: './rxjs-subject.component.scss'
})
export class RxjsSubjectComponent implements OnInit {
  replaySubjectArr: number[] = [];
  behaviorArr: number[] = [];
  subjectArr: number[] = [];

  subject = new Subject<number>();
  ReplaySubject = new ReplaySubject<number>(100);
  behaviorSubject = new BehaviorSubject<number>(1);

  subscription: Subscription = new Subscription();

  emitSubject(){
    this.subject.next(Math.random());
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.ReplaySubject.next(1);
    this.ReplaySubject.next(81);
    this.ReplaySubject.next(981);
    this.ReplaySubject.next(10);
    this.ReplaySubject.next(20);

    this.ReplaySubject.subscribe(res => {
      console.log('ReplaySubject [bufferSize 100] emit:', res);
      this.replaySubjectArr.push(res);
    });

    this.ReplaySubject.next(2);
    this.ReplaySubject.next(3);
    this.ReplaySubject.next(422);

    this.behaviorSubject.next(1);
    this.behaviorSubject.next(2);
    this.behaviorSubject.next(3);
    this.behaviorSubject.next(4);

    this.behaviorSubject.subscribe(res => {
      console.log('behaviorSubject emit:', res);
      this.behaviorArr.push(res);
    });

    this.subject.next(1);
    this.subject.next(3);
    this.subject.next(4);

    this.subscription = this.subject.subscribe(res => {
      console.log('subject emit:', res);
      this.subjectArr.push(res);
    });


  }
}
