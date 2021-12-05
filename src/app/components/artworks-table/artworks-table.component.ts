import {Component, OnDestroy, OnInit} from '@angular/core';
import {Artwork} from "../../models/Artwork.interface";
import {Subject, takeUntil} from "rxjs";
import {ArtworksService} from "../../services/artworks.service";

@Component({
  selector: 'app-artworks-table',
  templateUrl: './artworks-table.component.html',
  styleUrls: ['./artworks-table.component.css']
})
export class ArtworksTableComponent implements OnInit, OnDestroy{


  // @ts-ignore
  artworks: Artwork[];
  destroy$ = new Subject<boolean>();
  private _toggleLabel = 'Show';
  showFilter = false;

  constructor(private artworksService: ArtworksService) { }

  ngOnInit(): void {
    // this.getArtworks();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  set toggleLabel(value: string) {
    this._toggleLabel = value;
  }

  get toggleLabel(){
    return this._toggleLabel + " Filters";
  }

  toggleFilters(){
    this.showFilter = !this.showFilter;
    this.toggleLabel = this.showFilter ? "Hide" : "Show";
  }


  private getArtworks(): void {
    this.artworksService.getAllArtWorks().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      {
        next:(response) =>{
          console.log(JSON.stringify(response));
          this.artworks = response;
        },
        error: (error)=>{
          console.log(error);
        }
      });
  }


}
