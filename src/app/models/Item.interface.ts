
export interface IItem {
  id?: string;
  title: string;
  description?: string;
}

export class Item implements IItem {
  id?: string;
  title: string;
  description?: string;

  constructor() {
    this.id = '';
    this.title = '';
    this.description = '';
  }
}
