import {Component, OnInit} from '@angular/core';
import {map, mergeMap, Observable, of, Subject, take, tap, zip} from "rxjs";

type DurumPart = 'Meat' |  'Sauce' | 'Flat Bread';

interface IOrder {
  amount: number;
  customerId: number;
}

interface IProduct {
  product: string[];
  customerId: number;
}

@Component({
  selector: 'app-rxjs-durum',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-durum.component.html',
  styleUrl: './rxjs-durum.component.scss'
})
export class RxjsDurumComponent implements OnInit{

  durum$: Observable<string[]> = of(['']);
  delivery$: Observable<IProduct> | undefined;

  order$: Subject<IOrder> = new Subject();

  meat$ = new Subject<DurumPart>();
  sauce$ = new Subject<DurumPart>();
  flatBread$ = new Subject<DurumPart>();

  meatCount = 0;
  sauceCount = 0;
  flatBreadCount = 0;
  customerId = 0;


  orderDurum() {
    const amount = Math.floor(Math.random() * 3) + 1;
    ++this.customerId;

    this.order$.next({amount, customerId: this.customerId});
  }

  addMeat() {
    this.meat$.next('Meat');
  }
  addSauce() {
    this.sauce$.next('Sauce');
  }
  addFlatBread() {
    this.flatBread$.next('Flat Bread');
  }

  ngOnInit() {

    this.durum$ = zip(
      this.meat$.pipe(
        map((name) => name + ' #' + (++this.meatCount)),
      ),
      this.sauce$.pipe(
        map((name) => name + ' #' + (++this.sauceCount)),
      ),
      this.flatBread$.pipe(
        map((name) => name + ' #' + (++this.flatBreadCount)),
      )
    );

    this.delivery$ = this.order$.pipe(
      tap((order) => console.log('order', order)),
      mergeMap(({amount, customerId}) => this.durum$.pipe(
        take(amount),
        map((durum) => ({ product: durum, customerId: customerId })),
      )),
    );

    this.delivery$.subscribe((order) => {
      console.log('Delivery order:', order);
    })

  }

}
