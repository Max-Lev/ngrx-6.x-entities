import { LocationsService } from './services/locations/locations.service';
import { BackState, backState } from './reducers/back-reducer.reducer';
import { reducers } from './reducers/index';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation, forwardRef } from '@angular/core';
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
import { FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '../../node_modules/@angular/forms';
import { OptionsSelectorContainerComponent } from './shared/components/options-selector-container/options-selector-container.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OptionsSelectorContainerComponent),
    }
  ]
})
export class AppComponent implements OnInit, AfterViewInit {

  restuarants: FavoriteRestuarants[] = RESTUARANTS.restuarants;

  locations: FavoriteLocations[] = LOCATIONS.locations;

  progressList: any[] = [];

  reservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private booksStore: Store<State>, private restuarantsStore: Store<RestuarantsAppState>, private backStore: Store<State>,
    private ref: ChangeDetectorRef, private locationsService: LocationsService) {

    this.backStore$();
    this.booksStore$();
    this.restuarantsStore$();

    this.reservationForm = this.formBuilder.group({
      restuarantsControl: new FormControl('', Validators.required),
      locationsControl: new FormControl('', Validators.required),
    });

  };

  ngOnInit(): void {

  };

  ngAfterViewInit(): void {
    this.getLocationsData();
    console.log(this.reservationForm.valid);
    this.reservationForm.valueChanges.subscribe(data => {
      console.log('form: ', data);
      console.log(this.reservationForm.controls)
    });

  };

  getLocationsData() {
    this.locationsService.getData$.subscribe((data) => {
      console.log(data)
      debugger;
    });
  };

  selectedRestuarantEmitterHandler(option: FavoriteRestuarants) {
    console.log('restuarant value: ', option);
    this.reservationForm.controls['restuarantsControl'].setValue(option);
  };

  selectedLocationEmitterHandler(option: FavoriteLocations) {
    console.log('location value: ', option);
    this.reservationForm.controls['locationsControl'].setValue(option);
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
