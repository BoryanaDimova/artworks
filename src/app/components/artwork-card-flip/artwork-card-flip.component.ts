import {Component, Input, OnInit} from '@angular/core';
import {Artwork} from "../../models/Artwork.interface";

@Component({
  selector: 'app-artwork-card-flip',
  templateUrl: './artwork-card-flip.component.html',
  styleUrls: ['./artwork-card-flip.component.css']
})
export class ArtworkCardFlipComponent implements OnInit {

  @Input() artwork: Artwork;

  constructor() {
    this.artwork = {
      id: -1,
      title: '',
      artist: '',
      description: '',
      imageUrl: '',
      imageId: ''
    };
  }

  ngOnInit(): void {
  }

}
