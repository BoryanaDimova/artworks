import { propertyMap } from "../mapper/modelMapper";
export interface IArtist {
  id?: number;
  name: string;
  birthDate?:Date;
  deathDate?: Date;
}

export class Artist implements IArtist {
  id?: number;
  @propertyMap('title')
  name: string;
  @propertyMap('birth_date')
  birthDate?:Date;
  @propertyMap('death_date')
  deathDate?: Date;


  constructor() {
    this.id = -1;
    this.name = '';
    this.birthDate = undefined;
    this.deathDate = undefined;
  }
}
