import { propertyMap } from "../mapper/modelMapper";
export interface IArtwork {
  id?: number;
  title: string;
  artist: string;
  description: string;
  imageId: string;
  imageUrl: string;
  origin?: string;
}

export class Artwork implements IArtwork {
  id?: number;
  title: string;
  @propertyMap('artist_title')
  artist: string;
  @propertyMap('medium_display')
  description: string;
  @propertyMap('image_id')
  imageId: string;
  imageUrl: string;
  @propertyMap('place_of_origin')
  origin?: string;


  constructor() {
    this.id = -1;
    this.title = '';
    this.artist = '';
    this.description = '';
    this.imageId = '';
    this.imageUrl = '';
    this.origin = '';
  }
}
