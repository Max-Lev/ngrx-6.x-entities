import { Action } from '@ngrx/store';

export enum LOCATIONACTIONS {
  GET_LOCATIONS_SUCCESS = '[LOCATIONS] GET_LOCATIONS_SUCCESS',
  GET_LOCATIONS_FAIL = '[LOCATIONS] GET_LOCATIONS_FAIL',
  GET_ALL_LOCATIONS = '[LOCATIONS] GET_ALL_LOCATIONS',
  SELECTED = '[LOCATIONS] SELECTED'
}


export interface LocationsState {
  type: string;
  payload: any;
}

export class InitialState implements LocationsState {
  type = LOCATIONACTIONS.GET_ALL_LOCATIONS;
  payload = [];
};

export class LocationsSuccess implements LocationsState {
  type: string; id: string;
  payload: string;
  constructor(type: string, payload: any) {
    this.type = type;
    this.payload = payload;
  };
};
export class GetALLLocationsAPI implements LocationsState {
  type: string = LOCATIONACTIONS.GET_ALL_LOCATIONS;
  id: string | number;
  payload: string;
  constructor() {

  };
};

export function locationsReducer(state = new InitialState(), action: LocationsState): LocationsState {
  switch (action.type) {
    case LOCATIONACTIONS.GET_ALL_LOCATIONS:
      return {
        ...state, ...action
      }
    case LOCATIONACTIONS.GET_LOCATIONS_SUCCESS:
      return {
        ...state, ...action
      }
    default:
      return state;
  }
}
