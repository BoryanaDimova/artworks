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
  constructor(private artworksService: ArtworksService) { }

  ngOnInit(): void {
    this.getArtworks();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
