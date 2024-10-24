import { Routes } from '@angular/router';
import {RxjsSubjectComponent} from "./rxjs/rxjs-subject/rxjs-subject.component";
import {RxjsOperatorsComponent} from "./rxjs/rxjs-operators/rxjs-operators.component";
import {RxjsDurumComponent} from "./rxjs/rxjs-durum/rxjs-durum.component";

export const routes: Routes = [
  {path: 'rxjs-subject', component: RxjsSubjectComponent},
  {path: 'rxjs-operators', component: RxjsOperatorsComponent},
  {path: 'rxjs-durum', component: RxjsDurumComponent}
];
