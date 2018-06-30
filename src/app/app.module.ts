import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUserReducer from './reducers/user-reducer.reducer';
import * as fromResirvationReducer from './reducers/resirvation-reducer.reducer';
import * as fromBooksReducer from './reducers/books-reducer.reducer';
import { BooksReducer } from './reducers/books-reducer.reducer';
import { reservationReducer } from './reducers/resirvation-reducer.reducer';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // StoreModule.forRoot({
    //   'reservationReducer': reservationReducer,
    //   'booksReducer': BooksReducer
    // }),

    // StoreModule.forFeature('resirvationReducer', reservationReducer)

    // StoreModule.forFeature('booksReducer', fromBooksReducer.BooksReducer),
    // StoreModule.forFeature('userReducer', fromUserReducer.userReducer),
    // StoreModule.forFeature('resirvationReducer', fromResirvationReducer.reservationReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
