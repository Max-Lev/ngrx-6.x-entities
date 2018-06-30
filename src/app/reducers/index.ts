import { ReservationState, reservationReducer } from './resirvation-reducer.reducer';

import { UsersState, userReducer } from './user-reducer.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { BooksAppState, BooksReducer } from './books-reducer.reducer';
import { BackState, BackReducer } from './back-reducer.reducer';


export interface State {
  // usersState: UsersState;
  // reservationState: ReservationState;
  booksState: BooksAppState;
  backState: BackState;

}

export const reducers: ActionReducerMap<State> = {
  // usersState: userReducer,
  // reservationState: reservationReducer,
  booksState: BooksReducer,
  backState: BackReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
