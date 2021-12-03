import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtworksTableComponent} from "./components/artworks-table/artworks-table.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ArtworksTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
