import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artwork, ArtworksInfoWithPaging} from "../models/Artwork.interface";
import {map} from 'rxjs/operators';
import {InnerMapper} from "../mapper/innerMapper";
import {generateImageUrl} from "../mapper/modelMapper";
import {Pagination} from "../models/Pagination.interface";


@Injectable({
  providedIn: 'root'
})
export class ArtworksService {
  readonly baseUrl = 'https://api.artic.edu/api/v1';
  readonly baseImgUrl = 'https://www.artic.edu/iiif/2/';
  readonly imgEnding = '/full/843,/0/default.jpg';
  readonly artworkFields = 'id,title,image_id,artist_display,place_of_origin,department_title,category_titles,text_ids,artwork_type_title';
  readonly defaultImage = 'https://lh3.googleusercontent.com/proxy/6QLgt595nuG1mAjOpZJhTUcBNK3uDk4Yq1g3TMhww-1ljPpHtR2QjJKykgda6xfTtLoPirDU2qgqZi1DW_exqVBBwA_cZS71ofNl';
  readonly LIMIT = 24;

  constructor(private http: HttpClient) {
  }

  getArtworksWithFilters(filter: Map<string, object>, page?: number): Observable<ArtworksInfoWithPaging> {
    return this.getArtworks(this.prepareEndpoint('artworks/search', filter, page));
  }

  private getArtworks(url: string): Observable<ArtworksInfoWithPaging> {
    return this.http.get<ArtworksInfoWithPaging>(`${url}`).pipe(
      map((response: any) => {
        if (response) {
          let artworksInfo: ArtworksInfoWithPaging = new ArtworksInfoWithPaging();
          let artworks: Array<Artwork> = [];
          let descIds: string[] = [];
          // let baseImgUrl = response?.config?.iiif_url;
          if (response?.data?.length > 0) {
            response.data.map((artwork: any) => {
              let art = new InnerMapper(Artwork).map(artwork);
              if (art.textIds.length > 0) {
                descIds.push(art.textIds);
              }
              art.imageUrl = art.imageId ? generateImageUrl(this.baseImgUrl, art.imageId, this.imgEnding) : this.defaultImage;
              artworks.push(art);
            });
          }
          artworksInfo.artworks = artworks;
          artworksInfo.pagination = new InnerMapper(Pagination).map(response.pagination);
          return artworksInfo;
        }
        throw new Error(response.errorMessage);
      })
    );
  }

  private getArtworksDescriptions(ids: string[]): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(`${this.baseUrl + '/texts?ids=' + ids}`).pipe(
      map((response: any) => {
        if (response) {
          let artworksDesc: Map<string, string> = new Map<string, string>();
          if (response?.data?.length > 0) {
            response.data.map((desc: any) => {
              artworksDesc.set(desc.id, desc.description);
            });
          }
          return artworksDesc;
        }
        throw new Error(response.errorMessage);
      })
    );
  }

  private prepareEndpoint(endpoint: string, filters: Map<string, object>, page: number = 1) {

    let queryFilters = '';
    filters?.forEach((value: object, key: string) => {

      queryFilters += this.getFilter(key, value, queryFilters.includes('query'));
    });
    return `${this.baseUrl}/${endpoint}?fields=${this.artworkFields}${queryFilters}&page=${page}&limit=${this.LIMIT}`;
  }

  //filter for artist
  // https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_title&query[match_phrase][artist_title]=Salvador%20Dal%C3%AD&limit=50
  getFilter(key: string, value: object, containsQuery: boolean) {
    let filter = '';
    switch (key) {
      case 'sort':
        filter = `&sort[${value}][order]=asc`;
        break;
      case 'artist':
        filter = containsQuery ? `&q=${value}` : `&query[match][artist_title]=${value}`;
        break;
      case 'department':
        filter = containsQuery ? `&q=${value}` : `&query[match][department_title]=${value}`;
        break;
    }

    return filter;
  }


}
