import { propertyMap } from "../mapper/modelMapper";
import {Pagination} from "./Pagination.interface";
export interface IArtwork {
  id?: number;
  title: string;
  artist: string;
  imageId: string;
  imageUrl: string;
  origin?: string;
  department?: string;
  categories: Array<string>;
  description?: string;
  textIds?: Array<string>;
}


export class Artwork implements IArtwork {
  id?: number;
  title: string;
  @propertyMap('artist_display')
  artist: string;
  @propertyMap('image_id')
  imageId: string;
  imageUrl: string;
  @propertyMap('place_of_origin')
  origin?: string;
  @propertyMap('department_title')
  department?: string;
  @propertyMap('category_titles')
  categories: Array<string>;
  description?: string;
  @propertyMap('text_ids')
  textIds?: Array<string>;


  constructor() {
    this.id = -1;
    this.title = '';
    this.artist = '';
    this.imageId = '';
    this.imageUrl = '';
    this.origin = '';
    this.department = '';
    this.categories = [];
    this.description = '';
    this.textIds = [];
  }
}

export class ArtworksInfoWithPaging{
  artworks: Artwork[];
  pagination: Pagination;

  constructor() {
   this.artworks = [];
   this.pagination = new Pagination();
  }
}
