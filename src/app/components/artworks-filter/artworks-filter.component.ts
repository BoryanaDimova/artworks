import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FiltersService} from "../../services/filters.service";
import {Item} from "../../models/Item.interface";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-artworks-filter',
  templateUrl: './artworks-filter.component.html',
  styleUrls: ['./artworks-filter.component.css']
})
export class ArtworksFilterComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  // @ts-ignore
  departments: Item[];
  artists: Item[] | undefined;
  form: FormGroup;

  @Output() changeSortOrder = new EventEmitter<string>();
  @Output() artistSelect = new EventEmitter<string>();
  @Output() departmentSelect = new EventEmitter<string>();
  @Output() clearFiltersEvt = new EventEmitter<string>();
  @Input()  selectedDepartment = '';

  constructor(private filtersService: FiltersService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      sortOrder: '',
      search: '',
      artists: [''],
      departments: ['']
    });
  }

  ngOnInit(): void {
    this.getArtists();
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  toggleFilterBlock(event: MouseEvent){
    // @ts-ignore
    let targetFilter = event.target.getAttribute("data-target");
    document.getElementById(targetFilter)?.classList.toggle("show");
    document.getElementById(targetFilter+"-icon-up")?.classList.toggle("hide");
    document.getElementById(targetFilter+"-icon-down")?.classList.toggle("hide");
  }

  handleSortChange(){
    const sort = this.form?.controls?.['sortOrder'].value;
    this.changeSortOrder.emit(sort);
  }

  getArtists(searchValue?: string){
    this.filtersService.getArtists(searchValue).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      {
        next:(response) =>{
          this.artists = response;
        },
        error: (error)=>{
          console.log(error);
        }
      });
  }

  onSearch(): void {
    const searchValue = this.form?.controls?.['search'].value;
    this.getArtists(searchValue);
  }

  handleArtistSelect(){
    // @ts-ignore
    let artist = this.form?.controls.artists.value;
    this.artistSelect.emit(artist);
  }

  handleDepartmentSelect(){
    // @ts-ignore
    let department = this.form?.controls.departments.value;
    this.departmentSelect.emit(department);
  }

  private getDepartments(){
    this.filtersService.getDepartments().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      {
        next:(response) =>{
          this.departments = response;
        },
        error: (error)=>{
          console.log(error);
        }
      });
  }

  clearFilters(){
    this.form.reset({
      "sortOrder": "",
    });
    this.clearFiltersEvt.emit();
  }
}
