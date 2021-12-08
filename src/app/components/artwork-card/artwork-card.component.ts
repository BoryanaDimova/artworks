import {Component, Input, OnInit} from '@angular/core';
import {Artwork} from '../../models/Artwork.interface';
@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.css']
})
export class ArtworkCardComponent implements OnInit {

  @Input() artwork: Artwork;
  @Input() isGridView: Boolean;
  constructor() {
    this.artwork = {
      id: -1,
      title: '',
      artist: '',
      imageUrl: '',
      imageId: '',
      categories: []
    };
    this.isGridView = true;
  }

  ngOnInit(): void {
  }

}
