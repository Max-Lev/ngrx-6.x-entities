
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { BooksAppState, BooksReducer } from './books-reducer.reducer';
import { BackReducer, BackState } from './back-reducer.reducer';

export interface State {
  booksState: BooksAppState;
  backState: BackState;

}

export const reducers: ActionReducerMap<State> = {
  booksState: BooksReducer,
  backState: BackReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
