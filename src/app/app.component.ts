import { LocationsService } from './services/locations/locations.service';
import { BackState, backState } from './reducers/back-reducer.reducer';
import { reducers } from './reducers/index';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Store, select, createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, addUser } from './reducers/user-reducer.reducer';
import { ReservationState } from './reducers/resirvation-reducer.reducer';
import { BooksAppState, AddBooks, DeleteBooks } from './reducers/books-reducer.reducer';
import { State } from './reducers';
import { RestuarantsAppState } from './reducers/restuarants.reducer';
import { MatSelectChange } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FavoriteRestuarants } from './models/favorite-restuarants';
import * as RESTUARANTS from './models/favorite-restuarants';
import * as LOCATIONS from './models/favorite-locations';
import { FavoriteLocations } from './models/favorite-locations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

  restuarants: FavoriteRestuarants[] = RESTUARANTS.restuarants;

  locations: FavoriteLocations[] = LOCATIONS.locations;

  progressList: any[] = [];

  constructor(private booksStore: Store<State>, private restuarantsStore: Store<RestuarantsAppState>, private backStore: Store<State>,
    private ref: ChangeDetectorRef, private locationsService: LocationsService) {

    this.backStore$();
    this.booksStore$();
    this.restuarantsStore$();

  };

  ngOnInit(): void {

  };

  ngAfterViewInit(): void {
    this.getLocationsData();
  };

  getLocationsData() {
    this.locationsService.getData$.subscribe((data) => {
      console.log(data)
      debugger;
    });
  }

  selectedRestuarantEmitterHandler(option: MatSelectChange) {
    console.log('restuarant value: ', option.value);
  };
  selectedLocationEmitterHandler(option: MatSelectChange) {
    console.log('location value: ', option.value);
  };

  changeMode() {

  };

  restuarantsStore$() {
    this.restuarantsStore.pipe(select('restuarants')).subscribe((state: RestuarantsAppState) => {
      console.log('restuarantsState: ', state);
    });
  };

  booksStore$() {
    // TODO: advanced - forRoot metaReducers
    this.booksStore.pipe(select('booksState')).subscribe((state: BooksAppState) => {
      if (state.type === '[BACK] BACK') {
        const prev = state.prev[state.prev.length - 1]['payload'];
        this.progressList = Object.assign({}, prev);
      } else {
        this.progressList = [...state.current['payload']];
        console.log('BooksState initial$:', state);
      }
      return state;
    });
  };

  backStore$() {
    this.backStore.pipe(select('backState')).subscribe((state: BackState) => {
      console.log('[back] state: ', state);
      return state;
    });
  };

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
    this.progressList = this.progressList.map((item) => {
      item.selected = (id === item.id) ? true : false; return item;
    });
    return this.progressList;
  };


}
