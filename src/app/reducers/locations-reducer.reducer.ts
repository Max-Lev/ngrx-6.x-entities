import { Action } from '@ngrx/store';

export enum LOCATIONACTIONS {
  GET_LOCATIONS_SUCCESS = '[LOCATIONS] GET_LOCATIONS_SUCCESS',
  GET_LOCATIONS_FAIL = '[LOCATIONS] GET_LOCATIONS_FAIL',
  INITIAL = '[LOCATIONS] INITIAL',
  SELECTED = '[LOCATIONS] SELECTED'
}


export interface LocationsState {
  type: string;
  payload: any;
}

export class InitialState implements LocationsState {
  type = LOCATIONACTIONS.INITIAL;
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

export function locationsReducer(state = new InitialState(), action: LocationsState): LocationsState {
  switch (action.type) {
    case LOCATIONACTIONS.GET_LOCATIONS_SUCCESS:
      return {
        ...state, ...action
      }
    default:
      return state;
  }
}
