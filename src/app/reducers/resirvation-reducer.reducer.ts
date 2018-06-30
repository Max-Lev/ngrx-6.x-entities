import { Action } from '@ngrx/store';


export interface ReservationState {
  payload?: any;
  action: string;
}

export const initialState: ReservationState = {
  action: 'Initial Reservation'
};

export const addReservation: ReservationState = {
  action: 'Add Reservation'
};

export const removeReservation: ReservationState = {
  action: 'Remove Reservation'
};

export function reservationReducer(state = initialState, action: Action): ReservationState {
  switch (action.type) {
    case 'AddReservation':
      return {
        ...state,
        action: action.type,
        payload: 'Add Reservation'
      }
    case 'RemoveReservation':
      return {
        ...state,
        action: action.type,
        payload: 'Remove Reservation'
      }
    default:
      return state;
  }
}
