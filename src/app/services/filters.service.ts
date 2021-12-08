import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {Item} from "../models/Item.interface";
import {ModelMapper} from "../mapper/modelMapper";

let departments: Array<string> = [
  'Applied Arts of Europe',
  'Architecture and Design',
  'Arts of Africa',
  'Arts of Asia',
  'Arts of the Americas',
  'Arts of the Ancient Mediterranean and Byzantium',
  'Contemporary Art',
  'Modern Art',
  'Painting and Sculpture of Europe',
  'Photography and Media',
  'Prints and Drawings',
  'Textiles'
];

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  readonly url = 'https://api.artic.edu/api/v1';

  constructor(private http: HttpClient) {
  }


  getArtists(searchValue?: string): Observable<Array<Item>> {
    let searchUrl = searchValue ? this.url + '/artists/search?q=' + searchValue : this.url + '/artists';
    return this.searchFilters(searchUrl);
  }

  //Not used for now - returns more than 100 results
  getDepartments(useAPI: Boolean = false): Observable<Array<Item>> {
    return useAPI ? this.searchFilters(this.url + '/category-terms/search?query[match][subtype]=department&limit=100')
      :  this.generateDepartmentItems();
  }

  searchFilters(url: string): Observable<Array<Item>> {
    return this.http.get<Item[]>(`${url}`).pipe(
      map((response: any) => {
        if (response) {
          let items: Array<Item> = [];
          if (response?.data?.length > 0) {
            response.data.map((item: any) => {
              items.push(new ModelMapper(Item).map(item));
            });
          }
          return items;
        }
        throw new Error(response.errorMessage);
      })
    );
  }

  generateDepartmentItems(): Observable<Array<Item>>{
    let items: Array<Item>  = [];
    departments.forEach(department =>{
      items.push(this.generateItem(department));
    })

    return of(items);
  }

  generateItem(title: string) {
    let item: Item = new Item();
    item.title = title;
    return item;
  }
}
