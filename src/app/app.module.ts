import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromRestuarants from './reducers/restuarants.reducer';
import * as fromLocationsReducer from './reducers/locations-reducer.reducer';
import { LocationsService } from './services/locations/locations.service';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { OptionsSelectorContainerComponent } from 'src/app/shared/components/options-selector-container/options-selector-container.component';


@NgModule({
  declarations: [
    AppComponent,
    OptionsSelectorContainerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('restuarants', fromRestuarants.restuarantsReducer),
    StoreModule.forFeature('locationsReducer', fromLocationsReducer.locationsReducer),
    EffectsModule.forRoot([LocationsService])
  ],
  providers: [
    // LocationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
