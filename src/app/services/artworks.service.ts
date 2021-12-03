import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artwork} from "../models/Artwork.interface";
import {filter, map, takeUntil} from 'rxjs/operators';
import {InnerMapper} from "../mapper/innerMapper";
import {generateImageUrl, ModelMapper} from "../mapper/modelMapper";


@Injectable({
  providedIn: 'root'
})
export class ArtworksService {
  readonly url = 'https://api.artic.edu/api/v1/artworks?page=1&limit=10';
  readonly imgEnding = '/full/843,/0/default.jpg';
  constructor(private http: HttpClient) {}


  getAllArtWorks(): Observable<Array<Artwork>>{
   return this.http.get<Artwork[]>(`${this.url}`).pipe(
      map((response : any) => {
        if (response) {
          let artworks: Array<Artwork> = [];
          let baseImgUrl = response?.config?.iiif_url;
          if(response?.data?.length > 0){
            response.data.map((artwork: any) => {
              let art = new InnerMapper(Artwork).map(artwork);
              if(art.imageId) {
                art.imageUrl = generateImageUrl(baseImgUrl, art.imageId, this.imgEnding);
                artworks.push(art);
              }
            });
          }
          return artworks;
        }
        throw new Error(response.errorMessage);
      })
    );
  }
}
