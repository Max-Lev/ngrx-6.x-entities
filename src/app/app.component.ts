import { BackState, backState } from './reducers/back-reducer.reducer';
import { reducers } from './reducers/index';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Store, select, createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, addUser } from './reducers/user-reducer.reducer';
import { ReservationState } from './reducers/resirvation-reducer.reducer';
import { BooksAppState, AddBooks, DeleteBooks } from './reducers/books-reducer.reducer';
import { State } from './reducers';

export interface Food {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  list: any[] = [];

  constructor(private booksStore: Store<State>, private ref: ChangeDetectorRef) {

    this.booksStore.pipe(select('backState')).subscribe((state: BackState) => {
      console.log('[back] state: ', state);
      return state;
    });

    // TODO: advanced - forRoot metaReducers
    this.booksStore.pipe(select('booksState')).subscribe((state: BooksAppState) => {
      if (state.type === '[BACK] BACK') {
        const prev = state.prev[state.prev.length - 1]['payload'];
        this.list = Object.assign({}, prev);
      } else {
        this.list = [...state.current['payload']];
        console.log('BooksState initial$:', state);
      }
      return state;
    });

  };

  ngOnInit(): void { };

  ngAfterViewInit(): void {

  }

  addBooks(id: number, list: any[]) {
    const data = this.setActive(id, list);
    this.booksStore.dispatch(new AddBooks(data));
  };

  deleteBooks(id: number, list: any[]) {
    const data = this.setActive(id, list);
    this.booksStore.dispatch(new DeleteBooks(data));
  };

  back() {
    this.booksStore.dispatch(backState);
  };

  setActive(id: number, list: any[]): any[] {

    this.list = this.list.map((item) => {
      if (id === item.id) {
        item.selected = true;
        return item;
      } else {
        item.selected = false;
        return item;
      }
    });
    return this.list;

  };




}
