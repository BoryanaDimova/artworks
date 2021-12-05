import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artwork} from "../models/Artwork.interface";
import {filter, map, takeUntil} from 'rxjs/operators';
import {InnerMapper} from "../mapper/innerMapper";
import {generateImageUrl, ModelMapper} from "../mapper/modelMapper";
import {Artist} from "../models/Artist.interface";


@Injectable({
  providedIn: 'root'
})
export class ArtworksService {
  readonly url = 'https://api.artic.edu/api/v1/artists?page=1&limit=10';
  constructor(private http: HttpClient) {}


  getAllArtists(): Observable<Array<Artist>>{
    return this.http.get<Artist[]>(`${this.url}`).pipe(
      map((response : any) => {
        if (response) {
          let artists: Array<Artist> = [];
          if(response?.data?.length > 0){
            response.data.map((artist: any) => {
              artists.push( new InnerMapper(Artist).map(artist));
            });
          }
          return artists;
        }
        throw new Error(response.errorMessage);
      })
    );
  }
}
