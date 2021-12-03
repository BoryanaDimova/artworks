import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworksTableComponent } from './components/artworks-table/artworks-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArtworkRowComponent } from './components/artwork-row/artwork-row.component';
import { ArtworkCardComponent } from './components/artwork-card/artwork-card.component';
import {FormatPipe} from "./pipes/format.pipe";
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ArtworksTableComponent,
    ArtworkRowComponent,
    ArtworkCardComponent,
    FormatPipe
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
