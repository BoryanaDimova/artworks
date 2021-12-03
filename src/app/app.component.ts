import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Art Institute of Chicago';
  subtitle = 'Artworks';
  isMenuCollapsed = false;

  constructor(private router: Router) {
  }
}
