import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LOCATIONACTIONS, LocationsSuccess } from '../../reducers/locations-reducer.reducer';

// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private actions$: Actions, private http: HttpClient) {
    console.log('LocationsService');
  }

  @Effect()
  getData$: Observable<Action> = this.actions$.pipe(
    ofType(LOCATIONACTIONS.INITIAL),
    mergeMap((action) => {
      console.log(action)
      return this.http.get('http://localhost:4200/assets/locations.data.json').pipe(
        map((data) => {
          console.log('data: ', data)
          return new LocationsSuccess(LOCATIONACTIONS.GET_LOCATIONS_SUCCESS, data);
        }, catchError(() => {
          return of({ type: 'Failed' });
        }))
      )
    })
  );



}
