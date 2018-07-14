import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LOCATIONACTIONS, LocationsSuccess, GetALLLocationsAPI } from '../../reducers/locations-reducer.reducer';
import { IFavoriteLocations } from '../../models/favorite-locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private actions$: Actions, private http: HttpClient) {
    
  };

  @Effect()
  getData$: Observable<Action> = this.actions$.pipe(
    ofType(LOCATIONACTIONS.GET_ALL_LOCATIONS),

    switchMap((action: GetALLLocationsAPI) => {
      console.log(action)
      
      return this.http.get('http://localhost:4200/assets/locations.data.json').pipe(
        map((data: any) => {
          return new LocationsSuccess(LOCATIONACTIONS.GET_LOCATIONS_SUCCESS, data);
        }, catchError(() => {
          return of({ type: LOCATIONACTIONS.GET_LOCATIONS_FAIL });
        }))
      )

    })
  );



};
