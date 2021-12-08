import {Component, OnDestroy, OnInit} from '@angular/core';
import {Artwork} from "../../models/Artwork.interface";
import {Subject, takeUntil} from "rxjs";
import {ArtworksService} from "../../services/artworks.service";
import {Pagination} from "../../models/Pagination.interface";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-artworks-table',
  templateUrl: './artworks-table.component.html',
  styleUrls: ['./artworks-table.component.css']
})
export class ArtworksTableComponent implements OnInit, OnDestroy {


  // @ts-ignore
  artworks: Artwork[];
  pagination: Pagination;
  destroy$ = new Subject<boolean>();
  private _toggleLabel = 'Show';
  showFilter = false;
  isGridView = true;
  view = '';

  sortOrder = '';
  artist = '';
  department = '';

  constructor(private artworksService: ArtworksService) {
    this.pagination = new Pagination();
  }

  ngOnInit(): void {
    this.getArtworks();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  set toggleLabel(value: string) {
    this._toggleLabel = value;
  }

  get toggleLabel() {
    return this._toggleLabel + " Filters";
  }

  toggleFilters() {
    this.showFilter = !this.showFilter;
    this.toggleLabel = this.showFilter ? "Hide" : "Show";
  }

  onSortOrderChange(sortOrder: string) {
    this.sortOrder = sortOrder;
    this.getArtworks();
  }

  handleArtistSelect(artistName: string){
    this.artist = artistName;
    this.getArtworks();
  }

  handleDepartmentSelect(departmentName: string){
    this.department = departmentName;
    this.getArtworks();
  }

  handleClearFilters(){
    this.sortOrder = '';
    this.artist = '';
    this.department = '';
    this.getArtworks();
  }

  gridView() {
    this.view = '';
    this.isGridView = true;
  }

  listView() {
    this.isGridView = false;
    this.view = 'flex-row';
  }

  selectPage(page: string){
    let selectedPage = parseInt(page, 10) || 1;
      this.getArtworks(selectedPage);
  }

  handlePageChange(page: number){
      this.getArtworks(page);
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  private getArtworks(page?: number): void {
    this.artworksService.getArtworksWithFilters(this.getFilters(), page).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      {
        next: (response) => {
          this.artworks = response.artworks;
          this.pagination = response.pagination;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  private getFilters(){
    let filters = new Map();
    if(this.sortOrder) {
      filters.set("sort", this.sortOrder);
    }

    if(this.artist){
      filters.set("artist", this.artist);
    }

    if(this.department){
      filters.set("department", this.department);
    }

    return filters;
  }

}
