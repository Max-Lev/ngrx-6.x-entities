import { Action } from '@ngrx/store';

export interface BooksAppState {
  type: string;
  payload: any[];
  current: any;
  prev: any[];
}

export interface BooksActions extends Action {
  type: string;
  payload: any[];
}

export enum BooksActionsType {
  INITIAL = '[INITIAL] BOOKS',
  ADD_BOOKS = '[ADD] BOOKS',
  DELETE_BOOKS = '[DELETE] BOOKS'
};

export class InitialBooks implements BooksActions {
  readonly type: string = BooksActionsType.INITIAL;
  current: any;
  prev: any[] = [];
  payload: any[] = [];
  constructor() {
    this.payload = [];
    this.current = {
      type: BooksActionsType.INITIAL,
      payload: [
        { id: 0, name: 'Add', selected: false },
        { id: 1, name: 'Delete', selected: false }
      ]
    };
    this.prev.push({
      type: BooksActionsType.INITIAL,
      payload: [
        { id: 0, name: 'Add', selected: false },
        { id: 1, name: 'Delete', selected: false }
      ]
    });
  }
};

export class AddBooks implements BooksActions {
  readonly type: string = BooksActionsType.ADD_BOOKS;
  current: any;
  payload: any[] = [];
  prev: any[] = [];
  constructor(payload: any) {
    this.payload = payload;
  }
};

export class DeleteBooks implements BooksActions {
  readonly type: string = BooksActionsType.DELETE_BOOKS;
  current: any;
  payload: any = [];
  prev: any[] = [];
  constructor(payload: any) {
    this.payload = payload;
  }
};

export type BooksTypes = AddBooks | DeleteBooks | InitialBooks;


export function BooksReducer(state: BooksAppState = new InitialBooks(), action: BooksActions): BooksAppState {

  switch (action.type) {

    case BooksActionsType.ADD_BOOKS:
      const addBook: AddBooks = {
        ...state, ...action,
        type: action.type,
        current: { type: action.type, payload: action.payload },
        payload: action.payload,
        prev: selection(state, action)
      };
      return addBook;

    case BooksActionsType.DELETE_BOOKS:
      const deleteBook: DeleteBooks = {
        ...state, ...action,
        type: action.type,
        current: { type: action.type, payload: action.payload },
        payload: action.payload,
        prev: [...selection(state, action)]
      };
      return deleteBook;

    case '[BACK] BACK':
      const backactive: BooksAppState = {
        ...state, ...action,
        type: action.type,
        current: { type: action.type, payload: action.payload },
        payload: action.payload,
        prev: getPrev(state, action)
      }
      console.log('backState: ', backactive);
      return backactive;

    default:
      return state;
  }

};


function getPrev(state: BooksAppState, action: BooksActions): any {
  const lastState = state.prev.pop();
  return state.prev;
};


function selection(state: BooksAppState, action: BooksActions): any {
  const prev = action.payload.map(item => Object.assign({}, item));
  if (state.prev.length === 0) {
    state.prev.push({
      type: state.type,
      payload: state.payload
    });
  } else {
    state.prev.push({
      type: action.type,
      payload: prev
    });
  }
  return state.prev;

};
