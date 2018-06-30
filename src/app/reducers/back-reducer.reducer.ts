
import { Action } from '@ngrx/store';


export interface BackState {
  type: string;
  payload?: any;
}

export const initialState: BackState = {
  type: '[BACK] INITIAL',
  payload: []
};
export const backState: BackState = {
  type: '[BACK] BACK',
  payload: []
};

export function BackReducer(state = initialState, action: Action): BackState {
  switch (action.type) {

    case '[BACK] BACK':
      const backactive: BackState = {
        ...state,
        type: action.type,
      }
      return backactive;
    case '[BACK] INITIAL':
      const initial = {
        ...action,
        type: action.type,
      }
      return initial;
    default:
      return state;
  }
}
