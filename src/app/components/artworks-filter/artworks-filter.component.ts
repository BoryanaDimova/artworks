import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artworks-filter',
  templateUrl: './artworks-filter.component.html',
  styleUrls: ['./artworks-filter.component.css']
})
export class ArtworksFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleFilterBlock(event: MouseEvent){
    // @ts-ignore
    let targetFilter = event.target.getAttribute("data-target");
    document.getElementById(targetFilter)?.classList.toggle("show");
    document.getElementById(targetFilter+"-icon-up")?.classList.toggle("hide");
    document.getElementById(targetFilter+"-icon-down")?.classList.toggle("hide");
  }

}
