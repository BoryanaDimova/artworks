import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworksTableComponent } from './components/artworks-table/artworks-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ArtworkCardComponent } from './components/artwork-card/artwork-card.component';
import {FormatPipe} from "./pipes/format.pipe";
import {HttpClientModule} from '@angular/common/http';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ArtworksFilterComponent } from './components/artworks-filter/artworks-filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxBootstrapSliderModule} from "ngx-bootstrap-slider";
import {NgxSliderModule} from "@angular-slider/ngx-slider";

@NgModule({
  declarations: [
    AppComponent,
    ArtworksTableComponent,
    ArtworkCardComponent,
    FormatPipe,
    ArtworksFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxBootstrapSliderModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIconPacks(fab);
  }
}
