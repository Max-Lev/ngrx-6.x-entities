import { Action } from '@ngrx/store';


export interface UsersState {
  payload?: any;
  action: string;
}

export const initialState: UsersState = {
  action: 'Initial'
};

export const addUser: UsersState = {
  action: 'Add'
};

export const removeUser: UsersState = {
  action: 'Remove'
};

export function userReducer(state = initialState, action: Action): UsersState {
  switch (action.type) {
    case 'AddUser':
      return {
        ...state,
        action: action.type,
        payload: 'Add User'
      }
    case 'RemoveUser':
      return {
        ...state,
        action: action.type,
        payload: 'Remove User'
      }
    default:
      return state;
  }
}
