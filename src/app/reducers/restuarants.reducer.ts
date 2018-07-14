
import { Action } from '@ngrx/store';
import { FavoriteRestuarants } from 'src/app/models/favorite-restuarants';
import { IFavoriteLocations } from 'src/app/models/favorite-locations';

export enum RestuarantsAction {
  INITIAL = '[RESTUARANTS] INITIAL',
  SELECTED = '[RESTUARANTS] SELECTED',
}

export interface RestuarantsAppState {
  type: string;
  restuarant?: FavoriteRestuarants[];
  location?: IFavoriteLocations[];
  payload?: any[];
}

export class RestuarantsInitial implements RestuarantsAppState {
  type: string;
  restuarant?: FavoriteRestuarants[];
  location?: IFavoriteLocations[];
  payload?: any[];
  constructor() {
    this.type = RestuarantsAction.INITIAL;
    this.restuarant = [];
    this.location = [];
    this.payload = [];
  };
}
export class RestuarantsSelected implements RestuarantsAppState {
  type: string;
  restuarant?: FavoriteRestuarants[];
  location?: IFavoriteLocations[];
  payload?: any[];
  constructor(restuarants: FavoriteRestuarants[], locations: IFavoriteLocations[]) {
    this.type = RestuarantsAction.INITIAL;
    this.restuarant = restuarants;
    this.location = locations;
    this.payload = [{
      restuarants: restuarants,
      locations: locations 
    }];
  };
}

export function restuarantsReducer(state: RestuarantsAppState = new RestuarantsInitial(), action: Action): RestuarantsAppState {
  switch (action.type) {

    case RestuarantsAction.INITIAL:
      return state;

    case RestuarantsAction.SELECTED:
      return state;

    default:
      return state;
  }
}
