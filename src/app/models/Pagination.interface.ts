import { propertyMap } from "../mapper/modelMapper";
export interface IPagination {
  currentPage: number;
  totalPages: number;
  previousUrl?: string;
  nextUrl?: string;
  total: number;
  limit: number;
}

export class Pagination implements IPagination {
  @propertyMap('current_page')
  currentPage: number;
  @propertyMap('total_pages')
  totalPages: number;
  @propertyMap('prev_url')
  previousUrl?: string;
  @propertyMap('next_url')
  nextUrl?: string;
  total: number;
  limit: number;


  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.total = 0;
    this.limit = 30;
  }
}
